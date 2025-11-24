'use client';

import Link from 'next/link';
import css from './Pagination.module.css';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

interface NextPaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
}

export default function NextPagination({ page, totalPages, basePath }: NextPaginationProps) {
  const current = Number(page);

  // Функція створення діапазону сторінок
  const getPageNumbers = () => {
    const pages: number[] = [];

    // показуємо максимум 5 сторінок (2 зліва, поточна, 2 справа)
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={css.paginationWrapper}>
      <div className={css.pagination}>
        {current > 1 && (
          <Link href={`${basePath}?page=${current - 1}`} className={css.btn}>
            <SvgIcon name="pagination_left" />
          </Link>
        )}

        {/* Номери сторінок */}
        <div className={css.pages}>
          {pageNumbers.map((p) => (
            <Link
              key={p}
              href={`${basePath}?page=${p}`}
              className={`${css.pageNumber} ${p === current ? css.activePage : ''}`}
            >
              {p}
            </Link>
          ))}
        </div>

        {current < totalPages && (
          <Link href={`${basePath}?page=${current + 1}`} className={css.btn}>
            <SvgIcon name="pagination_right" />
          </Link>
        )}
      </div>
    </div>
  );
}
