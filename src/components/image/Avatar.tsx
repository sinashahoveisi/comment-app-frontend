import type {FC} from 'react';
import clsx from 'clsx';
import type {UserProps} from '@/types/comment';

interface props {
  user: UserProps;
  className?: string;
}

const Avatar: FC<props> = ({user, className}) => {
  return (
    <img
      className={clsx('h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500', className)}
      src={user.avatar}
      alt={`${user.first_name} ${user.last_name} avatar`}
    />
  );
};
export default Avatar;
