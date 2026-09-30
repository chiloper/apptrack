import { useState } from "react";
import { STATUSES, type FilterValue, type Job, type NewJob, type Status } from "./types";
import { mockJobs } from "./data/mockJobs";
import { AddJobForm } from "./components/AddJobForm";
import { StatusFilter } from "./components/StatusFilter";
import { JobList } from "./components/JobList";
import { SortByDate } from "./components/SortByDate";

export default function App() {

  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filter, setFilter] = useState<Status | 'ALL'>('ALL')
  const [sortJobs, setSortJobs] = useState<string>('desc')

  function addJob(input: NewJob) {
    setJobs((prev) => [{ ...input, id: Date.now() }, ...prev])
  }

  function deleteJob(id: number) {
    setJobs((prev) => prev.filter((e) => e.id !== id));
  }

  function changeStatus(id: number, status: Status) {
    setJobs((prev) => prev.map((e) => e.id === id ? { ...e, status: status } : e))
  }


  let sortedJobs = [...jobs].sort((a, b) =>
    sortJobs === 'desc'
      ? Number(new Date(b.appliedAt)) - Number(new Date(a.appliedAt))
      : Number(new Date(a.appliedAt)) - Number(new Date(b.appliedAt))
  )

  let visibleJobs = filter === 'ALL' ? sortedJobs : sortedJobs.filter((j) => j.status === filter);
  const counts = {
    ALL: jobs.length,
    ...Object.fromEntries(STATUSES.map((s) => [s, jobs.filter((j) => j.status === s).length])),
  } as Record<FilterValue, number>;


  return (
    <main>
      <h1>AppTrack</h1>
      <AddJobForm onAdd={addJob} />
      <StatusFilter jobsCount={counts} value={filter} onChange={setFilter} />
      <SortByDate onChange={setSortJobs} />
      <JobList jobs={visibleJobs} onDelete={deleteJob} onStatusChange={changeStatus} />
    </main>
  );
}