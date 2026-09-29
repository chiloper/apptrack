import { STATUS_LABEL, STATUSES, type Job, type Status } from "../types";

type JobCardProps = {
  job: Job;
  onDelete?: (id: number) => void;
  onStatusChange?: (id: number, status: Status) => void;
}

export function JobCard({ job, onDelete, onStatusChange }: JobCardProps) {
  return (
    <article className="job-card">
      <header>
        <h3>{job.position}</h3>
        <span className={`badge badge-${job.status.toLocaleLowerCase()}`}>{STATUS_LABEL[job.status]}</span>
      </header>
      <p>{job.company} - สมัคร {job.appliedAt} - จาก {job.source}</p>
      {onStatusChange && (
        <select
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value as Status)}
        >
          {STATUSES.map((s) =>
            <option
              key={s}
              value={s}
            >
              {STATUS_LABEL[s]}
            </option>
          )}
        </select>
      )}
      {onDelete && <button onClick={()=>onDelete(job.id)}> ลบ </button>}
    </article>
  )
}