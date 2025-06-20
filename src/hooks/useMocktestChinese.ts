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

export const useGetMocktestsChineseDetail = (title: string) => {
  return useQuery({
    queryKey: ["get-mocktests-chinese-detail", title],
    queryFn: () => MocktestChineseService.getMocktestsByTitle(title),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
