import { useQuery } from "@tanstack/react-query";
import { LanguageService } from "../services/language.service";

export const useGetLanguages = () => {
  return useQuery({
    queryKey: ["get-languages"],
    queryFn: () => LanguageService.getLanguages(),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
