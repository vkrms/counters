<script setup>
import { ref, inject, defineProps, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { FwbInput, FwbButton } from 'flowbite-vue'
import { getCounter, write } from '../lib/firebase'

const props = defineProps({
  slug: String
})

function fetchCounter(slug) {
  countUpdates.value = 0
  getCounter(slug).then(newCounter => {
    console.log({newCounter})
    state.value = newCounter
  });
}

watch(() => props.slug, fetchCounter)

// const counter = ref({});
const emptyObj = {}
const state = ref(emptyObj)

onMounted(() => {
  fetchCounter(props.slug)
})

// Watch state
const countUpdates = ref(0)
watch(() => state, () => {
  console.log(countUpdates.value)
  if (countUpdates.value == 0) {
    countUpdates.value++
    return
  }
  autoSave()
}, { deep: true })

function increase() {
  state.value.Current = (state.value.Current || 0) + 1;
}

function reset() {
  state.value.Current = 0;
}

const handleHideAbove = inject('handleHide')

const router = useRouter()

function hide() {
  state.value.Hidden = true
  handleHideAbove?.(state.value.Slug)
  router.push('/')
}

function autoSave() {
  console.log('autosave')
  write(state.value)
}
</script>

<!-- TEMPLATE -->
<template @hide="handleHide">
  <!-- <code>{{ props.slug }}</code> -->
  <h3 class="mb-4">{{ state.Title }}</h3>

  <div class="descr">
    {{ state.Descr }}
  </div>

  <span class="w-5 text-right inline-block">{{ state.Current }}</span>

  <!-- separator -->
  <span class="m-4">/</span>

  <!-- number input -->
  <fwb-input
    v-model="state.Max"
    type="number"
    step="1"
    class="w-16 inline-block"
  />

  <!-- increase counter -->
  <fwb-button
    class="btn ml-4"
    @click="increase"
  >
    +
  </fwb-button>

  <!-- reset & hide -->
  <div class="mt-6 flex gap-3 justify-center">
    <fwb-button @click="reset">
      Reset
    </fwb-button>

    <fwb-button @click="hide">
      Hide
    </fwb-button>
  </div>
</template>
