const staticCacheName = 'mw-v2', 
pageSkeleton = 'index.html',
expectedCaches = [staticCacheName];
const thingsToCache = [
	'/',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./js/dbhelper.js',
	'./js/main.js',
	'./js/restaurant_info.js',
	'./data/restaurants.json',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
];

self.addEventListener('install', event => {
	self.skipWaiting();
	event.waitUntil(caches.open(staticCacheName).then(cache => cache.addAll(thingsToCache)));
});
	
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if(!expectedCaches.includes(key)) return caches.delete(key);
			})
		))
	);
});

self.addEventListener('fetch', event => {
	if (event.request.url.indexOf('https://maps.googleapi.com/js') > -1) {
		console.log('bypass this for now :(');
	} else {
		event.respondWith(
			caches.match(event.request, {ignoreSearch:true}).then(response => {
				return response || fetch(event.request);
			}).catch(err => console.log(err, event.request))
		);
	}
	
});