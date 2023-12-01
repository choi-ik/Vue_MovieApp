import axios from 'axios';
import { defineStore } from 'pinia';

interface searchMoviePayload {
  title: string;
  page?: string;
  year?: string;
}

export const useMoiveStore = defineStore('movies', {
  state: () => ({
    movieData: [] // 영화 데이터
  }),
  getters: {},
  actions: {
    // 영화 제목 검색
    async searchMovies({ title, page = '', year = '' }: searchMoviePayload) {
      const { data } = await axios.post('/api/movieSearch', {
        title,
        page,
        year
      });

      this.movieData = data;
      console.log(this.movieData);
    }
  }
});
