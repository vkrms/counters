<!-- composition api -->
<script setup>
import { FwbButton } from 'flowbite-vue';
import { ref, provide } from 'vue'

import { getCounters, writeDoc } from '../lib/firebase';

const counters = ref([])

function fetchCounters() {
  console.log('fetching counters...')
  getCounters().then(res => {
    counters.value = res
  })
}

fetchCounters()

const isEditing = ref(false)

function createCounter() {
  isEditing.value = true
  // writeDoc().then((a) => console.log('awesome', a))
}

// custom directive
const vFocus = {
  mounted: (el) => {
    el.focus()
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.target.blur()

        // write into the firebase
        writeDoc(e.target.textContent).then((a) => console.log('new entry added', a))
        fetchCounters()
        isEditing.value = false
      }
    })
  }
};



provide('handleHide', (slug) => {
  // find by slug and remove
  const counterIndex = counters.value.findIndex(item => item.slug === slug);
  if (counterIndex !== -1) {
    counters.value.splice(counterIndex, 1);
  }
});
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <!-- here we list and manage counters -->
      <div class="font-bold sidebar-title">
        Counters:
      </div>

      <div
        v-for="item in counters"
        :key="item"
        class="counter-name p-[8px] transition-all duration-300 m-0 rounded-[4px] cursor-pointer hover:bg-[#1fbad6] hover:shadow-[0_0_8px_1px_#1fbad6] hover:text-white -ml-2"
      >
        <router-link
          :to="{name: 'counter', params: {
            slug: item.slug 
          }}"
        >
          {{ item.title }}
        </router-link>
      </div>

      <div
        v-if="isEditing"
        v-focus
        class="counter-name editable"
        contenteditable
        tabindex="0"
      />

      <!-- add btn -->
      <fwb-button
        color="default"
        class="btn counter-add rounded-lg"
        @click="createCounter"
      >
        +
      </fwb-button>
    </aside>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style src="./offensive.css" scoped></style>
