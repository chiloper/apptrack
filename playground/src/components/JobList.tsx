import type { Job, Status } from "../types";
import { JobCard } from "./JobCard";


type JobListProps = {
  jobs: Job[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
}

export function JobList({ jobs, onDelete, onStatusChange }: JobListProps) {
  if (jobs.length === 0) {
    return <p className="empty"> ยังไม่มีงานในรายการนี้</p>
  }
  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} onDelete={onDelete} onStatusChange={onStatusChange} />
        </li>
      ))}
    </ul>
  )
}