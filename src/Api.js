import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App.js"

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

class Api {
  static async request(endpoint, params = {}, verb = "get") {

    let _token = localStorage.getItem(TOKEN_STORAGE_ID);

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { headers : { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getGames(username) {
    let res = await this.request(`users/${username}/games`);
    return res.games;
  }

  static async saveGame(data) {
    let res = await this.request(`games/`, data, "post");
    return res.token;
  }

  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default Api;
