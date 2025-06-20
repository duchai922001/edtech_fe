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

export const useGetMocktestLanguage = (params: {
  page?: number;
  limit?: number;
  languageId?: string;
}) => {
  return useQuery({
    queryKey: ["get-mocktest-by-language", params],
    queryFn: () => MocktestService.getMockTests(params),
    select: (res) => res.data,
    staleTime: 5000,
  });
};

export const useGetMockTestById = (id: string) => {
  return useQuery({
    queryKey: ["get-mocktest-by-id", id],
    queryFn: () => MocktestService.getMockTestById(id),
    select: (res) => res.data,
    enabled: !!id, // chỉ gọi khi id tồn tại
    staleTime: 10000,
  });
};
