// ===== Shared Utilities =====
const $=id=>document.getElementById(id);
const lerp=(a,b,t)=>a+(b-a)*t;
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const sigmoid=x=>1/(1+Math.exp(-x));
const rand=(a,b)=>a+Math.random()*(b-a);
const randInt=(a,b)=>Math.floor(rand(a,b));
const dist=(x1,y1,x2,y2)=>Math.hypot(x2-x1,y2-y1);
const TAU=Math.PI*2;

function createCanvas(container,w,h){
  const c=document.createElement('canvas');
  c.width=w; c.height=h;
  c.style.width='100%';
  container.appendChild(c);
  const ctx=c.getContext('2d');
  return[c,ctx];
}
function addHint(el,t){
  const d=document.createElement('div');
  d.className='demo-hint'; d.textContent=t;
  el.appendChild(d);
}
function addControls(el){
  const d=document.createElement('div');
  d.className='demo-controls'; el.appendChild(d); return d;
}
// Mouse position helper (normalized to canvas coords)
function trackMouse(canvas,w,h){
  let mx=-1,my=-1,pressed=false;
  const get=e=>{const r=canvas.getBoundingClientRect();mx=(e.clientX-r.left)*w/r.width;my=(e.clientY-r.top)*h/r.height;};
  canvas.addEventListener('mousemove',get);
  canvas.addEventListener('mousedown',e=>{get(e);pressed=true;});
  canvas.addEventListener('mouseup',()=>pressed=false);
  canvas.addEventListener('mouseleave',()=>{mx=-1;my=-1;pressed=false;});
  return{get x(){return mx},get y(){return my},get down(){return pressed}};
}

// ===== Progress bar & Scroll =====
window.addEventListener('scroll',()=>{
  const s=window.scrollY, h=document.body.scrollHeight-window.innerHeight;
  const pb=document.querySelector('.progress-bar');
  if(pb) pb.style.width=(s/h*100)+'%';
  const bt=document.querySelector('.back-top');
  if(bt) bt.classList.toggle('show',s>400);
});

// ===== Animated Particles for Hero =====
function initParticles(id){
  const c=document.getElementById(id); if(!c) return;
  const ctx=c.getContext('2d');
  let w,h,particles=[],mouse={x:-1,y:-1};
  function resize(){
    w=c.width=c.offsetWidth; h=c.height=c.offsetHeight;
    particles=[];
    for(let i=0;i<80;i++) particles.push({
      x:rand(0,w),y:rand(0,h),vx:rand(-.25,.25),vy:rand(-.25,.25),
      r:rand(.8,2),o:rand(.08,.3),hue:rand(160,200)
    });
  }
  resize(); window.addEventListener('resize',resize);
  c.parentElement?.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});

  function frame(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=w; if(p.x>w)p.x=0;
      if(p.y<0)p.y=h; if(p.y>h)p.y=0;
      // Mouse repulsion
      if(mouse.x>0){
        const d=dist(p.x,p.y,mouse.x,mouse.y);
        if(d<120){const f=(1-d/120)*.5;p.vx+=(p.x-mouse.x)/d*f*.1;p.vy+=(p.y-mouse.y)/d*f*.1;}
      }
      p.vx*=.99; p.vy*=.99;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,TAU);
      ctx.fillStyle=`hsla(${p.hue},60%,70%,${p.o})`; ctx.fill();
    });
    // Connections
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const d=dist(particles[i].x,particles[i].y,particles[j].x,particles[j].y);
        if(d<100){
          ctx.strokeStyle=`rgba(78,205,196,${(1-d/100)*.07})`;
          ctx.lineWidth=.5; ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
}
