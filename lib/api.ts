import axios from "axios";

const baseURL = 'http://localhost:12345/'

export const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'X-Custom-Header': 'foobar',
      'Content-Type': 'application/json',
    }
  });