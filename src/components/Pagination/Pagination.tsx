import { Link } from "react-router-dom";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  hasNextPage: boolean;
  basePath: string;
  searchParams?: Record<string, string>;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>,
): string {
  const params = new URLSearchParams({ ...searchParams, page: String(page) });
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({
  page,
  hasNextPage,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const prevDisabled = page <= 1;
  const nextDisabled = !hasNextPage;

  return (
    <nav className={styles.pagination} aria-label="Gallery pagination">
      {prevDisabled ? (
        <span className={`${styles.btn} ${styles.btnDisabled}`}>Previous</span>
      ) : (
        <Link
          to={buildHref(basePath, page - 1, searchParams)}
          className={styles.btn}
        >
          Previous
        </Link>
      )}
      <span className={styles.current}>Page {page}</span>
      {nextDisabled ? (
        <span className={`${styles.btn} ${styles.btnDisabled}`}>Next</span>
      ) : (
        <Link
          to={buildHref(basePath, page + 1, searchParams)}
          className={styles.btn}
        >
          Next
        </Link>
      )}
    </nav>
  );
}
