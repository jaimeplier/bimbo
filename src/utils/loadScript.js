export default function loadScript(src, callback) {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(s);
  s.onload = callback;
}
