import { useQuery } from "@tanstack/react-query";
import {
  fetchPhotos,
  PHOTOS_PER_PAGE,
  searchPhotos,
} from "../services/photoService";
import type { UnsplashPhoto } from "../types/unsplash";

export interface GalleryFeedResult {
  photos: UnsplashPhoto[];
  totalPages: number | null;
  hasNextPage: boolean;
}

async function loadFeed(
  mode: "list" | "search" | "tag",
  page: number,
  query: string,
): Promise<GalleryFeedResult> {
  if (mode === "list") {
    const photos = await fetchPhotos(page);
    return {
      photos,
      totalPages: null,
      hasNextPage: photos.length === PHOTOS_PER_PAGE,
    };
  }

  const searchTerm = mode === "tag" ? query : query.trim();
  const data = await searchPhotos(searchTerm, page);
  return {
    photos: data.results,
    totalPages: data.total_pages,
    hasNextPage: page < data.total_pages,
  };
}

export function useGalleryFeed(
  mode: "list" | "search" | "tag",
  page: number,
  query: string,
) {
  return useQuery({
    queryKey: ["gallery-feed", mode, page, query],
    queryFn: () => loadFeed(mode, page, query),
    placeholderData: (prev) => prev,
  });
}
