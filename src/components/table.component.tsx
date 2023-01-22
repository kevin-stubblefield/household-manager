export function TableHeader({ columnHeaders }: { columnHeaders?: string[] }) {
  const cellClass = 'text-gray-300 p-4';

  return (
    <>
      {columnHeaders && (
        <thead>
          <tr className="bg-gray-800">
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
