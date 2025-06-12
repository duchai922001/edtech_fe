import { useMutation, useQuery } from "@tanstack/react-query";
import { ResourceService } from "../services/resource.service";
import toast from "react-hot-toast";

export const useCreateResouce = () => {
  return useMutation({
    mutationFn: (payload: any) => ResourceService.createResource(payload),
    onSuccess: () => {
      toast.success("Create Success");
    },
  });
};

export const useGetResources = (languageId?: string) => {
  return useQuery({
    queryKey: ["get-resources", languageId],
    queryFn: () => ResourceService.getResources(languageId),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
