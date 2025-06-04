<template>
  <div class="bg-black-200 bg-opacity-10 rounded-[24px]">
    <div class="card-container font-bold">
      <div class="header">
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
    <div class="flex gap-md py-sm px-md justify-end text-small">
      <AnimatedPlaceholder
        class="timestamp"
        width="62px"
        height="21px"
        border-radius="8%"
      />
      <AnimatedPlaceholder
        class="timestamp"
        width="62px"
        height="21px"
        border-radius="8%"
      />
      <AnimatedPlaceholder
        class="name title"
        width="55px"
        height="21px"
        border-radius="8%"
      />
    </div>
  </div>
</template>
