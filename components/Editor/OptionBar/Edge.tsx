import { BackgroundVariant, Edge } from "reactflow"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button";

interface Props {
  edge: Edge,
  editEdge: (id: string, newData: any) => void;
  deleteEdge: (id: string) => void;
}

export function EdgeOptions({ edge, editEdge, deleteEdge }: Props) {

  return (
    <div className="flex flex-row items-center justify-between">
      <h2>Edge</h2>
      <div>
        <button
          className="box-border flex h-[28px] w-[28px] items-center justify-center rounded bg-neutral-100 p-1 text-xl font-normal text-neutral-800 hover:bg-red-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-500"
          onClick={e => deleteEdge(edge.id)}
        ><p className="=text-[20px]"><svg fill="#000000" height="12px" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg></p></button>
      </div>
    </div>
  )
}
