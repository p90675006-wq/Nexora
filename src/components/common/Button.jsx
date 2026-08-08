import { forwardRef } from 'react'

const VARIANTS = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-card',
  secondary:
    'bg-surface text-ink border border-border hover:border-primary-300 hover:text-primary-700',
  accent:
    'bg-accent-500 text-ink hover:bg-accent-600',
  ghost:
    'bg-transparent text-ink-soft hover:text-ink hover:bg-black/[0.03]',
}

const SIZES = {
  sm: 'text-sm px-3.5 py-2 gap-1.5',
  md: 'text-[15px] px-5 py-2.5 gap-2',
  lg: 'text-base px-7 py-3.5 gap-2.5',
}

const Button = forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', size = 'md', className = '', children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={[
        'inline-flex items-center justify-center rounded-full font-semibold',
        'transition-all duration-200 ease-out',
        'disabled:opacity-50 disabled:pointer-events-none',
        'active:scale-[0.98]',
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Button
