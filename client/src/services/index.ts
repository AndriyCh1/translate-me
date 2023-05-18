import axios from "axios";
import { ENV } from "../common/enums";

export const api = axios.create({ baseURL: ENV.API_PATH });
