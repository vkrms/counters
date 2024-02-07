import { ref, onMounted, onUnmounted } from 'vue'

// by convention it should begin with 'use' 
// I'm still not sure what a composable is but it reminds me of a react custom hook
export function useMouse() {
  // state inside composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // hooking into lifecycle of a component we use it in
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}