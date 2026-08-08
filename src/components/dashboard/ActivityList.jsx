import { Clock } from 'lucide-react'
import Card from '../common/Card.jsx'

export default function ActivityList({ items = [] }) {
  return (
    <Card className="p-5">
      <h3 className="font-semibold text-sm mb-4">Recent Activity</h3>
      {items.length === 0 ? (
        <p className="text-sm text-ink-faint">No activity yet — start a topic to see it here.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span className="h-7 w-7 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-primary-700" />
              </span>
              <div className="min-w-0">
                <p className="text-sm">
                  {item.label} · <span className="font-medium">{item.topic}</span>
                </p>
                <p className="text-xs text-ink-faint">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
