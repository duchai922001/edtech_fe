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

export const useGetResources = (params: {
  page?: number;
  limit?: number;
  languageId?: string;
}) => {
  return useQuery({
    queryKey: ["get-resources", params],
    queryFn: () => ResourceService.getResources(params),
    select: (res) => res.data,
    staleTime: 5000,
  });
};
