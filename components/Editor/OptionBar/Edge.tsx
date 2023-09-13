import { Select } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Edge, EdgeMarker, EdgeMarkerType } from "reactflow"

interface Props {
  edge: Edge,
  editEdge: (id: string, label: string, markerStart: string, markerEnd: string, path: string, startLabel: string, endLabel: string) => void
  deleteEdge: (id: string) => void;
}

const getMarkerStart = (edge: Edge) => {
  const markerStart = edge.markerStart as EdgeMarker;
  return markerStart.type
}

export function EdgeOptions({ edge, editEdge, deleteEdge }: Props) {
  const [label, setLabel] = useState<string>(edge.data?.label);
  const [markerStart, setMarkerStart] = useState<string>((edge.markerStart as EdgeMarker)?.type || "");
  const [markerEnd, setMarkerEnd] = useState<string>((edge.markerEnd as EdgeMarker)?.type || "");
  const [path, setPath] = useState<string>(edge.data?.path);
  const [startLabel, setStartLabel] = useState<string>(edge.data?.startLabel);
  const [endLabel, setEndLabel] = useState<string>(edge.data?.endLabel);

  useEffect(() => {
    setLabel(edge.data?.label);
    setMarkerStart((edge.markerStart as EdgeMarker)?.type || "");
    setMarkerEnd((edge.markerEnd as EdgeMarker)?.type || "");
    setPath(edge.data?.path);
    setStartLabel(edge.data?.startLabel);
    setEndLabel(edge.data?.endLabel);
  }, [edge.data?.endLabel, edge.data?.label, edge.data?.path, edge.data?.startLabel, edge.markerEnd, edge.markerStart]);

  useEffect(() => {
    editEdge(edge.id, label, markerStart, markerEnd, path, startLabel, endLabel);
  }, [edge.id, editEdge, endLabel, label, markerEnd, markerStart, path, startLabel]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between ">
        <h2 className="text-xl font-semibold">Edge</h2>
        <div>
          <button
            className="box-border flex h-[28px] w-[28px] items-center justify-center rounded bg-neutral-100 p-1 text-xl font-normal text-neutral-800 hover:bg-red-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-500"
            onClick={e => deleteEdge(edge.id)}
          ><p className="=text-[20px]"><svg fill="#000000" height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg></p></button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <p>Shape :</p>
          <Select variant="outline" size="sm" value={path} onChange={e => setPath(e.target.value)}>
            <option value="line">Line</option>
            <option value="bezier">Bezier</option>
          </Select>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Label :</p>
          <input
            className="w-[150px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
            placeholder="Nom"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <h2 className="mt-2 text-xl font-semibold">Start</h2>
        <div className="flex flex-row items-center gap-2">
          <p>Arrow :</p>
          <Select variant="outline" size="sm" value={markerStart} onChange={e => setMarkerStart(e.target.value)}>
            <option value="arrow">Arrow</option>
            <option value="arrowclosed">ArrowClosed</option>
            <option value="">None</option>
          </Select>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Label :</p>
          <input
            className="w-[80px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
            placeholder="Nom"
            value={startLabel}
            onChange={(e) => setStartLabel(e.target.value)}
          />
        </div>
        <h2 className="mt-2 text-xl font-semibold">Target</h2>
        <div className="flex flex-row items-center gap-2">
          <p>Arrow :</p>
          <Select variant="outline" size="sm" value={markerEnd} onChange={e => setMarkerEnd(e.target.value)}>
            <option value="arrow">Arrow</option>
            <option value="arrowclosed">ArrowClosed</option>
            <option value="">None</option>
          </Select>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p>Label :</p>
          <input
            className="w-[80px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
            placeholder="Nom"
            value={endLabel}
            onChange={(e) => setEndLabel(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
