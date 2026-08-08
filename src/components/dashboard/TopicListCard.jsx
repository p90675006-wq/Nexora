import Card from '../common/Card.jsx'
import ProgressRing from '../common/ProgressRing.jsx'

const TONE_STYLES = {
  primary: { dot: 'bg-primary-500', badge: 'bg-primary-50 text-primary-700' },
  blurred: { dot: 'bg-blurred-500', badge: 'bg-blurred-50 text-blurred-700' },
  weak: { dot: 'bg-weak-500', badge: 'bg-weak-50 text-weak-700' },
}

export default function TopicListCard({ title, tone = 'primary', topics = [], emptyLabel }) {
  const styles = TONE_STYLES[tone] || TONE_STYLES.primary

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className={`ml-auto text-xs font-mono px-2 py-0.5 rounded-full ${styles.badge}`}>
          {topics.length}
        </span>
      </div>

      {topics.length === 0 ? (
        <p className="text-sm text-ink-faint">{emptyLabel || 'Nothing here yet.'}</p>
      ) : (
        <ul className="space-y-3">
          {topics.map((topic) => (
            <li key={topic.id} className="flex items-center gap-3">
              <ProgressRing percent={topic.masteryPercent} size={34} strokeWidth={3.5} tone={tone} showLabel={false} />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{topic.name}</p>
                <p className="text-xs text-ink-faint">{topic.subject}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
