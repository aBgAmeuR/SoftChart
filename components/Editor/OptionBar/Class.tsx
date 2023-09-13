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
        <input
          className="w-[150px] -translate-x-1 rounded bg-transparent p-1 text-left text-xl font-semibold outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
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
      {getDescription(type)}
      <div className="mt-5 flex flex-col gap-2 ">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-medium dark:text-white">Attributs</h1>
          <button
            className="box-border flex h-[28px] w-[28px] items-center justify-center rounded bg-neutral-100 p-1 text-xl font-normal text-neutral-800 hover:bg-green-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-green-600 "
            onClick={() => setAttributes([...attributes, { name: "", type: "" }])}
          >+</button>
        </div>
        <div className="flex flex-col gap-1">
          {attributes.map((attribute, index) => getAttributeCode(attribute, index))}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 ">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-medium dark:text-white">Méthodes</h1>
          <button
            className="box-border flex h-[28px] w-[28px] items-center justify-center rounded bg-neutral-100 p-1 text-xl font-normal text-neutral-800 hover:bg-green-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-green-600 "
            onClick={() => setMethods([...methods, { name: "", return: "", visibility: "none" }])}
          >+</button>
        </div>
        <div className="flex flex-col gap-1">
          {methods.map((method, index) => getMethodCode(method, index))}
        </div>
      </div>
    </>
  );

  function getAttributeCode(attribute: Attribute, index: number) {
    return (
      <div key={index} className="flex flex-row items-center gap-2">
        <Select variant="outline" size="sm" onChange={(e) => {
          const newAttributes = [...attributes];
          newAttributes[index].visibility = e.target.value;
          setAttributes(newAttributes);
        }} value={attribute.visibility}>
          <option value="none">Vide</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="protected">Protected</option>
        </Select>
        <input
          className="w-[80px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          placeholder="Nom"
          value={attribute.name}
          onChange={(e) => {
            const newAttributes = [...attributes];
            newAttributes[index].name = e.target.value;
            setAttributes(newAttributes);
          }}
        />
        <span>:</span>
        <input
          className="w-[70px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          placeholder="Type"
          value={attribute.type}
          onChange={(e) => {
            const newAttributes = [...attributes];
            newAttributes[index].type = e.target.value;
            setAttributes(newAttributes);
          }}
        />
        <button
            className="box-border flex h-[28px] w-[28px] items-center justify-center rounded bg-neutral-100 p-1 text-xl font-normal text-neutral-800 hover:bg-red-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-500"
            onClick={() => setAttributes(attributes.filter((_, i) => i !== index))}
        ><p className="=text-[20px]">-</p></button>
      </div>
    );
  }

  function getMethodCode(method: Method, index: number) {
    return (
      <div key={index} className="flex flex-row items-center gap-2">
        <Select variant="outline" size="sm" onChange={(e) => {
          const newMethods = [...methods];
          newMethods[index].visibility = e.target.value;
          setMethods(newMethods);
        }} value={method.visibility}>
          <option value="none">Vide</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="protected">Protected</option>
        </Select>
        <input
          className="w-[80px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          placeholder="Nom"
          value={method.name}
          onChange={(e) => {
            const newMethods = [...methods];
            newMethods[index].name = e.target.value;
            setMethods(newMethods);
          }}
        />
        <span>:</span>
        <input
          className="w-[70px] rounded bg-transparent p-1 text-left outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
          placeholder="Return"
          value={method.return}
          onChange={(e) => {
            const newMethods = [...methods];
            newMethods[index].return = e.target.value;
            setMethods(newMethods);
          }}
        />
        <button
            className="box-border flex h-[28px] w-[28px] items-center justify-center rounded bg-neutral-100 p-1 text-xl font-normal text-neutral-800 hover:bg-red-500 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-500"
            onClick={() => setMethods(methods.filter((_, i) => i !== index))}
        ><p className="=text-[20px]">-</p></button>
      </div>
    );
  }
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
