export default function loadScript(src, callback) {
  var s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src;
  var head = document.head||document.getElementsByTagName("head")[0]
  head.appendChild(s)
  s.onload = callback
}
