import axios from 'axios'

function getUserAccount() {
    return axios.get('/user/12345');
  }
  getUserAccount()