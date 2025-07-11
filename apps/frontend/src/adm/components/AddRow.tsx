import { useState } from 'react';
import { FiPlusSquare } from 'react-icons/fi';

export interface AddRowProps {
  fields: string[];
  onAdd?: (data: object) => void;
}

export function AddRow({ fields, onAdd }: AddRowProps) {
  const [data, setData] = useState(
    Object.fromEntries(fields.map(f => [f, ''])),
  );

  return (
    <div className="flex max-h-full w-full flex-col gap-4 overflow-auto">
      <div className="flex max-h-full w-full flex-col overflow-auto rounded-2xl border-2 border-zinc-500">
        <table className="w-full">
          <tbody>
            {fields.map(field => (
              <tr key={field} className="border-zinc-500 not-first:border-t">
                <td className="border-r border-zinc-500 px-5 py-2">{field}</td>
                <td className="p-1">
                  <input
                    type="text"
                    className="w-full rounded-tr-xl rounded-br-xl px-5 py-2"
                    value={data[field]}
                    onChange={e =>
                      setData(old => ({ ...old, [field]: e.target.value }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-3 py-2 font-bold"
        onClick={() => onAdd?.(data)}
      >
        <FiPlusSquare size={30} /> Adicionar
      </button>
    </div>
  );
}
