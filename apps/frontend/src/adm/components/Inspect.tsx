export interface InspectProps {
  data: object & { id: any };
}

export function Inspect({ data }: InspectProps) {
  return (
    <div className="flex max-h-full w-full flex-col overflow-auto rounded-2xl border-2 border-zinc-500">
      <table className="w-full">
        <tbody>
          {Object.entries(data).map(([k, v]) => (
            <tr key={k} className="border-zinc-500 not-first:border-t">
              <td className="border-r border-zinc-500 px-5 py-2">{k}</td>
              <td className="px-5 py-2">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
