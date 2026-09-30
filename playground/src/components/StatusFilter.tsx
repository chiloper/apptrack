import { STATUS_LABEL, STATUSES, type Job, type Status, type Value } from "../types";


export function StatusFilter({ jobsCount, value, onChange }: { jobsCount: Record<Value, number>, value: Value, onChange: (v: Value) => void }) {
  const options: Value[] = ['ALL', ...STATUSES]

  return (
    <div role="group" aria-label="กรองตามสถานะ">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          className={value === opt ? 'chip active' : 'chip'}
          onClick={() => {
            onChange(opt)
          }}
        >
          {opt === 'ALL' ? `ทั้งหมด : ${jobsCount['ALL']}` : `${STATUS_LABEL[opt]} ${jobsCount[opt]}`}
        </button>
      ))}
    </div>
  )
}