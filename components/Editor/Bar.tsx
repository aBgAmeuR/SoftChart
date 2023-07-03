import {
  ImagePlus,
} from "lucide-react";
import { useState } from "react";
import { useReactFlow } from "reactflow";

export type Bar = {
  onCreateNode: (newNode: { type: string; data: any; position: any }) => void;
  addEdgeMode: boolean;
  setAddEdgeMode: (state: boolean) => void;
};

export function Bar({ onCreateNode, addEdgeMode, setAddEdgeMode }: Bar) {
  const flow = useReactFlow();


  return (
    <div className="absolute left-[15px] top-[4.75rem] flex flex-col overflow-hidden rounded bg-white">
      <Button
        onClick={() =>
          onCreateNode({
            type: 'Class',
            data: {
              name: 'Class',
              type: 'Class',
              attributes: [],
              methods: []
            },
            position: flow.project({
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            }),
          })
        }
      >
        <ImagePlus size={18} strokeWidth={2} />
      </Button>
      <Button
        active={addEdgeMode}
        onClick={() => setAddEdgeMode(!addEdgeMode)}
      >
        <ImagePlus size={18} strokeWidth={2} />
      </Button>
    </div>
  );
}

function Button({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`border-t border-white/10 p-2 duration-200 first-of-type:border-t-transparent hover:bg-white/10 active:bg-white/20 ${active && "bg-black/10 text-indigo-400"
        }`}
      onClick={onClick ?? undefined}
    >
      {children}
    </button>
  );
}