import { Edge, Node, useOnSelectionChange } from "reactflow";
import { ClassOptions } from "./Class";
import { DefaultOptions } from "./Default";
import { useEffect, useState } from "react";

interface OptionBarProps {
  editNode: (id: string, newData: any) => void;
}

export function OptionBar({ editNode } : OptionBarProps) {
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
    if (!entitySelected) return <DefaultOptions />;
    if (entitySelected.type === "Class")
      return <ClassOptions node={entitySelected as Node} editNode={editNode} />;
    else
      return <DefaultOptions />;
  }

  return (
    <div className="flex w-96 flex-col p-4">
      {getOptions()}
    </div>
  )
}
