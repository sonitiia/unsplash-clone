import { hasUnsplashKey } from "../../api/client";
import { useGalleryFeed } from "../../hooks/useGalleryFeed";
import { MasonryGallery } from "../Gallery/MasonryGallery";
import { GalleryToolbar } from "../GalleryToolbar/GalleryToolbar";
import { Pagination } from "../Pagination/Pagination";
import styles from "./FeedView.module.scss";

interface FeedViewProps {
  mode: "list" | "search" | "tag";
  page: number;
  query: string;
  title?: string;
  subtitle?: string;
  paginationBasePath: string;
  paginationParams?: Record<string, string>;
}

export function FeedView({
  mode,
  page,
  query,
  title,
  subtitle,
  paginationBasePath,
  paginationParams,
}: FeedViewProps) {
  const { data, isLoading, isError, error, isFetching } = useGalleryFeed(
    mode,
    page,
    query,
  );

  if (!hasUnsplashKey()) {
    return (
      <div className={styles.message}>
        <p>
          Add your Unsplash Access Key to <code>.env</code> as{" "}
          <code>VITE_UNSPLASH_ACCESS_KEY</code> (see <code>.env.example</code>
          ).
        </p>
      </div>
    );
  }

  return (
    <>
      <GalleryToolbar title={title} subtitle={subtitle} />
      {isLoading && !data ? (
        <p className={styles.status}>Loading photos…</p>
      ) : isError ? (
        <p className={styles.error} role="alert">
          {(error as Error)?.message ?? "Failed to load photos"}
        </p>
      ) : data && data.photos.length === 0 ? (
        <p className={styles.status}>No photos found.</p>
      ) : data ? (
        <>
          {isFetching ? (
            <p className={styles.fetching} aria-live="polite">
              Updating…
            </p>
          ) : null}
          <MasonryGallery photos={data.photos} />
          <Pagination
            page={page}
            hasNextPage={data.hasNextPage}
            basePath={paginationBasePath}
            searchParams={paginationParams}
          />
        </>
      ) : null}
    </>
  );
}
