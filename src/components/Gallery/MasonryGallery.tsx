import { type CSSProperties, useMemo } from "react";
import { distributePhotosToColumns } from "../../helpers/distributePhotosToColumns";
import { useEffectiveColumns } from "../../hooks/useEffectiveColumns";
import { useAppSelector } from "../../store/hooks";
import type { UnsplashPhoto } from "../../types/unsplash";
import styles from "./Gallery.module.scss";
import { GalleryItem } from "./GalleryItem";

interface MasonryGalleryProps {
  photos: UnsplashPhoto[];
}

export function MasonryGallery({ photos }: MasonryGalleryProps) {
  const preferredColumns = useAppSelector((s) => s.gallery.columnCount);
  const effectiveColumns = useEffectiveColumns(preferredColumns);

  const columns = useMemo(
    () => distributePhotosToColumns(photos, effectiveColumns),
    [photos, effectiveColumns],
  );

  return (
    <div
      className={styles.masonry}
      style={{ "--column-count": effectiveColumns } as CSSProperties}
    >
      {columns.map((columnPhotos) => (
        <div className={styles.column} key={columnPhotos[0]?.id ?? "column"}>
          {columnPhotos.map((photo) => (
            <GalleryItem key={photo.id} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
}
