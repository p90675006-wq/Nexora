// The mastery ring is StudyMate's signature visual motif: every place
// progress is shown (dashboard, topic cards) uses this same shape so
// "how well do I know this" always reads the same way at a glance.

const TONE_COLORS = {
  primary: '#0E7C66',
  accent: '#E8A33D',
  weak: '#C4544A',
  blurred: '#C79A3D',
}

export default function ProgressRing({
  percent = 0,
  size = 56,
  strokeWidth = 5,
  tone = 'primary',
  label,
  showLabel = true,
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference
  const color = TONE_COLORS[tone] || TONE_COLORS.primary

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label || `${percent}% mastered`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E7E5DE"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-ring-fill"
          style={{ '--ring-start': circumference, '--ring-end': offset }}
        />
      </svg>
      {showLabel && (
        <span className="absolute font-mono text-[11px] font-medium text-ink-soft">
          {Math.round(percent)}%
        </span>
      )}
    </div>
  )
}
