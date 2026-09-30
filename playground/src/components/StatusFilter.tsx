import { STATUS_LABEL, STATUSES, type Job, type Status } from "../types";

type Value = Status | 'ALL';

export function StatusFilter({ jobs, value, onChange }: { jobs: Job[], value: Value, onChange: (v: Value) => void }) {
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
          {opt === 'ALL' ? `ทั้งหมด : ${jobs.length}` : `${STATUS_LABEL[opt]} ${jobs.filter((j) => j.status === opt).length}`}
        </button>
      ))}
    </div>
  )
}