/* Bộ khung trang – thường không cần sửa file này. Nội dung nằm trong content.js */
(function(){
const ORIGINAL = JSON.parse(JSON.stringify(window.CONTENT));
const DRAFT_KEY = 'nhy-draft-v1';
const EDIT = location.hash === '#edit';
let C = JSON.parse(JSON.stringify(ORIGINAL));
let hasDraft = false;
try { const d = localStorage.getItem(DRAFT_KEY); if (d) { C = JSON.parse(d); hasDraft = true; } } catch(e){}

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const getP = p => p.split('.').reduce((o,k) => o == null ? o : o[k], C);
function setP(p, v){ const ks = p.split('.'); let o = C; for (let i=0;i<ks.length-1;i++) o = o[ks[i]]; o[ks[ks.length-1]] = v; }
function saveDraft(){
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(C)); status('Đã lưu nháp trong trình duyệt này. Nhớ bấm “Tải content.js” để cập nhật lên web.'); }
  catch(e){ status('Trình duyệt không cho lưu nháp – hãy bấm “Sao chép” hoặc “Tải content.js” trước khi đóng trang.'); }
}
function status(t){ const s = $('#eStatus'); if (s) s.textContent = t; }

const heartSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4.5 6 4.5c2.2 0 3.6 1.2 4.5 2.6.3.5 1 .5 1.3 0 .9-1.4 2.3-2.6 4.5-2.6 3.7 0 5.6 3.9 4 7.2C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>';
const arrowL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
const playSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z" fill="currentColor"/></svg>';

/* ---------- static texts ---------- */
function fillStatic(){
  document.querySelectorAll('[data-path]:not(#timeline [data-path]):not(#letterMsg [data-path])').forEach(el => { el.textContent = getP(el.dataset.path) ?? ''; });
  $('#lockStk').src = C.lock.sticker || '';
  $('#heroImg').src = C.hero.photo || '';
  $('#letterMsg').innerHTML = C.letter.paragraphs.map((p,i) => `<p data-path="letter.paragraphs.${i}">${esc(p)}</p>`).join('')
    + (EDIT ? `<div class="ectl entry-ctl" style="margin-top:8px"><button type="button" data-act="addLetterPara">+ Thêm đoạn</button></div>` : '');
}

