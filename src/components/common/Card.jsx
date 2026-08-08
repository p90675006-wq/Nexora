export default function Card({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={[
        'bg-surface border border-border rounded-2xl shadow-card',
        'transition-shadow duration-200 ease-out',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}
