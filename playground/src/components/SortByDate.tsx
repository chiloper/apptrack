
export function SortByDate({ onChange }: { onChange: (sort: string) => void }) {
  return (
    <div>
      <button
        key="desc"
        onClick={() => onChange('desc')}
      >เรียงจากวันล่าสุด</button>
      <button
        key="asc"
        onClick={() => onChange('asc')}
      >เรียงจากวันน้อยสุด</button>
    </div>
  )
}