'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (e: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={6}
      marginPagesDisplayed={0}
      onPageChange={onPageChange}
      breakLabel={null}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      activeClassName={css.active}
      previousClassName={css.arrow}
      nextClassName={css.arrow}
      disabledClassName={css.disabled}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
