const CACHE='unite-guide-2026-10-03';
const PRECACHE=["./", "index.html", "data.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png", "img/alolan-ninetales.webp", "img/azumarill.webp", "img/blastoise.webp", "img/blissey.webp", "img/buzzwole.webp", "img/cinderace.webp", "img/clefable.webp", "img/comfey.webp", "img/crustle.webp", "img/decidueye.webp", "img/dodrio.webp", "img/dragonite.webp", "img/espeon.webp", "img/glaceon.webp", "img/goodra.webp", "img/greedent.webp", "img/greninja.webp", "img/hoopa.webp", "img/lapras.webp", "img/leafeon.webp", "img/meowscarada.webp", "img/pikachu.webp", "img/sableye.webp", "img/scizor.webp", "img/slowbro.webp", "img/sylveon.webp", "img/talonflame.webp", "img/toxtricity.webp", "img/trevenant.webp", "img/tsareena.webp", "img/tyranitar.webp", "img/umbreon.webp", "img/urshifu.webp", "img/venusaur.webp", "img/zeraora.webp", "img/zoroark.webp"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin)return;
  // app shell: cache-first, refresh in background
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(res=>{
      if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}
      return res;
    }).catch(()=>hit);
    return hit||net;
  }));
});
