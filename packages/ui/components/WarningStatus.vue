<template>
  <svg
    width="14"
    height="11"
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 2.84795L15.4733 13.6364H2.52675L9 2.84795ZM9 0L0 15H18L9 0ZM8.25 6.13636H9.75V10.2273H8.25V6.13636ZM9 12.7841C8.48325 12.7841 8.0625 12.4023 8.0625 11.9318C8.0625 11.4614 8.48325 11.0795 9 11.0795C9.51675 11.0795 9.9375 11.4614 9.9375 11.9318C9.9375 12.4023 9.51675 12.7841 9 12.7841Z"
      :fill="color"
      fill-opacity="0.8"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
  },
}
</script>
