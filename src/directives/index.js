export const image_error = {
  inserted(el, binding) {
    el.addEventListener('error', () => {
      el.src = binding.value
    })
  }
}
