import { useEffect, useState } from "react";
import type { ColumnCount } from "../store/gallerySlice";

function columnsForViewport(width: number, preferred: ColumnCount): number {
  if (width < 768) return 1;
  if (width < 1024) return Math.min(2, preferred);
  if (width < 1440) return Math.min(3, preferred);
  return preferred;
}

export function useEffectiveColumns(preferred: ColumnCount): number {
  const [count, setCount] = useState(() =>
    columnsForViewport(window.innerWidth, preferred),
  );

  useEffect(() => {
    const onResize = () => {
      setCount(columnsForViewport(window.innerWidth, preferred));
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [preferred]);

  return count;
}
