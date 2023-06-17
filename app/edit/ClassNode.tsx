import { Handle, NodeProps, Position } from 'reactflow';
import { Attribute, AttributeProps, Method, MethodProps } from './ClassBlock';

interface ClassNodeData {
  name: string;
  type: string;
  attributes: AttributeProps[];
  methods: MethodProps[];
}

const ClassNode: React.FC<NodeProps<ClassNodeData>> = ({ data }) => {
  const { attributes, methods, type } = data;

  return (
    <div className='ClassNode'>
      <Handle type="target" position={Position.Top} id="a" style={{ display: 'none' }} />
      <Handle type="source" position={Position.Bottom} id="b" style={{ display: 'none' }} />
      <div className="name">
        {type === 'interface' && <p>&lt;&lt;interface&gt;&gt;</p>}
        {type === 'abstract' && <p>&lt;&lt;abstract&gt;&gt;</p>}
        <p className='data-name'>{data.name}</p>
      </div>
      <div className="line"></div>
      <div>
        {attributes.map((attribute, index) => (
          <Attribute key={index} name={attribute.name} type={attribute.type} visibility={attribute.visibility} />
        ))}
      </div>
      <div className="line"></div>
      <div>
        {methods.map((method, index) => (
          <Method key={index} name={method.name} parameters={method.parameters} return={method.return} visibility={method.visibility} />
        ))}
      </div>
    </div>
  );
};

export default ClassNode;
