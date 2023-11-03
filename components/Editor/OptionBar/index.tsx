import { useContext, useEffect, useState } from "react"
import {
  BackgroundVariant,
  Edge,
  MarkerType,
  Node,
  useOnSelectionChange,
} from "reactflow"

import SidebarContext from "@/hooks/SidebarContext"

import { ClassOptions } from "./Class"
import { DefaultOptions } from "./Default"
import { EdgeOptions } from "./Edge"

interface OptionBarProps {
  editNode: (id: string, newData: any) => void
  editEdge: (
    id: string,
    label: string,
    markerStart: string,
    markerEnd: string,
    path: string,
    startLabel: string,
    endLabel: string
  ) => void
  setBgVariant: (variant: BackgroundVariant) => void
  deleteEdge: (id: string) => void
}

export function OptionBar({
  editNode,
  setBgVariant,
  editEdge,
  deleteEdge,
}: OptionBarProps) {
  const [entitySelected, setEntitySelected] = useState<Node | Edge | null>(null)
  let { isOpen } = useContext(SidebarContext)

  useOnSelectionChange({
    onChange: (e) => {
      const node = e.nodes[0]
      const edge = e.edges[0]
      if (entitySelected?.type === "floating" && !node) return
      if (node) setEntitySelected(node)
      else if (edge) setEntitySelected(edge)
      else setEntitySelected(null)
    },
  })

  function getOptions() {
    if (!entitySelected) return <DefaultOptions setBgVariant={setBgVariant} />
    if (entitySelected.type === "Class")
      return <ClassOptions node={entitySelected as Node} editNode={editNode} />
    if (entitySelected.type === "floating")
      return (
        <EdgeOptions
          edge={entitySelected as Edge}
          editEdge={editEdge}
          deleteEdge={deleteEdge}
        />
      )
    else return <DefaultOptions setBgVariant={setBgVariant} />
  }

  return (
    <div
      className={`flex ${
        isOpen ? "w-[400px]" : "hidden"
      } flex-col border-l border-neutral-100 p-4 dark:border-white/5`}
    >
      {getOptions()}
    </div>
  )
}
