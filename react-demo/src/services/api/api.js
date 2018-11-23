import axios from 'axios'

const axioPost =axios.create({
    baseURL: `${process.env.API_CLIENTE}`,
    method: 'post',
});

const postData = (api_url, data, config) => {
    return new Promise((resolve, reject) =>{   
        axioPost(api_url, {data: data}, config)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
              reject(error);
          }) 
      });
}

const axioGet =axios.create({
    baseURL: `${process.env.API_CLIENTE}`,
    method: 'get'
});

const getData = (api_url, config) => {
    return new Promise((resolve, reject) =>{   
        axioGet(api_url)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
              reject(error);
          }) 
      });
}

export { postData, getData }