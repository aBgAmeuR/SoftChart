import {
  ConnectionLineType,
  MarkerType,
} from "@reactflow/core";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { Bar } from "./Bar";
import { Nodes } from "./Nodes";
import { initialDataState } from "@/types/ClassDiagram";
import { Edges } from "./Edges";
import ConnectionLine from "./Edges/ConnectionLine";
import { OptionBar } from "./OptionBar";
import { useState } from "react";

const Data: initialDataState = {
  nodes: [
    {
      id: 'n1',
      type: 'Class',
      position: { x: 150, y: 80 },
      data: {
        name: 'Test',
        type: 'Class',
        attributes: [
          {
            name: 'test',
            type: 'string',
            visibility: 'public'
          }
        ],
        methods: [
          {
            name: 'test',
            parameters: [
              {
                name: 'test',
                type: 'string'
              },
              {
                name: 'test2',
                type: 'int'
              }
            ],
            return: 'void',
            visibility: 'public'
          }
        ]
      }
    },
    {
      id: 'n2',
      type: 'Class',
      position: { x: 550, y: 50 },
      data: {
        name: 'Test 2',
        type: 'Class',
        attributes: [
          {
            name: 'test',
            type: 'string',
            visibility: 'public'
          }
        ],
        methods: [
          {
            name: 'test',
            parameters: [
              {
                name: 'test',
                type: 'string'
              },
            ],
            return: 'void',
            visibility: 'public'
          }
        ]
      },
    },
    {
      id: 'n3',
      type: 'Class',
      position: { x: 500, y: 250 },
      data: {
        name: 'Test 3',
        type: 'interface',
        attributes: [
          {
            name: 'test',
            type: 'string',
            visibility: 'public'
          }
        ],
        methods: [
          {
            name: 'test',
            parameters: [],
            return: 'void',
            visibility: 'public'
          }
        ]
      }
    },
  ],
  edges: [
    {
      id: '1to2',
      source: 'n1',
      target: 'n2',
      type: 'floating',
      markerEnd: { type: MarkerType.Arrow, strokeWidth: 2 },
      data: {
        label: 'test2',
        path: 'beziera',
        startLabel: '1',
      },
      style: { strokeWidth: 2 },
    },
    {
      id: '1to3',
      source: 'n1',
      target: 'n3',
      type: 'floating',
      markerStart: { type: MarkerType.ArrowClosed, strokeWidth: 2 },
      markerEnd: { type: MarkerType.Arrow, strokeWidth: 2 },
      data: {
        label: 'test',
        path: 'bezier',
        startLabel: '2',
        endLabel: '1.n',
      },
      style: { strokeWidth: 2 },
    }
  ]
};

export function Editor() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, addEdgeMode, setAddEdgeMode, editNode, editEdge, deleteEdge } =
    Nodes.useNodesState(Data);
  const [bgVariant, setBgVariant] = useState<BackgroundVariant>(BackgroundVariant.Dots);

  return (
    <div className="flex h-[calc(100vh_-_56px)] flex-row ">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={Nodes.nodeTypes}
        edgeTypes={Edges.edgesTypes}
        proOptions={{
          hideAttribution: true
        }}
        snapGrid={[10, 10]}
        snapToGrid={true}
        connectionLineStyle={{
          stroke: "#3b3b3b",
          strokeWidth: 2,
        }}
        connectionLineComponent={ConnectionLine}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Background variant={bgVariant} />
        <Controls />
      </ReactFlow>
      <Bar
        onCreateNode={(newNode) => {
          addNode({
            ...newNode,
            data: {
              ...newNode.data,
            },
            id: Math.random().toString(),
          });
        }}
        addEdgeMode={addEdgeMode}
        setAddEdgeMode={setAddEdgeMode}
      />
      <OptionBar editNode={editNode} editEdge={editEdge} deleteEdge={deleteEdge} setBgVariant={setBgVariant} />
    </div>
  );
}