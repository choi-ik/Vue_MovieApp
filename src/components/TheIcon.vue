<template>
  <div class="the-icon">
    <span class="material-symbols-outlined">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.the-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .material-symbols-outlined {
    opacity: 1;
    font-size: 40px;
    color: #787878;
  }
}
</style>
