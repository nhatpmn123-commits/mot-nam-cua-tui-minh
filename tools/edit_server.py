"""Máy chủ sửa web chạy trên laptop.

Bấm đúp "Sua-web.bat" ở thư mục gốc để mở. Trang sửa sẽ có thêm:
  - nút "Chọn ảnh từ máy" ở mỗi mốc (tự thu nhỏ ảnh, đổi HEIC sang JPG, lưu vào img/)
  - nút "Lưu & đăng lên web" (ghi content.js rồi đẩy lên GitHub)
Chỉ nghe ở 127.0.0.1 nên máy khác không truy cập được.
"""
import io, json, os, re, shutil, subprocess, sys, time, unicodedata, webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get('PORT') or 8765)
MAX_SIDE = 1100

try:
    from PIL import Image, ImageOps
    try:
        import pillow_heif
        pillow_heif.register_heif_opener()
    except ImportError:
        pass
except ImportError:
    print('Thiếu thư viện ảnh. Chạy lệnh: python -m pip install pillow pillow-heif')
    input('Nhấn Enter để thoát...')
    sys.exit(1)

GIT = shutil.which('git') or r'C:\Program Files\Git\cmd\git.exe'


def slug(name):
    base = os.path.splitext(os.path.basename(name))[0]
    base = unicodedata.normalize('NFD', base).encode('ascii', 'ignore').decode()
    base = re.sub(r'[^A-Za-z0-9]+', '-', base).strip('-').lower()[:40] or 'anh'
    return base


def unique_path(base):
    path = os.path.join(ROOT, 'img', base + '.jpg')
    n = 2
    while os.path.exists(path):
        path = os.path.join(ROOT, 'img', f'{base}-{n}.jpg')
        n += 1
    return path


def git(*args):
    r = subprocess.run([GIT, *args], cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace')
    return r.returncode, (r.stdout + r.stderr).strip()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

    def reply(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path == '/api/ping':
            return self.reply(200, {'ok': True})
        return super().do_GET()

    def do_POST(self):
        u = urlparse(self.path)
        n = int(self.headers.get('Content-Length') or 0)
        data = self.rfile.read(n)
        try:
            if u.path == '/api/upload':
                name = parse_qs(u.query).get('name', ['anh.jpg'])[0]
                im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert('RGB')
                im.thumbnail((MAX_SIDE, MAX_SIDE))
                path = unique_path(slug(name))
                im.save(path, quality=80, optimize=True)
                rel = 'img/' + os.path.basename(path)
                print('  + Đã thêm ảnh', rel)
                return self.reply(200, {'ok': True, 'src': rel})
            if u.path == '/api/publish':
                text = data.decode('utf-8')
                if 'window.CONTENT' not in text:
                    return self.reply(400, {'ok': False, 'msg': 'Nội dung không hợp lệ'})
                with open(os.path.join(ROOT, 'content.js'), 'w', encoding='utf-8', newline='\n') as f:
                    f.write(text)
                git('add', '-A')
                code, out = git('commit', '-m', 'Cập nhật nội dung từ trang sửa ' + time.strftime('%d/%m/%Y %H:%M'))
                if code != 0 and 'nothing to commit' in out:
                    return self.reply(200, {'ok': True, 'msg': 'Không có gì mới để đăng.'})
                code, out = git('push')
                if code != 0:
                    print(out)
                    return self.reply(500, {'ok': False, 'msg': 'Đã lưu trên máy nhưng chưa đẩy lên được: ' + out[-300:]})
                print('  ✓ Đã đăng lên web')
                return self.reply(200, {'ok': True, 'msg': 'Đã đăng! Khoảng 1 phút nữa web sẽ cập nhật.'})
        except Exception as e:
            return self.reply(500, {'ok': False, 'msg': f'Lỗi: {e}'})
        self.reply(404, {'ok': False})


if __name__ == '__main__':
    srv = ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    url = f'http://127.0.0.1:{PORT}/#edit'
    print('Trang sửa web đang chạy:', url)
    print('Đóng cửa sổ này khi sửa xong.')
    if not os.environ.get('NO_BROWSER'):
        webbrowser.open(url)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
