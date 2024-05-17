import type { PropsWithChildren } from 'react';

interface CardType extends PropsWithChildren {
  title: string;
  description?: string;
  className?: string;
}

export const Card = (props: CardType) => {
  const { title, children, description } = props;

  return (
    <div className="flex flex-col flex-1 rounded-xl bg-white p-6 justify-center">
      <h2 className="flex text-xl font-medium group">{title}</h2>
      {description && <p className="text-gray-400 mb-6">{description}</p>}
      {children}
    </div>
  );
};
