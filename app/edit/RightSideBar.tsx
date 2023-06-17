import { Node } from 'reactflow';
import { useEffect, useState } from 'react';
import { AttributeProps, MethodProps } from './ClassBlock';

interface RightSidebarProps {
  node: Node | null;
  updateNode: (node: Node) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ node, updateNode }) => {
  const [name, setName] = useState<string>(node?.data.name || '');
  const [type, setType] = useState<string>(node?.data.type || '');
  const [attributes, setAttributes] = useState<AttributeProps[]>(node?.data.attributes || []);
  const [methods, setMethods] = useState<MethodProps[]>(node?.data.methods || []);

  useEffect(() => {
    setName(node?.data.name || '');
    setType(node?.data.type || '');
    setAttributes(node?.data.attributes || []);
    setMethods(node?.data.methods || []);
  }, [node]);

  useEffect(() => {
    if (node) {
      updateNode({
        ...node,
        data: {
          ...node.data,
          name,
          type,
          attributes,
          methods
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, type, attributes, methods, updateNode]);

  return (
    <div id='Sidebar-right'>
      <div>
        <label htmlFor="name">Nom</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="type">Type</label>
        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="class">Class</option>
          <option value="interface">Interface</option>
          <option value="abstract">Abstract</option>
        </select>
        <br />
        <label htmlFor="attributes">Attributs</label>
        <div className="attributes">
          {attributes.map((attribute, index) => (
            <div key={index}>
              <input type="text" name="name" id="name" value={attribute.name} onChange={(e) => {
                const newAttributes = [...attributes];
                newAttributes[index].name = e.target.value;
                setAttributes(newAttributes);
              }}
              />
              <input type="text" name="type" id="type" value={attribute.type} onChange={(e) => {
                const newAttributes = [...attributes];
                newAttributes[index].type = e.target.value;
                setAttributes(newAttributes);
              }} />
              <select name="visibility" id="visibility" value={attribute.visibility} onChange={(e) => {
                const newAttributes = [...attributes];
                newAttributes[index].visibility = e.target.value;
                setAttributes(newAttributes);
              }}>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="protected">protected</option>
              </select>
              <button onClick={() => {
                const newAttributes = [...attributes];
                newAttributes.splice(index, 1);
                setAttributes(newAttributes);
              }}>X</button>
            </div>
          ))}
          <button onClick={() => {
            const newAttributes = [...attributes];
            newAttributes.push({ name: '', type: '', visibility: 'public' });
            setAttributes(newAttributes);
          }
          } className='btn' >Ajouter</button>
        </div>
        <div>
          <label htmlFor="methods">Methods</label>
          <div className="methods">
            {methods.map((method, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={method.name}
                  onChange={(e) => {
                    const newMethods = [...methods];
                    newMethods[index].name = e.target.value;
                    setMethods(newMethods);
                  }}
                />
                <input
                  type="text"
                  name="returnType"
                  id="returnType"
                  value={method.return}
                  onChange={(e) => {
                    const newMethods = [...methods];
                    newMethods[index].return = e.target.value;
                    setMethods(newMethods);
                  }}
                />
                <select
                  name="visibility"
                  id="visibility"
                  value={method.visibility}
                  onChange={(e) => {
                    const newMethods = [...methods];
                    newMethods[index].visibility = e.target.value;
                    setMethods(newMethods);
                  }}
                >
                  <option value="public">public</option>
                  <option value="private">private</option>
                  <option value="protected">protected</option>
                </select>
                <div>
                  <label>Parameters</label>
                  {method.parameters?.map((parameter, parameterIndex) => (
                    <div key={parameterIndex}>
                      <input type="text" name="parameterName" id="parameterName" value={parameter.name} onChange={(e) => {
                        const newMethods = [...methods] || [];
                        newMethods[index].parameters[parameterIndex].name = e.target.value;
                        setMethods(newMethods);
                      }} />
                      <input type="text" name="parameterType" id="parameterType" value={parameter.type} onChange={(e) => {
                        const newMethods = [...methods];
                        newMethods[index].parameters[parameterIndex].type = e.target.value;
                        setMethods(newMethods);
                      }} />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newMethods = [...methods];
                      newMethods[index].parameters?.push({
                        name: "",
                        type: "",
                      });
                      setMethods(newMethods);
                    }}>Add Parameter</button>
                </div>
                <button
                  onClick={() => {
                    const newMethods = [...methods];
                    newMethods.splice(index, 1);
                    setMethods(newMethods);
                  }}>X</button>
              </div>
            ))}
            <button
              onClick={() => {
                const newMethods = [...methods];
                newMethods.push({
                  name: "",
                  return: "",
                  visibility: "public",
                  parameters: [],
                });
                setMethods(newMethods);
              }}
              className="btn"
            >
              Ajouter
            </button>
          </div>
        </div>

      </div>
    </div>

  );
};

export default RightSidebar;