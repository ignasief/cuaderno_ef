const CACHE='cuaderno-ef-v3-8-9';
const ASSETS=['./','./index.html','./styles-v389.css?v=3.8.9','./app-v389.js?v=3.8.9','./manifest.webmanifest?v=3.8.9','./icons/icon-192-v382.png','./icons/icon-512-v382.png','./icons/apple-touch-icon-v382.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 const u=new URL(e.request.url);
 const isCore=u.pathname.endsWith('/index.html')||u.pathname.endsWith('/styles-v389.css')||u.pathname.endsWith('/app-v389.js')||u.pathname.endsWith('/cuaderno_ef/');
 if(isCore){e.respondWith(fetch(e.request,{cache:'no-store'}).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));}
 else{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp})));}
});
