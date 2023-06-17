import { Position, Node, Edge, MarkerType } from "reactflow";
import ClassNode from "./ClassNode";
import { iData } from "./Flow";

interface ClassNode extends Node {
  addOutgoingEdge(edge: Edge): void;
  addIncomingEdge(edge: Edge): void;
}

interface Point {
  x: number;
  y: number;
}

type SmoothStepEdgeType = "smoothstep";

function getNodeIntersection(
  intersectionNode: Node | ClassNode,
  targetNode: Node | ClassNode
): Point {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    positionAbsolute: intersectionNodePosition,
  } = intersectionNode || {};

  const targetPosition = targetNode?.positionAbsolute;

  const w = intersectionNodeWidth ? intersectionNodeWidth / 2 : 0;
  const h = intersectionNodeHeight ? intersectionNodeHeight / 2 : 0;

  const x2 = intersectionNodePosition?.x ? intersectionNodePosition?.x + w : 0;
  const y2 = intersectionNodePosition?.y ? intersectionNodePosition?.y + h : 0;
  const x1 = targetPosition?.x ? targetPosition?.x + w : 0;
  const y1 = targetPosition?.y ? targetPosition?.y + h : 0;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

function getEdgePosition(node: Node, intersectionPoint: Point) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = n.x ?? 0;
  const ny = n.y ?? 0;
  const nWidth = n.width ?? 0;
  const nHeight = n.height ?? 0;
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + nWidth - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= ny + nHeight - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

export function getEdgeParams(source: Node, target: Node) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export function addEdgeToNodes(source: Node, target: Node) {
  const sourceNode = source as ClassNode;
  const targetNode = target as ClassNode;

  const edge: Edge = {
    id: `${sourceNode.id}-${targetNode.id}`,
    source: sourceNode.id,
    target: targetNode.id,
    type: "smoothstep" as SmoothStepEdgeType,
    animated: true,
    markerEnd: {
      type: MarkerType.Arrow,
    },
    label: "",
    labelStyle: { fill: "white", fontWeight: 700 },
    labelBgStyle: { fill: "#333" },
  };

  return edge;
}

export function createNodesAndEdges(Data: iData) {
  const nodes: Node[] = Data.nodes;
  const edges: Edge[] = Data.edges;
 
  return { nodes, edges };
}