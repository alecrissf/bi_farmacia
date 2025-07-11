import { Row } from './Row';

export interface TableProps {
  header: string[];
  data: (object & { id: any })[];
  onInspect?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function Table({
  header,
  data,
  onInspect,
  onEdit,
  onDelete,
}: TableProps) {
  return (
    <div className="h-full w-full overflow-auto rounded-2xl border-2 border-zinc-500 pb-4">
      {data.length > 0 && (
        <table className="w-full">
          <thead className="sticky top-0 bg-zinc-900">
            <tr className="border-b-2 border-zinc-500">
              {header.map(name => (
                <th key={name} className="px-5 py-2 text-start">
                  {name}
                </th>
              ))}
              <th className="border-l-2 border-zinc-500 px-4 py-1 text-start">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(rowData => (
              <Row
                key={rowData.id}
                data={rowData}
                onInspect={onInspect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-500"></tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
