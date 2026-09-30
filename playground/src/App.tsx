import { useState } from "react";
import type { Job, NewJob, Status } from "./types";
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


  let visibleJobs = jobs.sort((a, b) => {
    if (sortJobs === 'desc') {
      return Number(new Date(a.appliedAt)) - Number(new Date(b.appliedAt))
    } else {
      return Number(new Date(b.appliedAt)) - Number(new Date(a.appliedAt))
    }
  })

  visibleJobs = filter === 'ALL' ? visibleJobs : visibleJobs.filter((j) => j.status === filter);



  return (
    <main>
      <h1>AppTrack</h1>
      <AddJobForm onAdd={addJob} />
      <StatusFilter value={filter} onChange={setFilter} />
      <SortByDate onChange={setSortJobs} />
      total: {visibleJobs.length}
      <JobList jobs={visibleJobs} onDelete={deleteJob} onStatusChange={changeStatus} />
    </main>
  );
}