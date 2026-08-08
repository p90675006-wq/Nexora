import { Link } from 'react-router-dom'

export default function Logo({ to = '/', size = 'md', className = '' }) {
  const textSize = size === 'lg' ? 'text-2xl' : 'text-lg'
  const markSize = size === 'lg' ? 'h-9 w-9' : 'h-7 w-7'

  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`${markSize} rounded-lg bg-primary-500 flex items-center justify-center shrink-0`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="none">
          <path
            d="M12 3l8 4-8 4-8-4 8-4z"
            fill="#FAFAF7"
          />
          <path
            d="M6 11v4c0 1.5 2.5 3 6 3s6-1.5 6-3v-4"
            stroke="#FAFAF7"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className={`font-display font-semibold tracking-tight text-ink ${textSize}`}>
        StudyMate
      </span>
    </span>
  )

  if (!to) return content
  return (
    <Link to={to} className="rounded-lg" aria-label="StudyMate home">
      {content}
    </Link>
  )
}
