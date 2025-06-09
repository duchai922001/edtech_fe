import { useQuery } from "@tanstack/react-query";
import { MocktestService } from "../services/mock.service";

export const useGetMocktests = () => {
  return useQuery({
    queryKey: ["get-mocktests"],
    queryFn: () => MocktestService.getAllMocktests(),
    select: (res) => res.data,
    staleTime: 5000,
  });
};

export const useGetMocktestByTitle = (title: string) => {
  return useQuery({
    queryKey: ["get-mocktest-by-title", title],
    queryFn: () => MocktestService.getMocktestByTitle(title),
    select: (res) => res.data,
    staleTime: 5000,
  });
};

export const useGetMocktestLanguage = (languageId: string) => {
  return useQuery({
    queryKey: ["get-mocktest-by-language", languageId],
    queryFn: () => MocktestService.getMocktestLanguage(languageId),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
