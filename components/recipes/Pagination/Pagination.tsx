'use client';

import ReactPaginate from 'react-paginate';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
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
      breakLabel={null}
      breakClassName=""
      onPageChange={onPageChange}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      activeClassName={css.active}
      previousClassName={css.arrow}
      nextClassName={css.arrow}
      disabledClassName={css.disabled}
      previousLabel={<SvgIcon name="pagination_left" />}
      nextLabel={<SvgIcon name="pagination_right" />}
    />
  );
}
