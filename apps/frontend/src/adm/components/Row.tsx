import { FiEdit, FiSearch, FiTrash } from 'react-icons/fi';

export interface RowProps {
  data: object & { id: any };
  onInspect?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function Row({ data, onInspect, onEdit, onDelete }: RowProps) {
  return (
    <tr className="hover:bg-zinc-700">
      {Object.entries(data).map(([k, v]) => (
        <td key={k} className="px-5 py-2">
          {v}
        </td>
      ))}
      <td className="border-l-2 border-zinc-500 px-4 py-1">
        <div className="flex h-full w-full flex-row gap-2">
          <button
            className="cursor-pointer"
            onClick={() => onInspect?.(data.id)}
          >
            <FiSearch size={18} className="hover:stroke-sky-500" />
          </button>
          <button className="cursor-pointer" onClick={() => onEdit?.(data.id)}>
            <FiEdit size={18} className="hover:stroke-emerald-500" />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => onDelete?.(data.id)}
          >
            <FiTrash size={18} className="hover:stroke-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}
