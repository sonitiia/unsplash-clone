import { Link, useParams } from "react-router-dom";
import { SavePhotoButton } from "../components/SavePhotoButton/SavePhotoButton";
import { usePhoto } from "../hooks/usePhoto";
import { hasUnsplashKey } from "../services/httpClient";
import styles from "./PhotoPage.module.scss";

function formatPublishedDate(dateString: string): string {
  if (!dateString) {
    return "Recently";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();
  const sameYear = date.getFullYear() === now.getFullYear();

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  }).format(date);
}

export function PhotoPage() {
  const { id } = useParams<{ id: string }>();
  const { data: photo, isLoading, isError, error } = usePhoto(id);

  if (!hasUnsplashKey()) {
    return (
      <div className={styles.wrapper}>
        <p>Configure VITE_UNSPLASH_ACCESS_KEY in .env to load photo details.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p className={styles.status}>Loading…</p>;
  }

  if (isError || !photo) {
    return (
      <p className={styles.error} role="alert">
        {(error as Error)?.message ?? "Photo not found"}
      </p>
    );
  }

  const description =
    photo.description ?? photo.alt_description ?? "No description";
  const tags = photo.tags?.map((t) => t.title) ?? [];
  const publishedDate = formatPublishedDate(photo.created_at ?? "");

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
  };

  return (
    <article className={styles.wrapper}>
      <Link to="/?page=1" className={styles.back} aria-label="Back to gallery">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <title>Back to gallery</title>
          <path
            d="M15 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back to gallery</span>
      </Link>
      <div className={styles.layout}>
        <div className={styles.media}>
          <div className={styles.authorBlock}>
            <img
              src={photo.user.profile_image.medium}
              alt=""
              className={styles.avatar}
              width={48}
              height={48}
            />
            <div className={styles.authorMeta}>
              <a
                href={photo.user.links.html}
                target="_blank"
                rel="noreferrer"
                className={styles.authorName}
              >
                {photo.user.name}
              </a>
              <span className={styles.username}>@{photo.user.username}</span>
            </div>
            <SavePhotoButton photo={photo} variant="inline" />
            <a
              href={photo.user.links.html}
              target="_blank"
              rel="noreferrer"
              className={styles.profileButton}
              aria-label="View photographer profile"
              title="View photographer profile"
            >
              <span className={styles.visuallyHidden}>
                View photographer profile
              </span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <title>View photographer profile</title>
                <path
                  d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm11 8v-1a4 4 0 0 0-3-3.87M17.5 4.5a3 3 0 0 1 0 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={photo.links.html}
              target="_blank"
              rel="noreferrer"
              className={styles.unsplashButton}
              aria-label="View on Unsplash"
              title="View on Unsplash"
            >
              <span className={styles.visuallyHidden}>View on Unsplash</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <title>View on Unsplash</title>
                <path
                  d="M7 8.5V7.2A2.2 2.2 0 0 1 9.2 5h5.6A2.2 2.2 0 0 1 17 7.2v1.3M9 14h6M7 17h10a2 2 0 0 0 2-2V9.7A2 2 0 0 0 17 7.7H7A2 2 0 0 0 5 9.7V15a2 2 0 0 0 2 2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button
              type="button"
              className={styles.copyLinkButton}
              onClick={handleCopyLink}
              aria-label="Copy photo link"
              title="Copy photo link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <title>Copy photo link</title>
                <path
                  d="M10 14.5 14.5 10M9.5 5.5h7A2.5 2.5 0 0 1 19 8v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 7 15V8a2.5 2.5 0 0 1 2.5-2.5Zm-5 5A2.5 2.5 0 0 1 7 8v7a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 1 15V8a2.5 2.5 0 0 1 2.5-2.5h1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <img
            src={photo.urls.regular}
            alt={photo.alt_description ?? description}
            className={styles.image}
          />
          <div className={styles.metaBelowImage}>
            <div>
              <span>Dimensions</span>
              <strong>
                {photo.width} × {photo.height}
              </strong>
            </div>
            {photo.created_at ? (
              <div>
                <span>Published</span>
                <strong>{publishedDate}</strong>
              </div>
            ) : null}
          </div>
        </div>
        <aside className={styles.sidebar}>
          <p className={styles.description}>{description}</p>
          {tags.length > 0 ? (
            <div className={styles.tags}>
              <ul className={styles.tagList}>
                {tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      to={`/tags/${encodeURIComponent(tag)}?page=1`}
                      className={styles.tag}
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
