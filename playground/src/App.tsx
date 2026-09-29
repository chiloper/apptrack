import { useState } from "react";
import type { Job, NewJob, Status } from "./types";
import { mockJobs } from "./data/mockJobs";
import { AddJobForm } from "./components/AddJobForm";
import { StatusFilter } from "./components/StatusFilter";
import { JobList } from "./components/JobList";

export default function App() {

  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filter, setFilter] = useState<Status | 'ALL'>('ALL')

  function addJob(input: NewJob) {
    setJobs((prev) => [{ ...input, id: Date.now() }, ...prev])
  }

  function deleteJob(id: number) {
    setJobs((prev) => prev.filter((e) => e.id !== id));
  }

  function changeStatus(id: number, status: Status) {
    setJobs((prev) => prev.map((e) => e.id === id ? { ...e, status: status } : e))
  }

  const visibleJobs = filter === 'ALL' ? jobs : jobs.filter((j) => j.status === filter);


  return (
    <main>
      <h1>AppTrack</h1>
      <AddJobForm onAdd={addJob} />
      <StatusFilter value={filter} onChange={setFilter} />
      <JobList jobs={visibleJobs} onDelete={deleteJob} onStatusChange={changeStatus} />
    </main>
  );
}