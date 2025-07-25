import axiosInstance from "./main.service";
import type { AxiosResponse } from "axios";

export interface SubmitPayload {
  refId: string;
  type: string;
  languageId: string;
  score: string;
  duration: number;
}

export interface GetRankingPayload {
  type: string;
  refId: string;
  languageId: string;
}

export const RankingService = {
  submit: async (payload: SubmitPayload): Promise<AxiosResponse<any>> => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(`/mocktest-ranking`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  getRanking: async (
    payload: GetRankingPayload
  ): Promise<AxiosResponse<any>> => {
    const response = await axiosInstance.get(
      `/mocktest-ranking/ranking/${payload.type}/${payload.refId}/${payload.languageId}`
    );
    return response;
  },
};
