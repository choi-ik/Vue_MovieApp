import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  const { title = '', page = 1, method, data } = req.body;

  /* 요청 주소에 들어가야 할 요청 
  영화 목록 검색
    apikey 필수
    s(영화 제목) 필수
    page(페이지) 기본값 1
    y(영화 출시 년도) 기본값 X 

  영화 상세 검색
    i(검색할 영화 아이디) 필수
    plot(영화 줄거리 길이) 기본값 short
  */
  axios({
    url: `https://omdbapi.com?apikey=${title}`,
    method: '',
    headers: {},
    data: {}
  });
}
