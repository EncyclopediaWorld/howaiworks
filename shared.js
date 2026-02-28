// ===== Shared Utilities =====
const $ = (id) => document.getElementById(id);
const lerp = (a,b,t) => a + (b-a)*t;
const clamp = (v,lo,hi) => Math.max(lo, Math.min(hi, v));
const sigmoid = (x) => 1/(1+Math.exp(-x));
const rand = (a,b) => a + Math.random()*(b-a);
const randInt = (a,b) => Math.floor(rand(a,b));
const dist = (x1,y1,x2,y2) => Math.hypot(x2-x1, y2-y1);
const TAU = Math.PI*2;

function getDPR(){
  return Math.max(1, Math.min(3, window.devicePixelRatio || 1));
}

/** Polyfill: CanvasRenderingContext2D.roundRect (older Safari/WebViews) */
(function ensureRoundRect(){
  const proto = (window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype) ? CanvasRenderingContext2D.prototype : null;
  if(!proto || proto.roundRect) return;

  proto.roundRect = function(x,y,w,h,r){
    let rr = r;
    if(typeof rr === 'number') rr = {tl:rr,tr:rr,br:rr,bl:rr};
    rr = rr || {tl:0,tr:0,br:0,bl:0};
    const tl = rr.tl||0, tr = rr.tr||0, br = rr.br||0, bl = rr.bl||0;

    this.beginPath();
    this.moveTo(x+tl, y);
    this.lineTo(x+w-tr, y);
    this.quadraticCurveTo(x+w, y, x+w, y+tr);
    this.lineTo(x+w, y+h-br);
    this.quadraticCurveTo(x+w, y+h, x+w-br, y+h);
    this.lineTo(x+bl, y+h);
    this.quadraticCurveTo(x, y+h, x, y+h-bl);
    this.lineTo(x, y+tl);
    this.quadraticCurveTo(x, y, x+tl, y);
    this.closePath();
    return this;
  };
})();

/**
 * HiDPI canvas factory. Returns [canvas, ctx] with ctx already scaled to CSS pixels.
 * NOTE: width/height are in CSS pixels.
 */
function createCanvas(container, w, h){
  const c = document.createElement('canvas');
  c.classList.add('demo-canvas');

  // CSS size
  c.style.width = '100%';
  c.style.height = 'auto';

  // Backing store size
  const dpr = getDPR();
  c.width  = Math.max(1, Math.floor(w * dpr));
  c.height = Math.max(1, Math.floor(h * dpr));

  container.appendChild(c);
  const ctx = c.getContext('2d');

  // Normalize coordinate system to CSS pixels
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Helpful defaults
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  return [c, ctx];
}

function addHint(el, t){
  const d = document.createElement('div');
  d.className = 'demo-hint';
  d.textContent = t;
  el.appendChild(d);
}

function addControls(el){
  const d = document.createElement('div');
  d.className = 'demo-controls';
  el.appendChild(d);
  return d;
}

// Pointer position helper (normalized to canvas CSS coords)
function trackPointer(canvas, w, h){
  let mx = -1, my = -1, pressed = false;
  const get = (e) => {
    const r = canvas.getBoundingClientRect();
    mx = (e.clientX - r.left) * w / r.width;
    my = (e.clientY - r.top) * h / r.height;
  };

  const down = (e) => { get(e); pressed = true; };
  const up = () => { pressed = false; };

  canvas.addEventListener('pointermove', get, {passive:true});
  canvas.addEventListener('pointerdown', down, {passive:false});
  canvas.addEventListener('pointerup', up, {passive:true});
  canvas.addEventListener('pointercancel', up, {passive:true});
  canvas.addEventListener('pointerleave', () => { mx=-1; my=-1; pressed=false; }, {passive:true});

  return { get x(){return mx;}, get y(){return my;}, get down(){return pressed;} };
}

// Backwards-compatible alias (old sections call trackMouse)
function trackMouse(canvas, w, h){
  return trackPointer(canvas, w, h);
}

/**
 * Mobile compatibility shim:
 * Many demos use mouse events (onmousemove / onclick / oncontextmenu).
 * This shim maps PointerEvents (touch/pen) to synthetic MouseEvents + optional long-press contextmenu.
 */
