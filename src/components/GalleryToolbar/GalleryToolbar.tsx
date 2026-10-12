import { useEffect, useState } from "react";
import { type ColumnCount, setColumnCount } from "../../store/gallerySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./GalleryToolbar.module.scss";

interface GalleryToolbarProps {
  title?: string;
  subtitle?: string;
}

function getAllowedColumns(width: number): ColumnCount[] {
  if (width >= 1440) return [5, 3];
  return [];
}

export function GalleryToolbar({ title, subtitle }: GalleryToolbarProps) {
  const dispatch = useAppDispatch();
  const columnCount = useAppSelector((s) => s.gallery.columnCount);
  const [viewportWidth, setViewportWidth] = useState<number>(
    () => window.innerWidth,
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const allowed = getAllowedColumns(viewportWidth);
    if (!allowed.includes(columnCount)) {
      dispatch(setColumnCount(allowed[0] ?? 3));
    }
  }, [columnCount, dispatch, viewportWidth]);

  const allowedColumns = getAllowedColumns(viewportWidth);

  const setColumns = (count: ColumnCount) => {
    dispatch(setColumnCount(count));
  };

  if (allowedColumns.length === 0) {
    return (
      <div className={styles.toolbar}>
        <div className={styles.titles}>
          {title ? <h1 className={styles.title}>{title}</h1> : null}
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.titles}>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      <div className={styles.actions}>
        <span className={styles.label}>Columns</span>
        <fieldset className={styles.toggleGroup} aria-label="Column count">
          {allowedColumns.includes(5) ? (
            <button
              type="button"
              className={
                columnCount === 5
                  ? `${styles.toggleBtn} ${styles.toggleBtnActive}`
                  : styles.toggleBtn
              }
              onClick={() => setColumns(5)}
              aria-pressed={columnCount === 5}
            >
              5
            </button>
          ) : null}
          {allowedColumns.includes(3) ? (
            <button
              type="button"
              className={
                columnCount === 3
                  ? `${styles.toggleBtn} ${styles.toggleBtnActive}`
                  : styles.toggleBtn
              }
              onClick={() => setColumns(3)}
              aria-pressed={columnCount === 3}
            >
              3
            </button>
          ) : null}
        </fieldset>
      </div>
    </div>
  );
}
