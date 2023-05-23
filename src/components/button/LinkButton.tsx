import {type FC, memo, type ReactNode, useMemo} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import type {ButtonVariant} from '@/types/general';

interface Props {
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
  titleClassName?: string;
  href: string;
  disabled?: boolean;
  backgroundColor?: string;
  width?: string;
  iconOnly?: boolean;
}
const LinkButton: FC<Props> = ({
  title,
  type = 'button',
  className,
  titleClassName,
  href,
  children,
  backgroundColor,
  variant = 'primary',
  width = 'w-fit'
}) => {
  const clx = useMemo(
    () =>
      clsx(
        'px-3 py-2 w-fit text-center text-xs font-thin text-body justify-center border-2 transition-all duration-300 my-2 flex shrink-0 items-center rounded-lg',
        className,
        {'bg-red-500 border-transparent': variant === 'danger'},
        {'!text-red-500 border-transparent bg-transparent': variant === 'danger-ghost'},
        {'!border-0 bg-transparent': variant === 'ghost'},
        {'!text-red-500 border-red-500': variant === 'danger-outline'},
        {'!bg-primary !border-transparent': variant === 'primary'},
        {'!text-primary !border-primary': variant === 'primary-outline'},
        {'bg-secondary border-transparent': variant === 'secondary'},
        {'!text-secondary-dark border-secondary-dark': variant === 'secondary-outline'},
        {'!text-zinc-500/80 border-gray-200': variant === 'muted-outline'},
        {[width]: width},
        {backgroundColor}
      ),
    [className, backgroundColor, variant, width]
  );

  return (
    <Link type={type} to={href} className={clx}>
      <span className={clsx('whitespace-nowrap font-normal', titleClassName)}>{children || title}</span>
    </Link>
  );
};

export default memo(LinkButton);
