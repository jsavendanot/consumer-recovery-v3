import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://recoveryplanwebapitest.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ContactType: '935000000'
  }
});

export default instance;
