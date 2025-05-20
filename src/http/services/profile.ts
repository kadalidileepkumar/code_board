import { fetcher } from "~/utils/helpers/fetch";

export const getProfileAPI = async (id: string) => {
  return fetcher<{
    status: number;
    success: boolean;
    message: string;
  }>(`/users/${id}`);
};