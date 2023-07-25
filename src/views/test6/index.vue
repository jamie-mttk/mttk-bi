<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebounceFn,computedAsync  } from '@vueuse/core'

const updated = ref(0)
const clicked = ref(0)
const debouncedFn = useDebounceFn(() => {
	updated.value += 1
}, 1000, { maxWait: 5000 })

//
const com = computedAsync(async () => {
	console.log('hello')
	return await useDebounceFn(() => {
		console.log('come here'+clicked.value)
		return clicked
	}, 1000, { maxWait: 5000 })()
})

function clickedFn() {
	clicked.value += 1
	debouncedFn()
}



</script>

<template>
	<button @click="clickedFn">
		Smash me!
	</button>
	<note>Delay is set to 1000ms and maxWait is set to 5000ms for this demo.</note>

	<p>Button clicked: {{ clicked }}</p>
	<p>Event handler called: {{ updated }}</p>
	<p>computed: {{ com }}</p>
</template>