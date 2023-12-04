import axios from 'axios';
import { defineStore } from 'pinia';

interface SearchMoviePayload {
  title: string;
  page?: string;
  year?: string;
}

interface DetailSearchMovie {
  movieId: string;
  plot?: string;
}

export const useMoiveStore = defineStore('movies', {
  state: () => ({
    movieData: [] as { [key: string]: string }[], // 영화 데이터
    totalResults: 0, // 해당 제목 총 영화 개수
    detailMovieData: {}, // 영화 상세 데이터
    isLoading: false,
    userInputTitle: '', // 사용자가 입력한 영화 제목
    pageCount: 0 // 현재 페이지 수
  }),
  getters: {},
  actions: {
    // 영화 제목 검색
    async searchMovies({ title }: SearchMoviePayload) {
      // 로딩중 일때는 API 요청 X
      if (this.isLoading) return;
      // 영화 제목이 다를 시 페이지 카운팅 초기화
      if (this.userInputTitle !== title) {
        this.movieData = [];
        this.pageCount = 1;
      }

      this.userInputTitle = title;
      this.isLoading = true;
      const { data } = await axios.post('/api/MovieSearch', {
        title,
        page: String(this.pageCount)
      });
      await this.imageOptimization('movie', data.Search);

      this.movieData = [...this.movieData, ...data.Search];
      this.totalResults = data.totalResults;
      this.isLoading = false;
      this.pageCount += 1;
    },
    // 영화 상세 정보 검색
    async detailSearchMovie({ movieId, plot = 'short' }: DetailSearchMovie) {
      // 로딩중 일때는 API 요청 X
      if (this.isLoading) return;

      this.isLoading = true;

      const { data } = await axios.post('/api/detailSearchMovie', {
        movieId,
        plot
      });

      data.Poster = await this.imageOptimization('detail', data.Poster);

      this.detailMovieData = data;
      this.isLoading = false;
    },
    // 이미지 최적화 함수
    imageOptimization(
      keyword: string,
      data: { [key: string]: string }[] | string
    ) {
      if (keyword === 'movie' && typeof data === 'object') {
        for (const key of data) {
          key.Poster = key.Poster.replace(/SX300/, 'SX700');
        }
      } else if (keyword === 'detail' && typeof data === 'string') {
        data = data.replace(/SX300/, 'SX700');

        return data;
      }
    }
  }
});
