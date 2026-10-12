import type { UnsplashPhoto } from "../types/unsplash";

export function distributePhotosToColumns(
  photos: UnsplashPhoto[],
  columnCount: number,
): UnsplashPhoto[][] {
  if (columnCount < 1 || photos.length === 0) {
    return photos.length ? [photos] : [];
  }

  const columns: UnsplashPhoto[][] = Array.from(
    { length: columnCount },
    () => [],
  );
  const heights = Array<number>(columnCount).fill(0);

  for (const photo of photos) {
    const aspectHeight = photo.width > 0 ? photo.height / photo.width : 1;

    let shortestIndex = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortestIndex]) {
        shortestIndex = i;
      }
    }

    columns[shortestIndex].push(photo);
    heights[shortestIndex] += aspectHeight;
  }

  return columns;
}
