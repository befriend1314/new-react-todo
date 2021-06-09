export default function deBounce(fn, delay) {
  let timeout = null
  return function (e) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    },delay)
  }
}