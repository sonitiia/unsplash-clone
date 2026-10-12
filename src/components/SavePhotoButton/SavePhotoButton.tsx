import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  removePhoto,
  savePhoto,
  selectIsPhotoSaved,
} from "../../store/collectionSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { UnsplashPhoto } from "../../types/unsplash";
import styles from "./SavePhotoButton.module.scss";

interface SavePhotoButtonProps {
  photo: UnsplashPhoto;
  variant?: "overlay" | "sidebar" | "inline";
  className?: string;
}

export function SavePhotoButton({
  photo,
  variant = "overlay",
  className,
}: SavePhotoButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const saved = useAppSelector(selectIsPhotoSaved(photo.id));

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (saved) {
      dispatch(removePhoto(photo.id));
    } else {
      dispatch(savePhoto(photo));
    }
  };

  const label = saved ? "Remove from collection" : "Save to collection";

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[variant]} ${saved ? styles.saved : ""} ${className ?? ""}`}
      onClick={onClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <title>{saved ? "Remove from collection" : "Save to collection"}</title>
        {saved ? (
          <path
            d="M7 12.5 10.2 15.7 17 8.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M12 5v14M5 12h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
