<template>
  <div v-if="isVisible">
    <img :src="src" :alt="alt">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ImageDisplay',
  props: {
    src: String,
    alt: String,
    isVisible: Boolean as PropType<boolean>,
  },
});
</script>
