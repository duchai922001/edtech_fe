import { useQuery } from "@tanstack/react-query";
import { FlashCardService } from "../services/flashCard.service";

export const useGetFlashCards = () => {
  return useQuery({
    queryKey: ["get-flashcard"],
    queryFn: () => FlashCardService.getFlashCards(),
    select: (res) => res.data,
    staleTime: 5000,
  });
};

export const useGetFlashCardsSubject = (title: string) => {
  return useQuery({
    queryKey: ["get-flashcard-subject", title],
    queryFn: () => FlashCardService.getFlashCardByTitle(title),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
