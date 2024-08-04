import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

export const createScores = async () => {
  const data = await post({
    url: `${baseURL}/score`,
  });

  return data;
};
