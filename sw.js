// UNITE Guide service worker
// - File utama (halaman, data.js, sw) diambil dari internet dulu, cache hanya cadangan offline.
//   Jadi begitu ada update di GitHub, HP langsung dapat versi baru saat online.
// - Gambar, ikon, font: dari cache dulu (jarang berubah).
// - Install tidak gagal total kalau ada satu file yang hilang.
const CACHE='unite-guide-2026-10-03-v2b';
const PRECACHE=["./", "index.html", "data.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png", "fonts/lexend-600.woff2", "fonts/lexend-800.woff2", "img/alolan-ninetales.webp", "img/azumarill.webp", "img/blastoise.webp", "img/blissey.webp", "img/buzzwole.webp", "img/cinderace.webp", "img/clefable.webp", "img/comfey.webp", "img/crustle.webp", "img/decidueye.webp", "img/dodrio.webp", "img/dragonite.webp", "img/espeon.webp", "img/glaceon.webp", "img/goodra.webp", "img/greedent.webp", "img/greninja.webp", "img/hoopa.webp", "img/lapras.webp", "img/leafeon.webp", "img/meowscarada.webp", "img/pikachu.webp", "img/sableye.webp", "img/scizor.webp", "img/slowbro.webp", "img/sylveon.webp", "img/talonflame.webp", "img/toxtricity.webp", "img/trevenant.webp", "img/tsareena.webp", "img/tyranitar.webp", "img/umbreon.webp", "img/urshifu.webp", "img/venusaur.webp", "img/zeraora.webp", "img/zoroark.webp"];
const FRESH=/(\/|index\.html|data\.js|manifest\.webmanifest)$/;

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(PRECACHE.map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin)return;
  const put=res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return res;};
  if(e.request.mode==='navigate'||FRESH.test(url.pathname)){
    // internet dulu, cadangan cache kalau offline
    e.respondWith(fetch(e.request,{cache:'no-cache'}).then(put).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(put)));
});