/* ---------- timeline ---------- */
function renderTimeline(){
  const E = C.entries, n = E.length;
  $('#timeline').innerHTML = E.map((e,i) => {
    const photos = e.photos || [];
    const moveOpts = E.map((x,j) => j===i ? '' : `<option value="${j}">${esc(x.date)}</option>`).join('');
    const slides = photos.map((p,k) => {
      const ctl = EDIT ? `<div class="ectl slide-ctl">
          <button type="button" data-act="pl" data-e="${i}" data-k="${k}" aria-label="Đưa ảnh lên trước" ${k===0?'disabled':''}>◀</button>
          <button type="button" data-act="pr" data-e="${i}" data-k="${k}" aria-label="Đưa ảnh ra sau" ${k===photos.length-1?'disabled':''}>▶</button>
          <button type="button" data-act="pdel" data-e="${i}" data-k="${k}" aria-label="Bỏ ảnh này">✕</button>
          <select data-act="pmove" data-e="${i}" data-k="${k}" aria-label="Chuyển ảnh sang mốc khác"><option value="">Chuyển sang…</option>${moveOpts}</select>
        </div>` : '';
      if (p.ph) return `<div class="slide empty"><div class="box" data-path="entries.${i}.photos.${k}.ph">${esc(p.ph)}</div><div class="cap">sắp có nè</div>${ctl}</div>`;
      return `<div class="slide${p.fit==='full'?' full':''}"><button class="ph" type="button" data-src="${esc(p.src)}" data-cap="${esc(p.cap)}" aria-label="Xem lớn: ${esc(p.cap||'ảnh')}"><img src="${esc(p.src)}" alt="${esc(p.cap)}" loading="lazy" decoding="async"></button><div class="cap" data-path="entries.${i}.photos.${k}.cap">${esc(p.cap)}</div>${ctl}</div>`;
    }).join('');
    const multi = photos.length > 1;
    const carousel = photos.length ? `
      <div class="carousel">
        <div class="track" tabindex="0" aria-label="Album ${esc(e.title)}">${slides}</div>
        ${multi ? `<div class="cnav">
          <button class="arrow prev" type="button" aria-label="Ảnh trước">${arrowL}</button>
          <div class="dots">${photos.map((_,k)=>`<i class="${k?'':'on'}"></i>`).join('')}</div>
          <button class="arrow next" type="button" aria-label="Ảnh sau">${arrowR}</button>
        </div><div class="swipe-hint">gạt sang để xem thêm</div>` : ''}
      </div>` : '';
    const addPhoto = EDIT ? `<div class="ectl add-photo"><label class="pick-local">📷 Chọn ảnh từ máy<input type="file" accept="image/*,.heic" multiple data-pick="${i}" hidden></label><input type="text" placeholder="img/ten-anh.jpg" aria-label="Đường dẫn ảnh mới" data-addinput="${i}"><button type="button" data-act="padd" data-e="${i}">+ Thêm ảnh</button></div>` : '';
    const video = e.video ? `<div class="video"><div class="vlabel" data-path="entries.${i}.video.label">${esc(e.video.label)}</div>${
        e.video.src ? `<video src="${esc(e.video.src)}" ${e.video.poster?`poster="${esc(e.video.poster)}"`:''} controls playsinline preload="${e.video.poster?'none':'metadata'}"></video>`
                    : `<div class="box">${playSvg}<div>Video sẽ được thêm vào đây</div></div>`}</div>` : '';
    const st = e.sticker ? `<img class="stk-float" src="${esc(e.sticker.src)}" alt="" style="${e.sticker.side==='left'?'left':'right'}:-4px;rotate:${e.sticker.rot||0}deg;animation-delay:${(i%4)*.5}s">` : '';
    const ectl = EDIT ? `<div class="ectl entry-ctl">
        <button type="button" data-act="eup" data-e="${i}" ${i===0?'disabled':''}>↑ Đưa mốc lên</button>
        <button type="button" data-act="edown" data-e="${i}" ${i===n-1?'disabled':''}>↓ Đưa mốc xuống</button>
        <button type="button" data-act="eadd" data-e="${i}">+ Mốc mới bên dưới</button>
        <button type="button" data-act="edel" data-e="${i}">Xóa mốc</button>
      </div>` : '';
    return `<article class="entry reveal${e.sticker ? ' st-'+(e.sticker.side==='left'?'left':'right') : ''}">
      ${st}
      <p class="lead" data-path="entries.${i}.lead">${esc(e.lead)}</p>
      ${ectl}
      <div class="card">
        <span class="date" data-path="entries.${i}.date">${esc(e.date)}</span>
        <h2 data-path="entries.${i}.title">${esc(e.title)}</h2>
        ${carousel}
        ${addPhoto}
        <div class="msg">${(e.msg||[]).map((m,k)=>`<p data-path="entries.${i}.msg.${k}">${esc(m)}</p>`).join('')}</div>
        ${EDIT ? `<div class="ectl entry-ctl" style="margin-top:8px"><button type="button" data-act="addPara" data-e="${i}">+ Thêm đoạn</button></div>` : ''}
        ${video}
      </div>
    </article>`;
  }).join('');
  initCarousels();
  initReveal();
  if (EDIT) makeEditable();
}

function initCarousels(){
  document.querySelectorAll('.carousel').forEach(c => {
    const track = c.querySelector('.track'), dots = c.querySelectorAll('.dots i'), slides = c.querySelectorAll('.slide');
    const idx = () => { let best=0,bd=1e9; const mid = track.scrollLeft + track.clientWidth/2;
      slides.forEach((s,k)=>{ const d=Math.abs(s.offsetLeft + s.offsetWidth/2 - mid); if(d<bd){bd=d;best=k;} }); return best; };
    const go = k => { k=Math.max(0,Math.min(slides.length-1,k)); const s=slides[k];
      track.scrollTo({left:s.offsetLeft - (track.clientWidth - s.offsetWidth)/2, behavior:'smooth'}); };
    track.addEventListener('scroll', () => { const k=idx(); dots.forEach((d,j)=>d.classList.toggle('on',j===k)); }, {passive:true});
    const p=c.querySelector('.prev'), n=c.querySelector('.next');
    if(p) p.addEventListener('click',()=>go(idx()-1));
    if(n) n.addEventListener('click',()=>go(idx()+1));
  });
}

