import { BackgroundVariant, Edge, Node, useOnSelectionChange } from "reactflow";
import { ClassOptions } from "./Class";
import { DefaultOptions } from "./Default";
import { EdgeOptions } from "./Edge";
import { useEffect, useState } from "react";

interface OptionBarProps {
  editNode: (id: string, newData: any) => void;
  editEdge: (id: string, newData: any) => void;
  setBgVariant: (variant: BackgroundVariant) => void;
  deleteEdge: (id: string) => void;
}

export function OptionBar({ editNode, setBgVariant, editEdge, deleteEdge }: OptionBarProps) {
  const [entitySelected, setEntitySelected] = useState<Node | Edge | null>(null);

  useOnSelectionChange({
    onChange: (e) => {
      const node = e.nodes[0];
      const edge = e.edges[0];
      if (node) setEntitySelected(node);
      else if (edge) setEntitySelected(edge);
      else setEntitySelected(null);
    }
  });

  useEffect(() => {
    console.log(entitySelected);
  }, [entitySelected]);

  function getOptions() {
    console.log(entitySelected);

    if (!entitySelected) return <DefaultOptions setBgVariant={setBgVariant} />;
    if (entitySelected.type === "Class")
      return <ClassOptions node={entitySelected as Node} editNode={editNode} />;
    if (entitySelected.type === "floating")
      return <EdgeOptions edge={entitySelected as Edge} editEdge={editEdge} deleteEdge={deleteEdge} />;
    else
      return <DefaultOptions setBgVariant={setBgVariant} />;
  }

  return (
    <div className="flex w-[400px] flex-col border-l border-neutral-100 p-4 dark:border-white/5">
      {getOptions()}
    </div>
  )
}
