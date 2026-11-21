# Dự án: web kỷ niệm 1 năm (static site)

- Trang tĩnh thuần HTML/CSS/JS, không build, không framework. Mở `index.html` là chạy.
- Nội dung nằm hết trong `content.js` (`window.CONTENT`): ngày, mật khẩu, các mốc (`entries`), ảnh, chú thích, thư cuối. Ưu tiên sửa file này thay vì `app.js`/`index.html`.
- Ảnh: `img/`, sticker PNG nền trong: `stk/`, video: `video/`. Khi thêm ảnh mới, resize cạnh dài ≤ 1100px, JPEG chất lượng ~80.
- `index.html#edit` là chế độ chỉnh sửa trên trang; nút "Tải content.js" xuất lại file nội dung.
- Văn phong: xưng anh/tui – em, giọng nhẹ nhàng, đáng yêu, kéo dài chữ cuối ("lắmmm", "nèee"), dùng ":’)" và ";>".
- Triển khai: GitHub Pages hoặc Netlify (thư mục gốc là site). Giữ `<meta name="robots" content="noindex, nofollow">`.
- Người dùng nói tiếng Việt – trả lời bằng tiếng Việt.
