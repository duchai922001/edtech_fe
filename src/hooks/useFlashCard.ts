import { useMutation, useQuery } from "@tanstack/react-query";
import { FlashCardService } from "../services/flashCard.service";
import toast from "react-hot-toast";

export const useGetFlashCards = (params: {
  languageId?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-flashcard", params],
    queryFn: () => FlashCardService.getFlashCards(params),
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

export const useGetMyFlashcards = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["get-my-flashcard", userId],
    queryFn: () => FlashCardService.getFlashcardByUser(userId),
    select: (res) => res.data,
    staleTime: 5000,
  });
};

export const useCreateFlashCards = () => {
  return useMutation({
    mutationFn: (payload: any) => FlashCardService.createFlashCards(payload),
    onSuccess: () => {
      toast.success("Create Success");
    },
  });
};

export const useFavoriteFlashcard = () => {
  return useMutation({
    mutationFn: ({
      flashcardId,
      token,
    }: {
      flashcardId: string;
      token: string;
    }) => FlashCardService.favoriteFlashcard(flashcardId, token),
    onSuccess: () => {
      toast.success("Added to favourites!");
    },
    onError: () => {
      toast.error("Failed to add to favourites.");
    },
  });
};
