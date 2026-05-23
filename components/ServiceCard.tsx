import type { ComponentType } from 'react';

type ServiceCardProps = {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
};

export function ServiceCard({ icon: Icon, title, body }: ServiceCardProps) {
  return (
    <article className="bg-white border border-black p-8 outline outline-0 outline-black -outline-offset-1 transition-[outline-width] hover:outline-2">
      <Icon
        size={32}
        className="mb-6 text-black"
      />
      <h3 className="font-sans text-2xl font-semibold text-black mb-3">{title}</h3>
      <p className="font-sans text-black leading-relaxed">{body}</p>
    </article>
  );
}
