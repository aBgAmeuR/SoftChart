import { Select } from "@/components/ui/select";
import { Class, Attribute, Method } from "@/types/ClassDiagram";
import { ChangeEvent, useEffect, useState } from "react";
import { Node } from "reactflow";

interface ClassOptionsProps {
  node: Node;
  editNode: (id: string, newData: any) => void;
}

export function ClassOptions({ node, editNode }: ClassOptionsProps) {
  const [name, setName] = useState<string>(node.data.name);
  const [type, setType] = useState<string>(node.data.type);
  const [attributes, setAttributes] = useState<Attribute[]>(node.data.attributes);
  const [methods, setMethods] = useState<Method[]>(node.data.methods);

  useEffect(() => {
    setName(node.data.name);
    setType(node.data.type);
    setAttributes(node.data.attributes);
    setMethods(node.data.methods);
  }, [node.data]);

  useEffect(() => {
    editNode(node.id, { name, type, attributes, methods });
  }, [name, type, attributes, methods, editNode, node.id]);

  return (
    <>
      <div className="mb-1 flex flex-row items-center justify-between">
        {/* <h1 className="text-2xl font-extrabold dark:text-white">{name}</h1> */}
        <input
          className="w-40 -translate-x-1 rounded bg-transparent p-1 text-left text-xl font-semibold outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select variant="outline" size="sm" onChange={(e) => setType(e.target.value)} value={type}>
          <option value="Class">Class</option>
          <option value="interface">Interface</option>
          <option value="abstract">Abstraire</option>
        </Select>
      </div>
      {/* <h1>{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</h1> */}
      <div>
        {getDescription(type)}
      </div>
    </>
  );
}

function getDescription(type: string) {
  switch (type) {
    case "Class":
      return <p>Une classe est un modèle pour créer des objets avec des attributs et des méthodes.</p>;
    case "interface":
      return <p>Une interface impose certaines propriétés sur une classe.</p>;
    case "abstract":
      return <p>Une classe abstraite ne peut pas être directement utilisée pour créer des objets.</p>;
    default:
      return null;
  }
}


