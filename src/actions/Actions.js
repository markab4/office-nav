import axios from 'axios';
import {findAreaCenter, fetchJSONnoArray,fetchJSON, retrieveAllPeople, retrieveAllRooms, findPerson, findRoom, fetchObject} from "../api/staff_api_functions";

//replace this with api url to contentful and adjust for api key + tokens
const API_URL = 'https://api.myjson.com/bins/13zute';
const API_KEY = 'INSERT API KEY HERE FOR CONTENTFUL';

export const FETCH_JSON = 'FETCH_JSON';

export function fetchJsonAxios(){
  const url = API_URL;
  const request = axios.get(url);

  return {
    type: FETCH_JSON,
    payload: request
  };
}

