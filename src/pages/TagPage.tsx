import { useParams, useSearchParams } from "react-router-dom";
import { FeedView } from "../components/FeedView/FeedView";

export function TagPage() {
  const { tagName = "" } = useParams<{ tagName: string }>();
  const tag = decodeURIComponent(tagName);
  const [searchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  return (
    <FeedView
      mode="tag"
      page={page}
      query={tag}
      title={tag ? `# ${tag}` : "Tag"}
      subtitle=""
      paginationBasePath={`/tags/${encodeURIComponent(tag)}`}
    />
  );
}
