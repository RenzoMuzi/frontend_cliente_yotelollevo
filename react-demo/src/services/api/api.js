import axios from 'axios'
import React from 'react'

const axioPost =axios.create({
    baseURL: `${process.env.API_URL}`,
    method: 'post',
});

const postData = (type, userData) => {
    return new Promise((resolve, reject) =>{   
        axioPost(type, {data: userData})
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
              reject(error);
          }) 
      });
}

export default postData 