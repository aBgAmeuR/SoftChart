"use client";
import ReactFlow, { Controls, Background, addEdge, Edge, Node, NodeTypes, EdgeTypes, useEdgesState, useNodesState, MarkerType, Connection, ReactFlowProvider, ReactFlowInstance } from 'reactflow';
import ClassNode from './ClassNode';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'reactflow/dist/style.css';
import { createNodesAndEdges } from './utils';
import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSideBar';

export interface iData {
  nodes: Node[];
  edges: Edge[];
}

const Data: iData = {
  nodes: [
    {
      id: 'n1',
      type: 'classNode',
      position: { x: 250, y: 10 },
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
      type: 'classNode',
      position: { x: 550, y: 50 },
      data: {
        name: 'Test 2',
        type: 'class',
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
      type: 'classNode',
      position: { x: 750, y: 150 },
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
      markerEnd: { type: MarkerType.Arrow },
      data: {
        type: 'association',
        path: 'bezierz'
      }
    }
  ]
};

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(Data);

const edgeTypes: EdgeTypes = { floating: FloatingEdge };
const nodeTypes: NodeTypes = { classNode: ClassNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [addingEdge, setAddingEdge] = useState(false);
  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [shiftPressed, setShiftPressed] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<unknown, unknown> | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);


  const onConnect = useCallback((params: Edge | Connection) =>
    setEdges((eds) =>
      addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
    ),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (addingEdge) {
      if (sourceNode) {
        setEdges((edges) => addEdge(
          {
            id: `edge-${Date.now()}`,
            source: sourceNode,
            target: node.id,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow }
          },
          edges
        ));
        if (!shiftPressed) setAddingEdge(false);
        setSourceNode(null);
      } else {
        setSourceNode(node.id);
      }
    }
    setSelectedNode(node);
  }, [addingEdge, sourceNode, setEdges, shiftPressed]);


  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'Shift') {
        setShiftPressed(true)
      }
    };

    const handleKeyUp = (event: { key: string; }) => {
      if (event.key === 'Shift') {
        setShiftPressed(false)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow/type');
    const data = JSON.parse(event.dataTransfer.getData('application/reactflow/data'));

    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance?.project({
      x: event.clientX - (reactFlowBounds?.left || 0) - window.innerWidth * 0.15,
      y: event.clientY - (reactFlowBounds?.top || 0),
    });

    const newNode = {
      id: `edge-${Date.now()}`,
      type,
      position: position || { x: 0, y: 0 },
      data,
    };

    setNodes((nds) => nds.concat(newNode));
  },
    [reactFlowInstance, setNodes]
  );

  const updateNode = useCallback((updatedNode: Node) => {
    setNodes((prevNodes) => prevNodes.map((node) => node.id === updatedNode.id ? updatedNode : node));
  }, [setNodes]);

  return (
    <div ref={reactFlowWrapper} style={{ height: '100vh' }}>
      <ReactFlowProvider>
        <div id="FlowProvider">
          <LeftSidebar setAddingEdge={setAddingEdge} />
          <div id="ReactFlow">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onConnect={onConnect}
              fitView
              edgeTypes={edgeTypes}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              connectionLineComponent={FloatingConnectionLine}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapGrid={[10, 10]}
              snapToGrid={true}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          <RightSidebar node={selectedNode} updateNode={updateNode} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
