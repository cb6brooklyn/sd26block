const CACHE_VERSION='sd26-v7';
const CORE=['/','/block/','/assets/cd-page.css','/assets/sd26-theme.css','/assets/blocks/block-card.css','/assets/blocks/block-render.js','/data/sd26-index.json','/sd26-logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    if(resp&&resp.status===200){const c=resp.clone();caches.open(CACHE_VERSION).then(x=>x.put(e.request,c));}
    return resp;
  }).catch(()=>caches.match('/'))));
});
