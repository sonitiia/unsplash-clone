import type { UnsplashPhoto } from "../types/unsplash";

function collectionKey(userId: string) {
  return `unsplash_gallery_collection_${userId}`;
}

export function readCollection(userId: string): UnsplashPhoto[] {
  try {
    const raw = localStorage.getItem(collectionKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UnsplashPhoto[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCollection(userId: string, photos: UnsplashPhoto[]) {
  localStorage.setItem(collectionKey(userId), JSON.stringify(photos));
}

export function addToCollection(
  userId: string,
  photo: UnsplashPhoto,
): UnsplashPhoto[] {
  const current = readCollection(userId);
  if (current.some((p) => p.id === photo.id)) {
    return current;
  }
  const next = [photo, ...current];
  writeCollection(userId, next);
  return next;
}

export function removeFromCollection(
  userId: string,
  photoId: string,
): UnsplashPhoto[] {
  const next = readCollection(userId).filter((p) => p.id !== photoId);
  writeCollection(userId, next);
  return next;
}
