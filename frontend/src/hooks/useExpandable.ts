import { useState, useCallback } from "react";

/**
 * Manages multi-open accordion state.
 * Multiple items can be expanded simultaneously.
 */
export function useExpandable() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback(
    (id: string) => expandedIds.has(id),
    [expandedIds]
  );

  return { toggle, isExpanded };
}
