/* =====================================================================
   NỘI DUNG TRANG WEB – sửa file này là trang tự đổi theo.
   Cách dễ nhất: mở trang với đuôi #edit (vd: index.html#edit) để sửa
   trực tiếp trên trang, rồi bấm "Tải content.js" và chép đè file này.
   - Ảnh: {src:'img/ten.jpg', cap:'chú thích'}  (thêm fit:'full' để hiện nguyên ảnh, không cắt – hợp với ảnh chụp tin nhắn)  |  ô trống: {ph:'ghi chú'}
   - Sticker: {src:'stk/s1.png', side:'left' hoặc 'right', rot: độ nghiêng}
   - Video: {label:'...', src:'video/ten.mp4'} (để src rỗng = khung chờ)
   ===================================================================== */
window.CONTENT = {
  start: '2025-11-20T00:00:00+07:00',   // ngày nhắn tin đầu tiên
  love:  '2026-07-29T00:00:00+07:00',   // ngày tỏ tình
  passwords: ['20112025','201125','2011'], // các cách gõ mật khẩu (chỉ tính chữ số)

  lock: {
    title: 'Một năm\ncủa tụi mình',
    sub: 'Trang nhật ký này có khóa nha em bé',
    label: 'Mật khẩu là ngày anh nhắn tin cho em lần đầu:',
    sticker: 'stk/s2.png',
    wrong: ['Sai rồi nè, em quên rồi hả :’(','Gợi ý: hôm đó là ngày Nhà giáo Việt Nam đó','Nhập sai thêm lần nữa là phạt thơm anh một cái ;>','Ngày/tháng/năm nhé, năm 2025 nha em']
  },

  hero: {
    kicker: 'Nhật & Yến · 20.11.2025 – 20.11.2026',
    title: 'Một năm\ncủa tụi mình',
    sub: 'Tặng em bé Hải Yến, từ cái đồ “không danh không phận” năm nào ;>',
    photo: 'img/p27.jpg',
    photoCap: 'người yêu của anh',
    counterLabel: 'Từ tin nhắn đầu tiên, tụi mình đã có nhau được',
    loveLabel: 'và đã chính thức yêu nhau được',
    scrollCue: 'lướt xuống đi em ↓'
  },

  entries: [
  { date:'Hồi cấp 3', title:'Anh để ý em từ lâu lắm rồi',
    lead:'Trước khi có “tụi mình”, đã có một người đứng nhìn từ xa…',
    msg:['Từ cái chiều ở quán mì cay gần trường, em bước vào chào cô Mai rồi cười một cái, anh đã thấy quen quen rồi á. Mỗi tội hồi đó em có người khác mất rồi.',
         'Nói thật là anh hơi trách em một tí xíu thôi nha, sao không chia tay người ta sớm hơn chứ :’)'],
    sticker:{src:'stk/s2.png', side:'right', rot:9} },

  { date:'20.11.2025', title:'Tin nhắn đầu tiên',
    lead:'Rồi một ngày cuối tháng 11, ông trời cho anh một cơ hội…',
    photos:[{src:'img/tn1.jpg',fit:'full',cap:'Đêm 20/11, mấy dòng đầu tiên của tụi mình'},
            {src:'img/tn2.jpg',fit:'full',cap:'Hóa ra từ hồi lớp 5 em đã biết đến anh rồi á'},
            {src:'img/tn3.jpg',fit:'full',cap:'“Em thích anh lắm nên là không có chuyện đó đâu”'},
            {src:'img/tn4.jpg',fit:'full',cap:'Anh ngại mà vẫn cố nhắn tiếp nèee'},
            {src:'img/tn5.jpg',fit:'full',cap:'Thật? real=))????'},
            {src:'img/tn6.jpg',fit:'full',cap:'Ghi chú nhỏ mà tim anh đập to lắm'},
            {src:'img/tn7.jpg',fit:'full',cap:'Chị Vân bảo: phen này rung động thật rồi ;>'},
            {src:'img/tn8.jpg',fit:'full',cap:'Playlist “Yêu” anh làm cho em'}],
    msg:['Ngày 20/11, anh nhắn cho em. Chẳng nhớ nổi mình đã gõ đi gõ lại câu đầu tiên bao nhiêu lần nữa.',
         'Ai mà ngờ được, từ mấy dòng tin nhắn hôm ấy, giờ tụi mình đã đi được một năm rồi nèee.'] },

  { date:'06.12.2025', title:'Lần đầu hẹn hò',
    lead:'Mới quen được hơn hai tuần, anh đã xin về bằng được…',
    photos:[{src:'img/hh1.jpg',cap:'Bộ phim đầu tiên tụi mình xem cùng nhau'},
            {src:'img/hh2.jpg',cap:'Em bé ôm hoa bên cây thông Noel'},
            {src:'img/hh3.jpg',cap:'Xếp hàng mua bắp nước mà cũng thấy vui'},
            {src:'img/p1.jpg',cap:'Hải Yến cute như là cánh cụt ýy'},
            {src:'img/p2.jpg',cap:'Còn đây là tui'},
            {src:'img/hh4.jpg',cap:'Selfie kính phi công, hơi ngố mà vui'},
            {src:'img/p3.jpg',cap:'Tui và ín ín trên đường về nèe'}],
    msg:['Hôm ấy anh run chết đi được, mà cũng hóng không chịu nổi.',
         'Mang tiếng có hai mối tình trước rồi đấy, nhưng anh mới mất mỗi cái nắm tay thôi, còn lại lần đầu gì anh cũng để dành hết cho em á :’)'],
    sticker:{src:'stk/s1.png', side:'left', rot:-10} },

  { date:'12.2025 – 02.2026', title:'Hai đứa yêu xa',
    lead:'Rồi anh quay lại đơn vị, tụi mình chỉ còn nhìn nhau qua cái màn hình điện thoại…',
    photos:[{src:'img/yx1.jpg',cap:'Em bé chữ V qua màn hình'},
            {src:'img/yx2.jpg',cap:'Cười tít mắt luôn nè'},
            {src:'img/p4.jpg',cap:'Những cuộc gọi tối muộn'},
            {src:'img/p5.jpg',cap:'Gọi cho em mà ngồi cười một mình'},
            {src:'img/yx3.jpg',cap:'Anh ngồi chống cằm ngắm em đó'},
            {src:'img/yx4.jpg',cap:'Cái mặt hạnh phúc của tui'},
            {src:'img/p6.jpg',cap:'Hai tấm ảnh tạo chữ N của em'},
            {src:'img/p31.jpg',cap:'Anh ở đơn vị vẫn nhớ em nè'},
            {src:'img/yx5.jpg',fit:'full',cap:'21.12.2025 – anh nhớ em lắm'}],
    msg:['Những tối gọi nhau, những tấm ảnh chụp vội gửi cho nhau để biết người kia vẫn ổn. Lúc anh thấy hai tấm ảnh tạo chữ N, anh đã hạnh phúc lắm.',
         'Cũng chính mấy tháng này anh nảy ra ý viết truyện về tụi mình, vì nhớ em quá mà chẳng biết làm gì hơn ;>'],
    sticker:{src:'stk/s6.png', side:'right', rot:8} },

  { date:'07.02.2026', title:'Gặp lại nhau, hẹn hò lần hai',
    lead:'Hơn hai tháng đếm ngày, cuối cùng anh cũng được về…',
    photos:[{src:'img/p7.jpg',cap:'Cuối cùng cũng được nắm tay nhau sau bao ngày mong nhớ'},
            {src:'img/h2a.jpg',cap:'Chữ V đôi nèee'},
            {src:'img/p8.jpg',cap:'Hải Yến thì vẫn rất là cute rồii'},
            {src:'img/p9.jpg',cap:'Anh đã hạnh phúc biết bao, và anh nghĩ em cũng thế…'}],
    video:{label:'Video hôm ấy nè', src:''},
    msg:['Ngày 7/2 anh về, và tụi mình gặp lại nhau. Ngồi cạnh em mà anh cứ cười mãi, hạnh phúc chết đi được.'] },

  { date:'Tháng 2.2026', title:'Những ngày bám nhau',
    lead:'Rồi những ngày sau đó, hai đứa cứ dính lấy nhau…',
    photos:[{src:'img/p10.jpg',cap:'Em ngại nè'},
            {src:'img/p11.jpg',cap:'Chụp gương cũng phải chụp chung'},
            {src:'img/p12.jpg',cap:'Ôm cái cho đỡ nhớ'},
            {src:'img/p13.jpg',cap:'Suy tư cùng nhau'},
            {src:'img/bn1.jpg',cap:'Đêm nào cũng chạy qua gặp em'},
            {src:'img/bn2.jpg',cap:'Mưa gió vẫn đi, áo mưa cũng phải tạo dáng'},
            {src:'img/bn3.jpg',cap:'Hai ly trà sữa, hai đứa mình'},
            {src:'img/bn4.jpg',cap:'Nháy mắt cái cho em mê'},
            {src:'img/bn5.jpg',cap:'Dính lấy nhau không rời'}],
    msg:['Còn ở nhà ngày nào là anh tìm cách gặp em ngày đó.',
         'Còn nhiều lắmmm, nhưng anh chọn những tấm anh thích nhất áaa.'],
    sticker:{src:'stk/s4.png', side:'left', rot:-8} },

  { date:'14.02.2026', title:'Valentine & bó hoa đầu tiên',
    lead:'Có một ngày anh nghĩ là anh sẽ mãi không quên…',
    photos:[{src:'img/vl1.jpg',cap:'Em cười che miệng mà mắt vẫn híp lại'},
            {src:'img/p14.jpg',cap:'Bó hoa tươi đầu tiên anh tặng em'},
            {src:'img/vl3.jpg',cap:'Người đẹp và hoa'},
            {src:'img/vl2.jpg',cap:'Anh nháy mắt y như tấm ảnh em hay khen'},
            {src:'img/vl4.jpg',cap:'Ôm bó hoa không muốn buông'},
            {src:'img/vl7.jpg',cap:'Photobooth Valentine đầu tiên'},
            {src:'img/p16.jpg',cap:'Ai đó ngại quá che miệng luôn'},
            {src:'img/p15.jpg',cap:'Ôm hoa về trên xe anh'},
            {src:'img/vl5.jpg',cap:'Hai đứa trong gương chiếu hậu'},
            {src:'img/vl6.jpg',cap:'Thêm chút socola cho ngọt'}],
    msg:['Anh mặc bộ lễ phục, cầm bó hoa, nháy mắt đúng y như tấm ảnh em hay khen. Cả tầng quán hò reo, anh ngại muốn độn thổ luôn, nhưng nhìn em đỏ mặt ôm bó hoa, anh thấy đáng lắm.',
         'Hôm ấy anh còn hứa: đợi em tốt nghiệp, anh sẽ mang đến một bó hoa nữa, một lời ngỏ chính thức nữa.'],
    sticker:{src:'stk/s7.png', side:'right', rot:7} },

  { date:'29 Tết – mùng 5', title:'Tết đầu tiên có em',
    lead:'Đêm 29 Tết, năm cũ sắp qua…',
    photos:[{src:'img/p17.jpg',cap:'Năm nào cũng muốn bên em như thế'},
            {ph:'Thêm ảnh mùng 1 → mùng 5 từ album'}],
    msg:['Tụi mình gặp nhau chúc mừng năm mới. Rồi mùng 1, mùng 2, tới tận mùng 5, ngày nào hai đứa cũng tìm cách để thấy nhau.',
         'Lúc ấy anh đã mong năm nào tụi mình cũng được bên nhau như thế.'] },

  { date:'30.04.2026', title:'Kỷ yếu của em',
    lead:'Sau Tết anh lại đi, thi thoảng mới về được với em…',
    photos:[{src:'img/ky1.jpg',cap:'Em bé ngồi giữa sân trường'},
            {src:'img/ky2.jpg',cap:'Nghỉ chân cùng bó hoa'},
            {src:'img/p19.jpg',cap:'Và anh cũm ngầu đó chớooo'},
            {src:'img/ky3.jpg',cap:'Áo dài trắng, hoa hồng phấn'},
            {src:'img/p18.jpg',cap:'Người anh yêu vẫn xinh lắmmm'},
            {src:'img/ky4.jpg',cap:'Em nhìn anh nè'},
            {src:'img/ky5.jpg',cap:'Cười tít mắt luôn'},
            {src:'img/ky6.jpg',cap:'Tay trong tay'}],
    msg:['Nhưng thật may, anh về kịp ngày kỷ yếu của em. Hôm đó em hơi xu một tị, nhưng mà vẫn xinh nhất.',
         'Cũng đợt này, anh viết xong quyển truyện về chuyện tình của tụi mình.'],
    sticker:{src:'stk/s5.png', side:'left', rot:-9} },

  { date:'Hè 2026', title:'Hẹn hò ở Thái Bình',
    lead:'Rồi anh được nghỉ hè, tụi mình hẹn hò bù…',
    photos:[{src:'img/p20.jpg',cap:'Tụi mình đi tô tượng nèee'},
            {src:'img/p21.jpg',cap:'Đi chụp ptb nèee'},
            {src:'img/p22.jpg',cap:'Trông tui hơi phản diện nhưng mình vẫn đẹp đôiii'}],
    msg:['Tụi mình qua Thái Bình nhiều lắm: đi tô tượng, chụp photobooth, ăn sáng cùng nhau… Muốn đi đâu là rủ nhau đi luôn, không còn phải đếm từng tháng nữa.'] },

  { date:'29.07.2026', title:'Ngày em đồng ý',
    lead:'Và rồi, ngày anh đợi bao lâu cũng tới…',
    photos:[{src:'img/p23.jpg',cap:'Capybara cầm hoa xin lỗi em vụ quên mũ'},
            {src:'img/p24.jpg',cap:'Những tấm cuối cùng của “không danh không phận”'},
            {src:'img/p25.jpg',cap:'Áo khoác đôi nè'},
            {src:'img/p26.jpg',cap:'Lời hứa từ hôm Valentine'},
            {src:'img/p28.jpg',cap:'Tấm đầu tiên là người yêu của nhau'},
            {src:'img/p29.jpg',cap:'Ngại ngùng ghê chưa'},
            {src:'img/p30.jpg',cap:'Em bé của anh'}],
    msg:['Trời mưa, anh quên mũ cho em, quán hoa gọi giữa đường, suýt thì hỏng hết. Nhưng rồi ở quán photobooth chỉ có hai đứa, anh cầm bó hoa đã hứa bước tới:',
         '“Em làm người yêu anh nhé?” – “Không… thể từ chối.”',
         'Từ hôm ấy, tụi mình hết là cái đồ không danh không phận rồi nhaaa.'],
    sticker:{src:'stk/s8.png', side:'right', rot:9} },

  { date:'Bây giờ', title:'Em thành sinh viên rồi',
    lead:'Rồi em cũng lên đại học…',
    photos:[{ph:'Ảnh em vào thăm anh (chọn từ album)'}],
    msg:['Tụi mình gặp nhau được nhiều hơn, em vào thăm anh, những ngày bình thường bên nhau cứ thế nhiều lên.',
         'Anh vẫn tham lam lắm, anh muốn phải nhiều nhiều hơn nữaaaa.'],
    sticker:{src:'stk/s6.png', side:'left', rot:-7} }
],

  letter: {
    lead: 'Và cuối cùng, có mấy lời anh muốn nói riêng với em…',
    title: 'Gửi em bé Hải Yến',
    paragraphs: [
      'Một năm trước, anh chỉ là một người lặng lẽ để ý em từ xa, gõ một tin nhắn mà tim đập loạn hết cả lên. Một năm sau, anh có em, có cả một cuốn truyện, cả trăm tấm ảnh, và không biết bao nhiêu lần nằm cười một mình vì nhớ em.',
      'Cảm ơn em vì đã kiên nhẫn với một người vụng về, hay quên mũ bảo hiểm, hay làm em bực. Cảm ơn em vì những cuộc gọi tối muộn, vì tấm ảnh chữ N, và vì câu “không… thể từ chối” hôm ấy.',
      'Anh không biết tương lai sẽ đưa tụi mình đi đến đâu. Nhưng anh biết rất rõ một điều: anh muốn quãng thời gian phía trước của mình có em trong đó.',
      'Thật lâu. Thật lâu.'
    ],
    sign: 'Anh yêu em – Nhật (tui)'
  },

  ending: {
    title: 'Mình đi tiếp thật lâu nha',
    sub: 'còn nhiều nhiều lắm những trang tiếp theo…'
  }
};
