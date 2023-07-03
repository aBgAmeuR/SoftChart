import { useCallback, useEffect, useState } from "react";
import Class from "./Class";
import { Connection, Edge, Node, MarkerType, addEdge, NodeChange, applyNodeChanges, OnNodesChange, OnEdgesChange, OnConnect, EdgeChange } from "reactflow";
import { initialDataState } from "@/types/ClassDiagram";

export type NodesState = {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  editNode: (id: string, newData: any) => void;
  deleteNode: (id: string) => void;
  setEdgeAnimationState: (id: string, state: boolean) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addEdgeMode: boolean;
  setAddEdgeMode: (state: boolean) => void;
};

export declare namespace Nodes {
  export {
    Class,
  };
}

export namespace Nodes {
  Nodes.Class = Class;

  export const nodeTypes = {
    Class: Nodes.Class
  };

  export function useNodesState(Data: initialDataState): NodesState {
    const { nodes: initialNodes, edges: initialEdges } = Data;

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const addNode = useCallback((node: Node) => {
      setNodes([...nodes, node]);
    }, [nodes, setNodes]);

    const editNode = useCallback((id: string, newData: any) => {
      setNodes(
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );
    }, [nodes]);

    const deleteNode = useCallback((id: string) => {
      setNodes(nodes.filter((node) => node.id !== id));
      setEdges(edges.filter((edge) => edge.source !== id && edge.target !== id));
    }, [nodes, edges]);

    const setEdgeAnimationState = useCallback((id: string, state: boolean) => {
      setEdges(
        edges.map((edge) => {
          if (edge.id === id) {
            return {
              ...edge,
              animated: state,
            };
          }
          return edge;
        })
      );
    }, [edges]);

    const onNodesChange = useCallback((nodeChanges: NodeChange[]) => {
      setNodes((nodes) => applyNodeChanges(nodeChanges, nodes));
    }, [setNodes]);

    const onEdgesChange = useCallback((edgesChange: EdgeChange[]) => {
      setEdges(edges);
    }, [edges]);

    const onConnect = useCallback((params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
      [setEdges]
    );

    const [addEdgeMode, setAddEdgeMode] = useState(false);

    useEffect(() => {
      setNodes(nodes.map((node) => ({
          ...node,
        data: {
          ...node.data,
          addEdgeMode: addEdgeMode,
        }
        })));
    }, [nodes, addEdgeMode]);

    return {
      nodes,
      edges,
      addNode,
      editNode,
      deleteNode,
      setEdgeAnimationState,
      onConnect,
      onNodesChange,
      onEdgesChange,
      addEdgeMode,
      setAddEdgeMode
    };
  }
}