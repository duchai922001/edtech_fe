import { useQuery } from "@tanstack/react-query";
import { MocktestChineseService } from "../services/mocktestChinese.service";

export const useGetMocktestsChinese = (params: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-mocktests-chinese", params],
    queryFn: () => MocktestChineseService.getMocktests(params),
    select: (res) => res.data,
    staleTime: 5000,
  });
};

export const useGetMocktestsChineseDetail = (id: string) => {
  return useQuery({
    queryKey: ["get-mocktests-chinese-detail", id],
    queryFn: () => MocktestChineseService.getMocktestsById(id),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
