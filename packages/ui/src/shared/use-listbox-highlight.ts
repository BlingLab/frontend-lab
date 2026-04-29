import { useCallback, useEffect, useMemo, useState } from "react";

export interface ListboxHighlightItem {
  disabled?: boolean;
}

export interface UseListboxHighlightOptions<Item extends ListboxHighlightItem> {
  items: Item[];
  idBase: string;
  resetOnItemsChange?: boolean;
}

export function useListboxHighlight<Item extends ListboxHighlightItem>({
  items,
  idBase,
  resetOnItemsChange = true
}: UseListboxHighlightOptions<Item>) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const firstEnabledIndex = useMemo(() => items.findIndex((item) => !item.disabled), [items]);
  const highlightedItem = highlightedIndex >= 0 ? items[highlightedIndex] : undefined;
  const highlightedItemId = highlightedItem ? `${idBase}-${highlightedIndex}` : undefined;

  useEffect(() => {
    if (resetOnItemsChange) setHighlightedIndex(firstEnabledIndex);
  }, [firstEnabledIndex, resetOnItemsChange]);

  const resetHighlight = useCallback(() => setHighlightedIndex(-1), []);
  const highlightFirst = useCallback(() => setHighlightedIndex(firstEnabledIndex), [firstEnabledIndex]);
  const getItemId = useCallback((index: number) => `${idBase}-${index}`, [idBase]);

  const moveHighlight = useCallback((offset: number) => {
    if (items.length === 0) return;

    let nextIndex = highlightedIndex;
    for (let attempt = 0; attempt < items.length; attempt += 1) {
      nextIndex = (nextIndex + offset + items.length) % items.length;
      if (!items[nextIndex]?.disabled) {
        setHighlightedIndex(nextIndex);
        return;
      }
    }
  }, [highlightedIndex, items]);

  return {
    highlightedIndex,
    highlightedItem,
    highlightedItemId,
    setHighlightedIndex,
    resetHighlight,
    highlightFirst,
    moveHighlight,
    getItemId
  };
}
