import type {FC} from 'react';
import {useQueryClient} from 'react-query';
import Button from '@/components/button/Button';
import LinkButton from '@/components/button/LinkButton';
import type {CommentProps} from '@/types/comment';
import usePost from '@/hooks/request/usePost';
import Spinner from '@/components/loading/Spinner';

interface props {
  comments: CommentProps[];
  isLoading?: boolean;
}

const CommentsTable: FC<props> = ({comments, isLoading}) => {
  const queryClient = useQueryClient();

  const deletecomment = usePost({
    url: '/comments/{id}',
    method: 'DELETE',
    onSuccess() {
      queryClient.refetchQueries(['comments', 'all']);
    }
  });

  if (isLoading)
    return (
      <div className="my-20 flex w-full items-center justify-center">
        <Spinner size="!w-7 !h-7" className="ml-2 !p-0" />
      </div>
    );

  return (
    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                ID
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Body
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Pined
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Likes
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Created At
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {comments?.map((comment: CommentProps) => (
              <tr key={comment?.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {comment?.id}
                </td>
                <td className="w-12 overflow-hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500">{comment.body}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{String(comment.is_pined)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{comment.likes}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{comment.created_at}</td>
                <td className="flex flex-row items-center justify-end py-4 pl-3 pr-4 sm:pr-6">
                  <Button
                    title="Delete"
                    variant="danger"
                    className="mr-2"
                    isLoading={deletecomment?.isLoading && deletecomment?.params?.id === comment?.id}
                    onClick={() => deletecomment.post(null, null, comment)}
                  />
                  <LinkButton title="Edit" href={`/comments/${comment?.id}`} variant="secondary-outline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CommentsTable;
