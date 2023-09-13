import { EdgeProps, getStraightPath, useStore, getBezierPath, getSmoothStepPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';
import { useCallback } from 'react';
import { getEdgeParams } from './utils';

function EdgeLabel({ transform, label }: { transform: string; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'transparent',
        padding: 10,
        color: '#ff5050',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

function FloatingEdge({ id, source, target, markerEnd, markerStart, style, data }: EdgeProps) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  let edgePath = '', labelX = 0, labelY = 0, sourceX = sx, sourceY = sy, targetX = tx, targetY = ty;
  if (data?.path === 'bezier') {
    [edgePath, labelX, labelY] = getBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      targetX: tx,
      targetY: ty,
    });
  } else {
    [edgePath, labelX, labelY] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
  }

  const getTranslateTarget = (sourceX: number, sourceY: number, targetX: number, targetY: number) => {
    if (targetX > sourceX && targetY > sourceY) {
      // if ((targetX - sourceX) < 200) 
      //   return "translate(0%, -100%)"
      return "translate(-100%, 0%)"
    } else if (targetX < sourceX && targetY > sourceY) {
      return "translate(0%, -100%)"
    } else if (targetX > sourceX && targetY < sourceY) {
      return "translate(-100%, 0%)"
    } else return ""
  };

  const getTranslateSource = (sourceX: number, sourceY: number, targetX: number, targetY: number) => {
    if (targetX < sourceX && targetY > sourceY) {
      return "translate(-100%, 0%)"
    } else if (targetX < sourceX && targetY < sourceY) {
      if ((sourceY - targetY) < 100)
        return "translate(-100%, 0%)"
      return "translate(-100%, -100%)"
    } else if (targetX > sourceX && targetY < sourceY) {
      return "translate(0%, -100%)"
    } else return ""
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} markerStart={markerStart} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 14,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.label}
        </div>
        {data.startLabel && (
          <EdgeLabel
            transform={`${getTranslateSource(sourceX, sourceY, targetX, targetY)} translate(${sourceX}px,${sourceY}px)`}
            label={data.startLabel}
          />
        )}
        {data.endLabel && (
          <EdgeLabel
            transform={`${getTranslateTarget(sourceX, sourceY, targetX, targetY)} translate(${targetX}px,${targetY}px)`}
            label={data.endLabel}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
