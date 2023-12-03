<script setup lang="ts">
import TheIcon from '~/components/TheIcon.vue';
import TheLoading from '~/components/TheLoading.vue';
import { useMoiveStore } from '~/store/movies';
import { ref } from 'vue';

const movieTitle = ref('');
const movieStore = useMoiveStore();

// 영화 제목 검색 함수
const searchMovie = async (event: MouseEvent | KeyboardEvent) => {
  if (event instanceof KeyboardEvent && event.isComposing) return;
  if (!movieTitle.value.trim())
    // 타이틀에 값이 아예 없다면 얼리 리턴
    return;

  await movieStore.searchMovies({ title: movieTitle.value });

  movieTitle.value = '';
};
</script>

<template>
  <section>
    <TheLoading v-if="movieStore.isLoading" />
    <TheIcon v-else>search</TheIcon>
    <input
      :value="movieTitle"
      placeholder="영화 제목을 입력하세요."
      @input="movieTitle = ($event.target as HTMLInputElement).value"
      @keydown.enter="searchMovie" />
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 55%;
  height: 60px;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  :deep(.the-loader) {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 15px;
    z-index: 1;
  }
  :deep(.the-icon) {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 10px;
    z-index: 1;
  }
  input {
    padding: 0 10px 0 70px;
    border: none;
    outline: none;
    background-color: #fff;
    border-radius: 40px;
    position: absolute;
    font-size: 25px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
