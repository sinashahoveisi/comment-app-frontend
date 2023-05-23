import type {FC} from 'react';
import Button from '@/components/button/Button';

interface props {
  page: number;
  lastPage: number;
  onChangePage(page: number): void;
}

const CommentsTablePaginate: FC<props> = ({page, lastPage, onChangePage}) => {
  return (
    <nav aria-label="Page navigation" className="my-3 w-full">
      <ul className="mx-auto inline-flex w-full items-center justify-center space-x-3">
        <li>
          <Button variant="secondary" disabled={page === 1} onClick={() => onChangePage(page - 1)}>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </li>
        <li>
          <Button variant="secondary">{page}</Button>
        </li>
        <li>
          <Button variant="secondary" disabled={page === lastPage} onClick={() => onChangePage(page + 1)}>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </li>
      </ul>
    </nav>
  );
};
export default CommentsTablePaginate;
