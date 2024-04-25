<template>
  <svg class="spinner" viewBox="0 0 30 30">
    <circle
      class="path"
      cx="15"
      cy="15"
      r="10"
      fill="none"
      stroke-width="3"
    ></circle>
  </svg>
</template>

<style lang="scss" scoped>
.spinner {
  animation: rotate 2s linear infinite;
  width: 30px;
  height: 30px;

  & .path {
    stroke: hsl(210, 70%, 75%);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
