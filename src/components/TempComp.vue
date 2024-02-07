<script setup>
import { ref, /*reactive,*/ computed, onMounted } from 'vue';
import { useMouse } from '../composables/mouse';
import vFocusB from '../directives/focus';

const { x, y } = useMouse();

// const { attrs } = context
// const tabindex = attrs.tabindex
// console.log(props.title)
// turn props into an object of refs, then destructure
// const { title } = toRefs(props)

// reactive can only work with objects
// const state = reactive({
//     weight: 80
// })

// we use ref for primitives (numbers and strings)
const desiredWeight = ref(50);
const count = ref(0);
const supModel = ref('broccoli ui');

const myComputed = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

// OR, turn a single property on props into a ref
// const titleB = toRef(props, 'title')

// console.log(title.value, titleB.value, {tabindex})

// function tweakDesiredWeight() {
//     // in a method we increase the value prop
//     desiredWeight.value++
// }

function clicker(e) {
  console.log('clicker clicked', e);
}

onMounted(() => {
  console.log('mounted');
});

function gainWeight() {
  this.state.weight++;
}

// custom directive is simply a function!
const vFocus = {
  mounted: (el) => {
    console.log('yay b');
    el.focus();
  },
};
</script>

<template>
  <div>desired weight: {{ desiredWeight }}</div>
  <div>weight: {{ weight }}</div>
  <h4>{{ supModel }}</h4>
  <div>computed: {{ myComputed }}</div>
  <button
    class="btn"
    @click="gainWeight"
  >
    gain weight
  </button>

  <!-- in a template we don't have to increase the value prop  -->
  <button
    class="btn"
    @click="desiredWeight++"
  >
    tweak desired weight (inline)
  </button>

  <div>
    <!-- <button class="btn" @click="tweakDesiredWeight">tweak desired weight (method)</button> -->
    <button
      class="btn"
      @click="count++"
    >
      Count: {{ count }}
    </button>
    <br>
    <input v-model="myComputed">
  </div>

  <div>
    <!-- a simpler way would be to just use `v-model` attribute -->
    <input
      v-focus
      v-focus-b
      :value="supModel"
      @input="supModel = $event.target.value"
    >

    <div>
      <a
        href="#"
        @click.prevent="clicker"
      >click me</a>
    </div>
  </div>

  <code> Mouse position is at: {{ x }}, {{ y }} </code>
</template>
