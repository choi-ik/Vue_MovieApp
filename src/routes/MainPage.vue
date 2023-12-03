<script setup lang="ts">
import SearchBar from '~/components/SearchBar.vue';
import MovieCard from '~/components/MovieCard.vue';
import { useMoiveStore } from '~/store/movies';
import { ref, watch } from 'vue';

const movieData = ref([]);
const movieStore = useMoiveStore();

watch(movieStore, () => {
  movieData.value = movieStore.movieData.Search;
});
</script>

<template>
  <main>
    <SearchBar />
    <section class="showmovie">
      <MovieCard
        v-for="movie in movieData"
        :key="movie.imdbID"
        :model-value="movie" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
}
.showmovie {
  width: 100%;
  height: calc(100vh - 140px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 50px 150px 30px 150px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>
