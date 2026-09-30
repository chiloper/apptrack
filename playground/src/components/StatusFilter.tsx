import { STATUS_LABEL, STATUSES, type FilterValue } from "../types";


export function StatusFilter({ jobsCount, value, onChange }: { jobsCount: Record<FilterValue, number>, value: FilterValue, onChange: (v: FilterValue) => void }) {
  const options: FilterValue[] = ['ALL', ...STATUSES]

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