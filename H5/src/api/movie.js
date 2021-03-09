import request from '@/utils/request'

export const movieApi = {
  getMovie(params) {
    return request({
      url: '/web-api/movie',
      method: 'get',
      params
    })
  }
}

export const movieClassApi = {
  getMovieClass(params) {
    return request({
      url: '/web-api/movieClass',
      method: 'get',
      params
    })
  }
}

export const movieEpisodesApi = {
  getMovieEpisodes(params) {
    return request({
      url: '/web-api/movieEpisodes',
      method: 'get',
      params
    })
  }
}
