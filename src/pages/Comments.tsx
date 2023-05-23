import {type FC, useState, type FormEvent, useEffect} from 'react';
import usePaginate from '@/hooks/request/usePaginate';
import CommentsTable from '@/containers/comment/CommentsTable';
import CommentsTablePaginate from '@/containers/comment/CommentsTablePaginate';
import Button from '@/components/button/Button';
import LinkButton from '@/components/button/LinkButton';

const UsersPage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [sortType, setSortType] = useState<string | undefined>(undefined);

  const fetchComments = usePaginate({
    name: ['comments', 'all'],
    url: 'comments',
    query: {sort: 'asc', type: sortType},
    page,
    enabled: true
  });

  const onRefetch = () => fetchComments.refetch();

  const onChangeSortType = (event: FormEvent<HTMLSelectElement>) => {
    setSortType(event.currentTarget.value);
    setPage(1);
  };

  useEffect(() => {
    onRefetch();
  }, [sortType]);

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-200">comments</h1>
            <p className="mt-2 text-sm text-gray-400">A list of all the comments including their id, body, likes.</p>
          </div>
          <div className="mt-4 flex flex-row sm:ml-16 sm:mt-0 sm:flex-none">
            <select
              id="sort"
              onChange={onChangeSortType}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <option selected>Choose a sort</option>
              <option value="likes">Likes</option>
              <option value="created_at">CreatedAt</option>
            </select>
            <Button
              title="Refresh"
              variant="primary"
              className="mx-2"
              onClick={onRefetch}
              isLoading={fetchComments?.isRefetching}
            />
            <LinkButton href="/users/create" title="Add User" variant="primary-outline" />
          </div>
        </header>
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <CommentsTable comments={fetchComments?.data} isLoading={fetchComments?.isLoading} />
            <CommentsTablePaginate page={page} onChangePage={setPage} lastPage={fetchComments?.meta?.total} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UsersPage;
