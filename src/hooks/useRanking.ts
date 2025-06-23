import { useMutation } from "@tanstack/react-query";
import { RankingService } from "../services/ranking.service";
import type {
  SubmitPayload,
  GetRankingPayload,
} from "../services/ranking.service";
import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";

export const useSubmit = () => {
  return useMutation<AxiosResponse<any>, AxiosError, SubmitPayload>({
    mutationFn: (payload) => RankingService.submit(payload),
    onSuccess: (response) => {
      toast.success("Submit Success");
      console.log("Submit response:", response.data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Submit failed");
    },
  });
};

export const useRanking = () => {
  return useMutation<AxiosResponse<any>, AxiosError, GetRankingPayload>({
    mutationFn: (payload) => RankingService.getRanking(payload),
    onSuccess: () => {
      //   toast.success("Get ranking Success");
      // const token = response.data.token;
      // localStorage.setItem("token", token);
    },
    onError: (error: any) => {
      //   toast.error(
      //     error?.response?.data?.message || "Fail to fetch ranking data"
      //   );\
      console.log(error);
    },
  });
};
