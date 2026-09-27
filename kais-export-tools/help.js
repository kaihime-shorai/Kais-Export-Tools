try{
  let _cs=localStorage.getItem('csf-cafe-scheme-pages');
  if(_cs!=='light'&&_cs!=='dark'){const _old=localStorage.getItem('csf-cafe-scheme');if(_old==='light'||_old==='dark'){_cs=_old;try{localStorage.setItem('csf-cafe-scheme-pages',_cs);}catch(e){}}}
  if(_cs==='light'||_cs==='dark')document.documentElement.setAttribute('data-cafe-scheme',_cs);
}catch(e){}
// Help & FAQ page controls: font scaling (own key, same step/range as reader/viewer) + scroll shortcuts.
let fontScale = 1;

function applyFontScale(){
  document.body.style.fontSize = (16 * fontScale).toFixed(1) + 'px';
}

function adjustFont(d){
  fontScale = Math.min(1.35, Math.max(0.85, Math.round((fontScale + d) * 100) / 100));
  applyFontScale();
  try { localStorage.setItem('csf-font-scale-help', String(fontScale)); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function(){
  try {
    const fs = parseFloat(localStorage.getItem('csf-font-scale-help'));
    if (fs && fs >= 0.85 && fs <= 1.35) { fontScale = fs; applyFontScale(); }
  } catch (e) {}

  document.getElementById('fontMinusBtn').addEventListener('click', () => adjustFont(-0.1));
  document.getElementById('fontPlusBtn').addEventListener('click', () => adjustFont(0.1));
  document.getElementById('scrollTopBtn').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('scrollBottomBtn').addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));
});

// ===== Cozy Cafe light/dark toggle =====
document.addEventListener('DOMContentLoaded',function(){
  const btns=[document.getElementById('cafeSchemeToggle'),document.getElementById('cafeSchemeToggleDrawer')].filter(Boolean);if(!btns.length)return;
  const root=document.documentElement;
  function isDark(){const a=root.getAttribute('data-cafe-scheme');return a?a==='dark':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches&&window.matchMedia('(pointer: coarse)').matches);}
  function render(){const d=isDark();btns.forEach(btn=>{btn.textContent=d?'🌙 Dark':'☀️ Light';btn.setAttribute('aria-pressed',d?'true':'false');});}
  btns.forEach(btn=>btn.addEventListener('click',function(){
    const next=isDark()?'light':'dark';
    root.setAttribute('data-cafe-scheme',next);
    try{localStorage.setItem('csf-cafe-scheme-pages',next);}catch(e){}
    render();
  }));
  render();
});

// ===== Platform chooser (desktop / mobile) =====
document.addEventListener('DOMContentLoaded', function(){
  const dBtn = document.getElementById('platDesktopBtn');
  const mBtn = document.getElementById('platMobileBtn');
  if (!dBtn || !mBtn) return;
  function current(){
    try { const p = localStorage.getItem('csf-help-platform'); if (p === 'desktop' || p === 'mobile') return p; } catch (e) {}
    return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ? 'mobile' : 'desktop';
  }
  function renumber(){
    let n = 1;
    document.querySelectorAll('section h2 .num').forEach(el => {
      const sec = el.closest('section');
      if (sec && sec.offsetParent !== null) el.textContent = n++;
    });
  }
  function render(){
    const m = current() === 'mobile';
    document.body.classList.toggle('show-mobile', m);
    dBtn.classList.toggle('active', !m);
    mBtn.classList.toggle('active', m);
    renumber();
  }
  dBtn.addEventListener('click', () => { try { localStorage.setItem('csf-help-platform', 'desktop'); } catch (e) {} render(); });
  mBtn.addEventListener('click', () => { try { localStorage.setItem('csf-help-platform', 'mobile'); } catch (e) {} render(); });
  render();
});

// ===== Copy email address =====
// ▼▼▼ KAIHIME: PASTE THE CONTACT EMAIL ADDRESS BETWEEN THE QUOTES ▼▼▼
const KAIHIME_EMAIL = 'exporter.tools.for.shapes.inc@gmail.com';
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.copy-email').forEach(function(btn){
  btn.addEventListener('click', async function(){
    try {
      await navigator.clipboard.writeText(KAIHIME_EMAIL);
      btn.textContent = '✅ Copied! Paste it into your mail app';
    } catch (e) {
      btn.textContent = '📧 ' + KAIHIME_EMAIL;
    }
    setTimeout(() => { btn.textContent = '📧 Tap to copy my email address'; }, 2600);
  });
  });
});
