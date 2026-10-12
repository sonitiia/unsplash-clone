import { useSearchParams } from "react-router-dom";
import { FeedView } from "../components/FeedView/FeedView";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  return (
    <FeedView
      mode="search"
      page={page}
      query={query}
      title={query ? `“${query}”` : "Search"}
      subtitle="Search results"
      paginationBasePath="/search"
      paginationParams={query ? { q: query } : undefined}
    />
  );
}
