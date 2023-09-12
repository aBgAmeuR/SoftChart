import { use, useCallback, useEffect, useState } from "react"
import {
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyNodeChanges,
} from "reactflow"

import { initialDataState } from "@/types/ClassDiagram"

import Class from "./Class"

export type NodesState = {
  nodes: Node[]
  edges: Edge[]
  addNode: (node: Node) => void
  editNode: (id: string, newData: any) => void
  deleteNode: (id: string) => void
  setEdgeAnimationState: (id: string, state: boolean) => void
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addEdgeMode: boolean
  setAddEdgeMode: (state: boolean) => void
  editEdge: (id: string, newData: any) => void
  deleteEdge: (id: string) => void
}

export declare namespace Nodes {
  export { Class }
}

export namespace Nodes {
  Nodes.Class = Class

  export const nodeTypes = {
    Class: Nodes.Class,
  }

  export function useNodesState(Data: initialDataState): NodesState {
    const { nodes: initialNodes, edges: initialEdges } = Data

    const [nodes, setNodes] = useState<Node[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)

    const [addEdgeMode, setAddEdgeMode] = useState(false)
    const [shiftPressed, setShiftPressed] = useState(false)

    const addNode = useCallback(
      (node: Node) => {
        setNodes([...nodes, node])
      },
      [nodes, setNodes]
    )

    const editNode = useCallback((id: string, newData: any) => {
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            }
          }
          return node
        })
      })
    }, [])

    const deleteNode = useCallback(
      (id: string) => {
        setNodes(nodes.filter((node) => node.id !== id))
        setEdges(
          edges.filter((edge) => edge.source !== id && edge.target !== id)
        )
      },
      [nodes, edges]
    )

    const setEdgeAnimationState = useCallback(
      (id: string, state: boolean) => {
        setEdges(
          edges.map((edge) => {
            if (edge.id === id) {
              return {
                ...edge,
                animated: state,
              }
            }
            return edge
          })
        )
      },
      [edges]
    )

    const onNodesChange = useCallback(
      (nodeChanges: NodeChange[]) => {
        setNodes((nodes) => applyNodeChanges(nodeChanges, nodes))
      },
      [setNodes]
    )

    const onEdgesChange = useCallback(
      (edgesChange: EdgeChange[]) => {
        setEdges(edges)
      },
      [edges]
    )

    const onConnect = useCallback(
      (params: Edge | Connection) => {
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              type: "floating",
              markerEnd: { type: MarkerType.Arrow },
            },
            eds
          )
        )
        if (!shiftPressed) {
          setAddEdgeMode(false)
        }
      },
      [shiftPressed]
    )

    const editEdge = useCallback((id: string, newData: any) => {
      setEdges((edges) => {
        return edges.map((edge) => {
          if (edge.id === id) {
            return {
              ...edge,
              data: {
                ...edge.data,
                ...newData,
              },
            }
          }
          return edge
        })
      })
    }, [])

    const deleteEdge = useCallback(
      (id: string) => {
        setEdges(edges.filter((edge) => edge.id !== id))
      },
      [edges]
    )
    
    useEffect(() => {
      const resNodes = nodes.map((node) => {
        if (node.data.addEdgeMode !== addEdgeMode) {
          return {
            ...node,
            data: {
              ...node.data,
              addEdgeMode: addEdgeMode,
            },
          }
        }
        return node
      })
      if (JSON.stringify(resNodes) !== JSON.stringify(nodes)) {
        setNodes(resNodes)
      }
    }, [nodes, addEdgeMode])

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Shift") {
          setShiftPressed(true)
        }
        if (e.key === "Escape") {
          setAddEdgeMode(false)
        }
      }
      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Shift") {
          setShiftPressed(false)
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("keyup", handleKeyUp)
      }
    }, [])

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
      setAddEdgeMode,
      editEdge,
      deleteEdge,
    }
  }
}
