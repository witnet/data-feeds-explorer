export function copyToClipboard(str) {
  const listener = function (ev) {
    ev.preventDefault()
    ev.clipboardData.setData('text/plain', str)
  }
  document.addEventListener('copy', listener)
  document.execCommand('copy')
  document.removeEventListener('copy', listener)
}
