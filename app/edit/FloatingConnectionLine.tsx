import { Position, getBezierPath, Node as ReactFlowNode, ConnectionLineComponentProps } from 'reactflow';
import { getEdgeParams } from './utils';

interface FloatingConnectionLineProps {
  toX: number;
  toY: number;
  fromPosition: Position;
  toPosition: Position;
  fromNode?: ReactFlowNode | null;
}

const FloatingConnectionLine: React.FC<FloatingConnectionLineProps> = ({ toX, toY, fromPosition, toPosition, fromNode }) => {
  if (!fromNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    position: { x: toX, y: toY },
    data: {}
  };

  const { sx, sy } = getEdgeParams(fromNode, targetNode);
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
    targetX: toX,
    targetY: toY
  });

  return (
    <>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </>
  );
};

export default FloatingConnectionLine as React.ComponentType<ConnectionLineComponentProps>;