let io = null;
function initReveal(){
  if (EDIT || !('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')); return; }
  if (!io) io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }), {threshold:.12});
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}

/* ---------- edit mode ---------- */
function makeEditable(){
  let mode = 'plaintext-only';
  const t = document.createElement('div'); t.contentEditable = 'plaintext-only'; if (t.contentEditable !== 'plaintext-only') mode = 'true';
  document.querySelectorAll('[data-path]').forEach(el => {
    if (el.dataset.bound) return; el.dataset.bound = '1';
    el.contentEditable = mode; el.spellcheck = false;
    el.addEventListener('input', () => { setP(el.dataset.path, el.innerText.replace(/\n+$/,'')); saveDraft(); });
  });
}
function structural(fn){ fn(); saveDraft(); const y = scrollY; renderTimeline(); fillStatic(); makeEditable(); scrollTo(0,y); }

document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-act]'); if (!b || !EDIT || b.tagName === 'SELECT') return;
  const E = C.entries, i = +b.dataset.e, k = +b.dataset.k, act = b.dataset.act;
  const swap = (a,x,y) => { const t=a[x]; a[x]=a[y]; a[y]=t; };
  if (act==='edel' && !b.dataset.armed) { b.dataset.armed='1'; b.textContent='Bấm lần nữa để xóa'; setTimeout(()=>{ if(b.isConnected){ delete b.dataset.armed; b.textContent='Xóa mốc'; } }, 3000); return; }
  structural(() => {
    if (act==='pl') swap(E[i].photos,k,k-1);
    if (act==='pr') swap(E[i].photos,k,k+1);
    if (act==='pdel') E[i].photos.splice(k,1);
    if (act==='eup') swap(E,i,i-1);
    if (act==='edown') swap(E,i,i+1);
    if (act==='eadd') E.splice(i+1,0,{date:'Ngày…',title:'Mốc mới',lead:'Câu dẫn…',photos:[{ph:'Thêm ảnh'}],msg:['Viết gì đó cho em…']});
    if (act==='edel') E.splice(i,1);
    if (act==='addPara') (E[i].msg = E[i].msg || []).push('Đoạn mới…');
    if (act==='addLetterPara') C.letter.paragraphs.push('Đoạn mới…');
    if (act==='padd') { const inp = document.querySelector(`[data-addinput="${i}"]`); const v = inp && inp.value.trim();
      if (v) { E[i].photos = E[i].photos || []; E[i].photos.push({src:v, cap:'Chú thích…'}); } }
  });
});
document.addEventListener('change', ev => {
  const s = ev.target.closest('select[data-act="pmove"]'); if (!s || s.value==='') return;
  const i=+s.dataset.e, k=+s.dataset.k, to=+s.value;
  structural(() => { const [p] = C.entries[i].photos.splice(k,1); (C.entries[to].photos = C.entries[to].photos || []).push(p); });
  status('Đã chuyển ảnh sang mốc “'+C.entries[to].date+'” (nằm cuối album).');
});

