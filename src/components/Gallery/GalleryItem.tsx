import { Link } from "react-router-dom";
import type { UnsplashPhoto } from "../../types/unsplash";
import { SavePhotoButton } from "../SavePhotoButton/SavePhotoButton";
import styles from "./Gallery.module.scss";

interface GalleryItemProps {
  photo: UnsplashPhoto;
}

export function GalleryItem({ photo }: GalleryItemProps) {
  const alt = photo.alt_description ?? photo.description ?? "Unsplash photo";

  return (
    <Link to={`/photos/${photo.id}`} className={styles.item}>
      <SavePhotoButton
        photo={photo}
        variant="overlay"
        className={styles.saveButton}
      />
      <img
        src={photo.urls.small}
        alt={alt}
        loading="lazy"
        width={photo.width}
        height={photo.height}
        className={styles.image}
      />
      <div className={styles.overlay}>
        <span className={styles.author}>{photo.user.name}</span>
        <span className={styles.likes}>{photo.likes} likes</span>
      </div>
    </Link>
  );
}
