export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  profile_image: {
    small: string;
    medium: string;
  };
  links: {
    html: string;
  };
}

export interface UnsplashPhotoLinks {
  html: string;
  download: string;
}

export interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
  color: string | null;
  description: string | null;
  alt_description: string | null;
  likes: number;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: UnsplashPhotoLinks;
  user: UnsplashUser;
  tags?: Array<{ type: string; title: string }>;
  created_at?: string;
}

export interface SearchPhotosResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export type GalleryFeedMode = "list" | "search" | "tag";

export interface GalleryFeedParams {
  mode: GalleryFeedMode;
  page: number;
  query?: string;
  tag?: string;
}