function exportText(){
  return '/* NỘI DUNG TRANG WEB – xuất từ chế độ chỉnh sửa (#edit). Chép đè file content.js bằng file này. */\nwindow.CONTENT = ' + JSON.stringify(C, null, 2) + ';\n';
}
function setupEditBar(){
  const bar = $('#editBar'); bar.hidden = false; document.body.classList.add('editing');
  $('#eDownload').addEventListener('click', () => {
    try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([exportText()],{type:'text/javascript'})); a.download = 'content.js'; document.body.appendChild(a); a.click(); a.remove();
      status('Đã tải content.js – chép đè file cũ trong thư mục dự án rồi đẩy lên web.'); }
    catch(e){ status('Không tải được ở đây – bấm “Sao chép” rồi dán vào content.js.'); }
  });
  $('#eCopy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(exportText()); status('Đã sao chép – dán đè toàn bộ nội dung file content.js.'); }
    catch(e){ status('Trình duyệt chặn sao chép – hãy dùng “Tải content.js”.'); }
  });
  $('#eReset').addEventListener('click', ev => {
    const b = ev.currentTarget; if (!b.dataset.armed){ b.dataset.armed='1'; b.textContent='Chắc chưa? Bấm lần nữa'; setTimeout(()=>{delete b.dataset.armed; b.textContent='Bỏ hết thay đổi';},3000); return; }
    try { localStorage.removeItem(DRAFT_KEY); } catch(e){}
    C = JSON.parse(JSON.stringify(ORIGINAL)); fillStatic(); renderTimeline(); makeEditable();
    delete b.dataset.armed; b.textContent='Bỏ hết thay đổi'; status('Đã quay về bản trong content.js.');
  });
  $('#eExit').addEventListener('click', () => { location.hash = ''; location.reload(); });

  /* Chạy qua Sua-web.bat trên laptop: chọn ảnh từ máy + đăng thẳng lên web */
  fetch('/api/ping', {cache:'no-store'}).then(r => r.ok && r.json()).then(j => {
    if (!j || !j.ok) return;
    document.body.classList.add('local');
    status('Đang sửa trên laptop: chọn ảnh từ máy ở mỗi mốc, sửa xong bấm “Lưu & đăng lên web”.');
    const pub = $('#ePublish'); pub.hidden = false;
    pub.addEventListener('click', async () => {
      pub.disabled = true; status('Đang đăng lên web…');
      try {
        const r = await fetch('/api/publish', {method:'POST', body: exportText()}); const j = await r.json();
        status(j.msg); if (j.ok) { try { localStorage.removeItem(DRAFT_KEY); } catch(e){} }
      } catch(e) { status('Không kết nối được – cửa sổ Sua-web còn mở không?'); }
      pub.disabled = false;
    });
  }).catch(() => {});
  document.addEventListener('change', async ev => {
    const inp = ev.target.closest('input[data-pick]'); if (!inp || !inp.files.length) return;
    const i = +inp.dataset.pick, files = [...inp.files]; const added = [];
    for (let n = 0; n < files.length; n++) {
      status(`Đang thêm ảnh ${n+1}/${files.length}…`);
      try {
        const r = await fetch('/api/upload?name=' + encodeURIComponent(files[n].name), {method:'POST', body: files[n]});
        const j = await r.json(); if (j.ok) added.push(j.src); else status(j.msg || 'Lỗi thêm ảnh');
      } catch(e) { status('Không kết nối được – cửa sổ Sua-web còn mở không?'); return; }
    }
    structural(() => {
      const E = C.entries[i]; E.photos = (E.photos || []).filter(p => !p.ph);
      added.forEach(src => E.photos.push({src, cap:'Chú thích…'}));
    });
    status(`Đã thêm ${added.length} ảnh vào cuối album – bấm vào “Chú thích…” để viết câu dẫn.`);
  });
}

/* ---------- lightbox, stickers, counter, envelope, lock ---------- */
const lb = $('#lb');
let lbList = [], lbIdx = 0;
lb.insertAdjacentHTML('beforeend', `<button class="lbnav prev" type="button" aria-label="Ảnh trước">${arrowL}</button><button class="lbnav next" type="button" aria-label="Ảnh sau">${arrowR}</button><div class="lbcount"></div>`);
function lbShow(i){
  if (!lbList.length) return;
  lbIdx = (i + lbList.length) % lbList.length; const b = lbList[lbIdx];
  const img = lb.querySelector('img'); img.src=b.dataset.src; img.alt=b.dataset.cap;
  lb.querySelector('.lbcap').textContent=b.dataset.cap;
  lb.querySelector('.lbcount').textContent = lbList.length>1 ? `${lbIdx+1} / ${lbList.length}` : '';
  lb.classList.toggle('single', lbList.length<2);
}
document.addEventListener('click', ev => {
  if (EDIT) return;
  const b = ev.target.closest('button.ph'); if(!b) return;
  const track = b.closest('.track');
  lbList = track ? [...track.querySelectorAll('button.ph')] : [b];
  lbShow(lbList.indexOf(b)); lb.classList.add('show'); lb.querySelector('.close').focus();
});
lb.addEventListener('click', ev => {
  if (ev.target.closest('.lbnav.prev')) return lbShow(lbIdx-1);
  if (ev.target.closest('.lbnav.next')) return lbShow(lbIdx+1);
  if(ev.target===lb || ev.target.closest('.close')) lb.classList.remove('show');
});
document.addEventListener('keydown', ev => {
  if (!lb.classList.contains('show')) return;
  if(ev.key==='Escape') lb.classList.remove('show');
  if(ev.key==='ArrowLeft') lbShow(lbIdx-1);
  if(ev.key==='ArrowRight') lbShow(lbIdx+1);
});
let lbX = null;
lb.addEventListener('touchstart', ev => { lbX = ev.touches[0].clientX; }, {passive:true});
lb.addEventListener('touchend', ev => {
  if (lbX===null) return; const dx = ev.changedTouches[0].clientX - lbX; lbX = null;
  if (Math.abs(dx) > 45) lbShow(lbIdx + (dx<0 ? 1 : -1));
});

