import { PropsWithChildren } from 'react';

export type CardProps = PropsWithChildren<{ title?: string }>;

export function Card({ children, title }: CardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-zinc-800 p-5">
      {title && <h3 className="text-center text-lg">{title}</h3>}
      <div className="h-80 w-96">{children}</div>
      {/* <div className="h-full w-full">{children}</div> */}
    </div>
  );
}
