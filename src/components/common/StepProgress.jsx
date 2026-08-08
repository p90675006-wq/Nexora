export default function StepProgress({ step, total }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === step - 1
        const isDone = i < step - 1
        return (
          <span
            key={i}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              isActive ? 'w-8 bg-primary-500' : isDone ? 'w-4 bg-primary-300' : 'w-4 bg-border',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}
