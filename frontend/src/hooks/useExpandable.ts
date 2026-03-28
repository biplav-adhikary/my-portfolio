import { useState, useCallback } from "react";

/**
 * Manages single-open accordion state.
 * Only one item can be expanded at a time — opening a new one collapses the previous.
 */
export function useExpandable(initialId: string | null = null) {
  const [expandedId, setExpandedId] = useState<string | null>(initialId);

  const toggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const isExpanded = useCallback(
    (id: string) => expandedId === id,
    [expandedId]
  );

  return { expandedId, toggle, isExpanded };
}
