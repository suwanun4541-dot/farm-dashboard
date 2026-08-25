const CACHE_NAME = 'farm-cache-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'

];

// ติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// เวลาดึงข้อมูล ให้เช็คว่าดึงจาก Google Sheets ไหม
self.addEventListener('fetch', event => {
  // ข้ามการทำ Cache ถ้าเป็นการส่ง/รับข้อมูลจาก Google Sheets
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  
  // สำหรับไฟล์แอป ให้ดึงจาก Cache ก่อน (ทำให้เปิดแอปตอนไม่มีเน็ตได้)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