function shimPointerToMouse(canvas){
  // Avoid double-binding
  if(canvas.__mouseShimmed) return;
  canvas.__mouseShimmed = true;

  let longPressTimer = null;
  let start = null;

  const fire = (type, pe) => {
    const ev = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: pe.clientX,
      clientY: pe.clientY,
      button: 0,
      buttons: (type==='mouseup') ? 0 : 1,
    });
    canvas.dispatchEvent(ev);
  };

  const clearLP = () => {
    if(longPressTimer){ clearTimeout(longPressTimer); longPressTimer = null; }
  };

  canvas.addEventListener('pointerdown', (pe) => {
    if(pe.pointerType === 'mouse') return; // native mouse already works
    try{ canvas.setPointerCapture(pe.pointerId); }catch(e){}
    start = {x: pe.clientX, y: pe.clientY};
    fire('mousemove', pe);
    fire('mousedown', pe);

    clearLP();
    longPressTimer = setTimeout(() => {
      // Long-press -> contextmenu (best-effort mobile "right click")
      const ce = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: pe.clientX,
        clientY: pe.clientY,
        button: 2,
      });
      canvas.dispatchEvent(ce);
    }, 450);
    pe.preventDefault();
  }, {passive:false});

  canvas.addEventListener('pointermove', (pe) => {
    if(pe.pointerType === 'mouse') return;
    if(start){
      const dx = pe.clientX - start.x, dy = pe.clientY - start.y;
      if(Math.hypot(dx,dy) > 6) clearLP();
    }
    fire('mousemove', pe);
    pe.preventDefault();
  }, {passive:false});

  canvas.addEventListener('pointerup', (pe) => {
    if(pe.pointerType === 'mouse') return;
    clearLP();
    fire('mouseup', pe);

    // Click (tap) synthesis
    if(start){
      const dx = pe.clientX - start.x, dy = pe.clientY - start.y;
      if(Math.hypot(dx,dy) <= 8){
        const clk = new MouseEvent('click', {bubbles:true, cancelable:true, clientX:pe.clientX, clientY:pe.clientY, button:0});
        canvas.dispatchEvent(clk);
      }
    }
    start = null;
    pe.preventDefault();
  }, {passive:false});

  canvas.addEventListener('pointercancel', () => { clearLP(); start=null; }, {passive:true});
}

// Auto-apply shim to demo canvases once they exist
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('canvas').forEach(shimPointerToMouse);
});

// ===== Progress bar & Scroll =====
window.addEventListener('scroll', () => {
  const s = window.scrollY, h = document.body.scrollHeight - window.innerHeight;
  const pb = document.querySelector('.progress-bar');
  if(pb) pb.style.width = (h>0 ? (s/h*100) : 0) + '%';
  const bt = document.querySelector('.back-top');
  if(bt) bt.classList.toggle('show', s > 400);
}, {passive:true});

// ===== Animated Particles for Hero =====
function initParticles(id){
  const c = document.getElementById(id);
  if(!c) return;

  // Respect reduced-motion
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    return;
  }

  const ctx = c.getContext('2d');
  let w, h, particles = [], mouse = {x:-1, y:-1};
  let running = true;

  function resize(){
    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;
    particles = [];
    const N = (window.innerWidth < 640) ? 36 : 80;
    for(let i=0;i<N;i++){
      particles.push({
        x: rand(0,w), y: rand(0,h),
        vx: rand(-.25,.25), vy: rand(-.25,.25),
        r: rand(.8,2), o: rand(.08,.3), hue: rand(160,200)
      });
    }
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  const host = c.parentElement || c;
  host.addEventListener('mousemove', (e) => {
    const r = c.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }, {passive:true});

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  // Pause when offscreen
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      const v = entries.some(en => en.isIntersecting);
      running = v && !document.hidden;
    }, {threshold: 0.05});
    io.observe(c);
  }

  function frame(){
    if(running){
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if(p.x<0)p.x=w; if(p.x>w)p.x=0;
        if(p.y<0)p.y=h; if(p.y>h)p.y=0;

        // Mouse repulsion
        if(mouse.x>0){
          const d = dist(p.x,p.y,mouse.x,mouse.y);
          if(d<120){
            const f = (1 - d/120) * .5;
            p.vx += (p.x-mouse.x)/Math.max(1e-6,d) * f * .1;
            p.vy += (p.y-mouse.y)/Math.max(1e-6,d) * f * .1;
          }
        }
        p.vx *= .99; p.vy *= .99;

        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,TAU);
        ctx.fillStyle = `hsla(${p.hue},60%,70%,${p.o})`;
        ctx.fill();
      });

      // Connections
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const d = dist(particles[i].x,particles[i].y,particles[j].x,particles[j].y);
          if(d<100){
            ctx.strokeStyle = `rgba(78,205,196,${(1-d/100)*.07})`;
            ctx.lineWidth = .5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
}
