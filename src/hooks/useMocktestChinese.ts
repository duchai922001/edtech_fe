import { useQuery } from "@tanstack/react-query";
import { MocktestChineseService } from "../services/mocktestChinese.service";

export const useGetMocktestsChinese = () => {
  return useQuery({
    queryKey: ["get-mocktests-chinese"],
    queryFn: () => MocktestChineseService.getMocktests(),
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
