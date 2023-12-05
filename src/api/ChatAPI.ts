import axios from "axios";
import { MessageType } from "../types/Message";
import { BASE_URL, HEADERS } from ".";

export default {
  sendQuestion: async (params: { question: string }) => {
    const res = await axios.post<MessageType>(`${BASE_URL}/chat`, JSON.stringify(params), HEADERS);
    return res.data;
  },
};
