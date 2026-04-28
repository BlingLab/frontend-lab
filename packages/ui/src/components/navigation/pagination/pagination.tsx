import type { HTMLAttributes } from "react";
import { Button } from "../../actions/button";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page?: number;
  defaultPage?: number;
  totalPages?: number;
  siblingCount?: number;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
}

export function Pagination({ page, defaultPage = 1, totalPages = 1, siblingCount = 1, disabled, onPageChange, className, ...props }: PaginationProps) {
  const [currentPage, setCurrentPage] = useControllableState({
    value: page,
    defaultValue: defaultPage,
    onChange: onPageChange
  });
  const start = Math.max(1, currentPage - siblingCount);
  const end = Math.min(totalPages, currentPage + siblingCount);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const go = (nextPage: number) => {
    const boundedPage = Math.min(totalPages, Math.max(1, nextPage));
    setCurrentPage(boundedPage);
  };

  return (
    <nav className={classNames("ds-Pagination", className)} aria-label="페이지 / Pagination" {...props}>
      <div className="ds-Pagination-list">
        <Button label="이전 / Prev" variant="outline" tone="neutral" size="sm" disabled={disabled || currentPage === 1} onClick={() => go(currentPage - 1)} />
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "solid" : "outline"}
            tone={pageNumber === currentPage ? "brand" : "neutral"}
            size="sm"
            disabled={disabled}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            onClick={() => go(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button label="다음 / Next" variant="outline" tone="neutral" size="sm" disabled={disabled || currentPage === totalPages} onClick={() => go(currentPage + 1)} />
      </div>
    </nav>
  );
}
