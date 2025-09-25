import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  compact?: boolean;
  bordered?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  title,
  compact = false,
  bordered = false,
  imageSrc,
  imageAlt,
  actions,
  className = ''
}: CardProps) {
  const cardClasses = [
    'card',
    'bg-base-100',
    'shadow-xl',
    compact ? 'card-compact' : '',
    bordered ? 'card-bordered' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {imageSrc && (
        <figure>
          <img src={imageSrc} alt={imageAlt} />
        </figure>
      )}
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && (
          <div className="card-actions justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}