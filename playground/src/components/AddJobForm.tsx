import { useState, type ChangeEvent, type FormEvent } from "react";
import { SOURCES, type NewJob } from "../types";

const toDay = () => new Date().toISOString().slice(0, 10);
const empty = { company: '', position: '', source: 'jobsdb' as const, appliedAt: toDay() }

export function AddJobForm({ onAdd }: { onAdd: (job: NewJob) => void }) {
  const [form, setForm] = useState<Omit<NewJob, 'status'>>(empty)
  const [error, setError] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.company.trim() || !form.position.trim()) {
      setError('กรอกบริษัทและตำแหน่งให้ครบ');
      return;
    }

    onAdd({ ...form, company: form.company?.trim(), position: form.position?.trim(), status: "APPLIED" })
    setForm({ ...empty, appliedAt: toDay() })
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label> บริษัท  <input name="company" value={form.company} onChange={handleChange} /> </label>
      <label> ตำแหน่ง  <input name="position" value={form.position} onChange={handleChange} /> </label>
      <label> วันที่สมัคร  <input type="date" name="data" value={form.appliedAt} onChange={handleChange} /></label>
      <label> จากเว็บ
        <select name="source" value={form.source} onChange={handleChange}>
          {SOURCES.map((s) => <option key={s}> {s}</option>)}
        </select>
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">เพิ่ม</button>
    </form>
  )
}