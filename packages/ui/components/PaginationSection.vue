<script setup lang="ts">
defineProps({
  itemsLength: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['change-page'])
const pageRef = ref(1)
const page = computed({
  get() {
    return pageRef.value
  },
  set(value) {
    emit('change-page', value)
    pageRef.value = value
  },
})
</script>

<template>
  <UPagination
    v-model="page"
    :page-count="25"
    :total="itemsLength"
    class="justify-center"
  />
</template>
