<script setup lang="ts">
import SearchBar from '~/components/SearchBar.vue';
import MovieCard from '~/components/MovieCard.vue';
import { useMoiveStore } from '~/store/movies';
import { ref, watch, onMounted } from 'vue';

const movieStore = useMoiveStore();
const $section = ref(null);
const $target = ref(null);
// const movieStore.pageCount(1);
const observer = ref<IntersectionObserver>();
let $lastLi: HTMLElement;

watch(
  () => movieStore.movieData,
  async () => {
    setTimeout(() => {
      $target.value = $section.value.querySelector('.card:last-child');

      if ($target.value !== null) {
        if ($lastLi !== null) observer.value?.unobserve($target.value);
        $lastLi = $target.value;
        observer.value?.observe($lastLi);
      }
    }, 0);
  }
);

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        if (
          entry.isIntersecting &&
          !movieStore.isLoading &&
          movieStore.movieData.length < movieStore.totalResults
        ) {
          console.log(entry);
          movieStore.searchMovies({
            title: movieStore.userInputTitle
          });
        }
      },
      {
        root: $section.value,
        threshold: 0.5
      }
    );
  });
});
</script>

<template>
  <main>
    <SearchBar />
    <section
      ref="$section"
      class="showmovie">
      <MovieCard
        v-for="movie in movieStore.movieData"
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
