import axios from 'axios'
import { getLocalStorage } from '../utils/localStorageExpires';

const hashRequest = getLocalStorage('@info-plantas:auth-1.0.0');
export const Api = axios.create({
  baseURL: 'https://pi6.fortmea.tech',
  headers: {
    Authorization : `${hashRequest}`
  },
})
  