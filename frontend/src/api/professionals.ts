import { get } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;


export const getProfessionals = async () => {
  const data = await get({
    url: `${baseURL}/professionals`
  });
  return data;
};
