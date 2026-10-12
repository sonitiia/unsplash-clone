import { useQuery } from "@tanstack/react-query";
import { fetchPhotoById } from "../services/photoService";

export function usePhoto(id: string | undefined) {
  return useQuery({
    queryKey: ["photo", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Photo id is required");
      }

      return fetchPhotoById(id);
    },
    enabled: Boolean(id),
  });
}
