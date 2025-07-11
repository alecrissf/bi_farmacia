import { PropsWithChildren } from 'react';

export type CardProps = PropsWithChildren<{
  title?: string;
  isFullSize?: boolean;
  className?: string;
}>;

export function Card({
  children,
  title,
  isFullSize = false,
  className,
}: CardProps) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center gap-4 rounded-2xl bg-zinc-800 p-5' +
        (isFullSize ? ' h-full w-full' : '') +
        ' ' +
        className
      }
    >
      {title && (
        <h3
          className={
            isFullSize ? 'text-center text-4xl' : 'text-center text-lg'
          }
        >
          {title}
        </h3>
      )}
      <div className={isFullSize ? 'h-full w-11/12' : 'h-80 w-full'}>
        {children}
      </div>
    </div>
  );
}
