import { useSearchParams } from "react-router-dom";
import styles from "../components/FeedView/FeedView.module.scss";
import { MasonryGallery } from "../components/Gallery/MasonryGallery";
import { GalleryToolbar } from "../components/GalleryToolbar/GalleryToolbar";
import { Pagination } from "../components/Pagination/Pagination";
import { PHOTOS_PER_PAGE } from "../services/photoService";
import { useAppSelector } from "../store/hooks";

export function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const photos = useAppSelector((s) => s.collection.photos);
  const [searchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const totalPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PHOTOS_PER_PAGE;
  const pagePhotos = photos.slice(start, start + PHOTOS_PER_PAGE);
  const hasNextPage = safePage < totalPages;

  return (
    <>
      <GalleryToolbar
        title={
          user
            ? `${`${user.firstName} ${user.lastName}`.trim()}'s collection`
            : "Collection"
        }
        subtitle={`${photos.length} saved photo${photos.length === 1 ? "" : "s"}`}
      />
      {photos.length === 0 ? (
        <p className={styles.status}>
          No saved photos yet. Use <strong>Save</strong> on any image in the
          gallery.
        </p>
      ) : (
        <>
          <MasonryGallery photos={pagePhotos} />
          <Pagination
            page={safePage}
            hasNextPage={hasNextPage}
            basePath="/profile"
          />
        </>
      )}
    </>
  );
}
