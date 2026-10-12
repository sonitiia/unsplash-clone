import type { SearchPhotosResponse, UnsplashPhoto } from "../types/unsplash";
import { BaseService } from "./baseService";
import { httpClient } from "./httpClient";

export const PHOTOS_PER_PAGE = 20;

class PhotoService extends BaseService {
  async getPhotos(page: number): Promise<UnsplashPhoto[]> {
    const { data } = await httpClient.get<UnsplashPhoto[]>("/photos", {
      params: { page, per_page: PHOTOS_PER_PAGE },
    });

    return data;
  }

  async getPhotoById(id: string): Promise<UnsplashPhoto> {
    const { data } = await httpClient.get<UnsplashPhoto>(`/photos/${id}`);
    return data;
  }

  async searchPhotos(
    query: string,
    page: number,
  ): Promise<SearchPhotosResponse> {
    const { data } = await httpClient.get<SearchPhotosResponse>(
      "/search/photos",
      {
        params: { query, page, per_page: PHOTOS_PER_PAGE },
      },
    );

    return data;
  }
}

export const photoService = new PhotoService();

export const fetchPhotos = photoService.getPhotos.bind(photoService);
export const fetchPhotoById = photoService.getPhotoById.bind(photoService);
export const searchPhotos = photoService.searchPhotos.bind(photoService);
