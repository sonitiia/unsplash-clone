import { useSearchParams } from "react-router-dom";
import { FeedView } from "../components/FeedView/FeedView";

export function HomePage() {
  const [searchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  return (
    <FeedView
      mode="list"
      page={page}
      query=""
      title=""
      subtitle=""
      paginationBasePath="/"
    />
  );
}
