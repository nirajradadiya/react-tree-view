import axios from 'axios'

/*
  This common function used for all get server calls with in projects.
*/
export const get = (url) => {
  return axios({
    method: 'GET',
    url: url,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => response.data);
}

// add post, put, delete method base on requirement