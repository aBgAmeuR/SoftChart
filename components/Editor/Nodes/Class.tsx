import React, { use, useEffect } from 'react';
import { Handle, NodeProps, Position, useEdges, useStore } from 'reactflow';
import { Class as ClassType, Attribute as AttributeType, Method as MethodType } from '@/types/ClassDiagram';

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

const sourceStyle = { zIndex: 1 };

const handleStyles = {
  top: '0%',
  right: '0',
  width: '100%',
  height: '100%',
  borderRadius: '0',
  opacity: '0'
}

const ClassNode: React.FC<NodeProps<ClassType>> = ({ data }) => {
  const { attributes, methods, type, addEdgeMode } = data;
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;

  return (
    <div className='ClassNode'>
      {!isConnecting && (
        <Handle
          className="customHandle"
          position={Position.Bottom}
          type="source"
          style={{ ...handleStyles, ...sourceStyle, ...(addEdgeMode ? { display: 'block' } : { display: 'none' }) }}
        />
      )}
      <Handle type="target" position={Position.Top} style={{ ...handleStyles, ...(addEdgeMode ? { display: 'block' } : { display: 'none' }) }} />
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

interface AttributeProps extends AttributeType { }

class Attribute extends React.Component<AttributeProps, object> {

  getVisibility() {
    if (this.props.visibility === "public") {
      return "+";
    } else if (this.props.visibility === "private") {
      return "-";
    } else if (this.props.visibility === "protected") {
      return "#";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="attribute">
        <span>{this.getVisibility() + (this.props.name || '') + ': ' + (this.props.type || '')}</span>
      </div>
    );
  }
}

interface MethodProps extends MethodType { }

class Method extends React.Component<MethodProps, object> {

  getVisibility() {
    if (this.props.visibility === "public") {
      return "+";
    } else if (this.props.visibility === "private") {
      return "-";
    } else if (this.props.visibility === "protected") {
      return "#";
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="method">
        <span>{this.getVisibility() + (this.props.name || '') + '('}</span>
        <div className='parameters'>
          {this.props.parameters && this.props.parameters.map((parameter, i) => {
            return <span key={i}>{parameter.name}: {parameter.type}{i < (this.props.parameters?.length ?? 0) - 1 ? ', ' : ''}</span>;
          })}

        </div>
        <span>{'): ' + (this.props.return || '')}</span>
      </div>
    );
  }
}

export default ClassNode;
