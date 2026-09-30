import { STATUS_LABEL, STATUSES, type Status } from "../types";

type Value = Status | 'ALL';

export function StatusFilter({ value, onChange }: { value: Value, onChange: (v: Value) => void }) {
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
          {opt === 'ALL' ? 'ทั้งหมด' : STATUS_LABEL[opt]}
        </button>
      ))}
    </div>
  )
}