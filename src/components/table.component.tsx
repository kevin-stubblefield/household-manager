export function TableHeader({ columnHeaders }: { columnHeaders?: string[] }) {
  const cellClass = 'border border-slate-500 p-2';

  return (
    <>
      {columnHeaders && (
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={`header-${header}`} className={cellClass}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
      )}
    </>
  );
}
