const vFocusB = {
  mounted: (el) => {
    console.log('Look mom! I am in a custom directive')
    el.focus()
  }
}

export default vFocusB