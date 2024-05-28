<template>
  <div class="card-container">
    <div class="title">
      <AnimatedPlaceholder
        class="img"
        width="50px"
        height="50px"
        border-radius="50%"
      />
      <AnimatedPlaceholder
        class="name title"
        width="50px"
        height="16px"
        border-radius="8%"
      />
    </div>
    <AnimatedPlaceholder
      class="value"
      width="100px"
      height="16px"
      border-radius="8%"
    />
    <AnimatedPlaceholder
      class="timestamp"
      width="50px"
      height="8px"
      border-radius="8%"
    />
  </div>
</template>
<style scoped>
.card-container {
  background-color: var(--placeholder-bg-color);
}
</style>
