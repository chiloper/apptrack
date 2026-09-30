import { useState } from "react";
import type { Job, NewJob, Status, Value } from "./types";
import { mockJobs } from "./data/mockJobs";
import { AddJobForm } from "./components/AddJobForm";
import { StatusFilter } from "./components/StatusFilter";
import { JobList } from "./components/JobList";
import { SortByDate } from "./components/SortByDate";
import { preconnect } from "react-dom";


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
  let countStatus: Record<Value, number> = {
    'ALL': jobs.length,
    'APPLIED': jobs.filter((f) => f.status === 'APPLIED').length,
    'INTERVIEW': jobs.filter((f) => f.status === 'INTERVIEW').length,
    'OFFER': jobs.filter((f) => f.status === 'OFFER').length,
    'REJECTED': jobs.filter((f) => f.status === 'REJECTED').length,
    'WITHDRAWN': jobs.filter((f) => f.status === 'WITHDRAWN').length,
  }


  return (
    <main>
      <h1>AppTrack</h1>
      <AddJobForm onAdd={addJob} />
      <StatusFilter jobsCount={countStatus} value={filter} onChange={setFilter} />
      <SortByDate onChange={setSortJobs} />
      <JobList jobs={visibleJobs} onDelete={deleteJob} onStatusChange={changeStatus} />
    </main>
  );
}