document.addEventListener('click', ev => {
  const s = ev.target.closest('.stk-float'); if(!s) return;
  s.classList.remove('wiggle'); void s.offsetWidth; s.classList.add('wiggle');
  burst(ev.clientX, ev.clientY, 6); setTimeout(()=>s.classList.remove('wiggle'),650);
});

const pad = n => String(n).padStart(2,'0');
function tick(){
  const now = new Date(), START = new Date(C.start), LOVE = new Date(C.love);
  let s = Math.max(0, Math.floor((now-START)/1000)); const d = Math.floor(s/86400); s%=86400;
  $('#cd').textContent=d; $('#ch').textContent=pad(Math.floor(s/3600)); $('#cm').textContent=pad(Math.floor(s%3600/60)); $('#cs').textContent=pad(s%60);
  $('#cl').textContent=Math.max(0,Math.floor((now-LOVE)/86400000));
}

const env=$('#envBtn'), letter=$('#letter');
env.addEventListener('click', ev => { letter.classList.add('show'); env.style.display='none'; env.setAttribute('aria-expanded','true'); burst(ev.clientX, ev.clientY, 14); });

function burst(x,y,n){
  for(let i=0;i<n;i++){
    const h=document.createElement('div'); h.className='burst'; h.innerHTML=heartSvg;
    const sz=14+Math.random()*16; h.style.cssText=`left:${x-sz/2}px;top:${y-sz/2}px;width:${sz}px;height:${sz}px;--dx:${(Math.random()-.5)*220}px;--dy:${-60-Math.random()*200}px;--r:${(Math.random()-.5)*90}deg;color:${Math.random()<.5?'#c93f78':'#2f7fc1'}`;
    document.body.appendChild(h); setTimeout(()=>h.remove(),1700);
  }
}

const lock=$('#lock'), form=$('#lockForm'), msg=$('#lockMsg'), main=$('#main');
let tries=0;
function openMain(){ lock.style.display='none'; main.removeAttribute('aria-hidden'); }
function unlock(){
  lock.classList.add('gone'); main.removeAttribute('aria-hidden');
  try{ sessionStorage.setItem('nhy-open','1'); }catch(e){}
  setTimeout(()=>{ lock.style.display='none'; }, 750);
  for(let k=0;k<3;k++) setTimeout(()=>burst(innerWidth*(.25+.25*k), innerHeight*.6, 12), k*180);
}
form.addEventListener('submit', ev => {
  ev.preventDefault();
  const v=$('#pw').value.replace(/\D/g,''), w=C.lock.wrong||['Sai rồi nè'];
  if((C.passwords||[]).includes(v)){ msg.textContent='Đúng rồi! Vào đây với anh nè'; unlock(); }
  else { msg.textContent=w[Math.min(tries,w.length-1)]; tries++; form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake'); }
});

/* ---------- start ---------- */
fillStatic(); renderTimeline(); tick(); setInterval(tick,1000);
if (EDIT) { openMain(); letter.classList.add('show'); env.style.display='none'; setupEditBar(); makeEditable();
  status(hasDraft ? 'Đang mở bản nháp đã lưu trên máy này. Bấm chữ để sửa, ◀ ▶ để đổi thứ tự ảnh.' : $('#eStatus').textContent); }
else { try{ if(sessionStorage.getItem('nhy-open')==='1') openMain(); }catch(e){} }
window.addEventListener('hashchange', () => { if ((location.hash==='#edit') !== EDIT) location.reload(); });
})();
