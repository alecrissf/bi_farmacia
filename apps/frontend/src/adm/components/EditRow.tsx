import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';

export interface EditRowProps {
  fields: string[];
  data: any;
  onEdit?: (id: number, data: object) => void;
}

export function EditRow({ fields, data, onEdit }: EditRowProps) {
  const [, setWeirdHack] = useState(false);

  const [updatedData, setUpdatedData] = useState(
    Object.fromEntries(fields.map(f => [f, ''])),
  );
  const [id, setId] = useState<number>();

  useEffect(() => {
    if (data) {
      console.log(data);
      setUpdatedData(old => {
        for (const k in old) {
          old[k] = data[k];
        }
        setId(data.id);
        setWeirdHack(o => !o);
        return old;
      });
    }
  }, [data]);

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
                    value={updatedData[field]}
                    onChange={e =>
                      setUpdatedData(old => ({
                        ...old,
                        [field]: e.target.value,
                      }))
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
        onClick={() => onEdit?.(id ?? -1, updatedData)}
      >
        <FiEdit size={30} /> Atualizar
      </button>
    </div>
  );
}
