<template>
  <svg
    width="7"
    height="7"
    viewBox="0 0 7 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="3.5"
      cy="3.5"
      r="3.5"
      :fill="color"
    />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#4AB6A1',
    },
  },
}
</script>
