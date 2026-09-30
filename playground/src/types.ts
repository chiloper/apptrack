// src/types.ts
export const STATUSES = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'] as const;
export type Status = (typeof STATUSES)[number];

export const SOURCES = ['jobthai', 'jobsdb', 'linkedin', 'jobbkk', 'other'] as const;
export type Source = (typeof SOURCES)[number];

export type FilterValue = Status | 'ALL';
export type Job = {
  id: number;
  company: string;
  position: string;
  status: Status;
  appliedAt: string;   // รูปแบบ YYYY-MM-DD
  source: Source;
};

export type NewJob = Omit<Job, 'id'>;

export const STATUS_LABEL: Record<Status, string> = {
  APPLIED: 'ส่งใบสมัครแล้ว',
  INTERVIEW: 'นัดสัมภาษณ์',
  OFFER: 'ได้ข้อเสนอ',
  REJECTED: 'ไม่ผ่าน',
  WITHDRAWN: 'ถอนใบสมัคร',
};

