import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'link';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  loading?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  outline = false,
  onClick,
  className = ''
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = outline ? `btn-outline btn-${variant}` : `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const loadingClass = loading ? 'loading' : '';
  
  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
}