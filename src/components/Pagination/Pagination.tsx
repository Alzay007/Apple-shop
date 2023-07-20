import classNames from 'classnames';

import styles from './Pagination.module.scss';

function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handleSetPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const page = Number(event.currentTarget.dataset.currentPage);

    if (page < 1 || page === currentPage || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  let pagesToShow: number[] = [];
  if (totalPages <= 3) {
    pagesToShow = getNumbers(1, totalPages);
  } else if (currentPage <= 3) {
    pagesToShow = getNumbers(1, 3);
  } else if (currentPage >= totalPages - 2) {
    pagesToShow = getNumbers(totalPages - 2, totalPages);
  } else {
    pagesToShow = getNumbers(currentPage - 1, currentPage + 1);
  }

  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination_ul}>
        <li className={styles.page_item}>
          <a
            className={classNames(
              styles.page_link,
              styles.page_arrow,
              styles.left,
              { [styles.prev_disabled]: currentPage === 1 }
            )}
            href="#prev"
            data-current-page={currentPage - 1}
            aria-disabled={currentPage === 1}
            onClick={handleSetPage}
          ></a>
        </li>
        {pagesToShow.map((page) => (
          <li
            key={page}
            className={classNames(styles.page_item, {
              [styles.page_active]: page === currentPage
            })}
          >
            <a
              className={classNames(styles.page_link, {
                [styles.link_active]: page === currentPage
              })}
              data-current-page={page}
              href={`#${page}`}
              onClick={handleSetPage}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={styles.page_item}>
          <a
            className={classNames(
              styles.page_link,
              styles.page_arrow,
              styles.right,
              { [styles.next_disabled]: currentPage === totalPages }
            )}
            href="#next"
            data-current-page={currentPage + 1}
            aria-disabled={currentPage === totalPages}
            onClick={handleSetPage}
          ></a>
        </li>
      </ul>
    </div>
  );
};
