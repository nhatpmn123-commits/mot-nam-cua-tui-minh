# Một năm của tụi mình

Trang web kỷ niệm 1 năm của Nhật & Yến (20/11/2025).

## Thư mục
| Đường dẫn | Là gì |
|---|---|
| `index.html` | Khung trang (giao diện) |
| `content.js` | **Toàn bộ chữ, ngày, mật khẩu, danh sách ảnh** – sửa ở đây |
| `app.js` | Code chạy trang (thường không cần đụng) |
| `img/` | Ảnh trong các album |
| `stk/` | Sticker đã tách nền |
| `video/` | Bỏ video vào đây (mp4, nên dưới 20MB mỗi file) |

## Sửa chữ và thứ tự ảnh (không cần code)
1. Mở `index.html#edit` (trên máy: kéo `index.html` vào trình duyệt rồi thêm `#edit` vào cuối địa chỉ; trên web: `https://ten-trang/#edit`).
2. Bấm vào chữ bất kỳ để sửa. Dưới mỗi ảnh có nút ◀ ▶ (đổi thứ tự), ✕ (bỏ ảnh), "Chuyển sang…" (đưa ảnh sang mốc khác). Có nút thêm/xóa/đổi chỗ mốc, thêm đoạn văn.
3. Thêm ảnh mới: chép ảnh vào `img/`, rồi gõ `img/ten-anh.jpg` vào ô "Thêm ảnh" của mốc đó.
4. Sửa xong bấm **Tải content.js** → chép đè file `content.js` trong thư mục này → đẩy lên web lại.

Bản nháp tự lưu trong trình duyệt đang sửa, nhưng **chỉ máy đó thấy** cho tới khi bạn thay file `content.js`.

## Thêm video
Chép file vào `video/`, rồi trong `content.js` sửa `video: { label: '...', src: 'video/ten.mp4' }`.

## Đưa lên web
- **Nhanh nhất – Netlify Drop:** vào https://app.netlify.com/drop, kéo cả thư mục này thả vào là có link.
- **GitHub Pages (qua Claude Code):** mở thư mục này trong Claude Code và nhờ: “Đẩy thư mục này lên một repo GitHub mới và bật GitHub Pages”.

Lưu ý: mật khẩu ở màn hình đầu chỉ là khóa cho vui, không phải bảo mật thật – ai có link vẫn có thể mở trực tiếp file ảnh. Trang đã chặn Google tìm thấy (`noindex`), nhưng chỉ gửi link cho người cần xem thôi nhé.
