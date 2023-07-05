import { PanelTop, Spline } from "lucide-react"
import { useReactFlow } from "reactflow"
import { useEffect } from "react"

export type Bar = {
  onCreateNode: (newNode: { type: string; data: any; position: any }) => void
  addEdgeMode: boolean
  setAddEdgeMode: (state: boolean) => void
}

export function Bar({ onCreateNode, addEdgeMode, setAddEdgeMode }: Bar) {
  const flow = useReactFlow()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        // Escape key was pressed
        setAddEdgeMode(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [setAddEdgeMode])

  return (
    <div className="absolute left-[15px] top-[4.75rem] flex flex-col overflow-hidden rounded bg-white drop-shadow-sm dark:bg-neutral-800">
      <Button
        onClick={() =>
          onCreateNode({
            type: "Class",
            data: {
              name: "Class",
              type: "Class",
              attributes: [],
              methods: [],
            },
            position: flow.project({
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            }),
          })
        }
      >
        <PanelTop size={18} strokeWidth={2} />
      </Button>
      <Button active={addEdgeMode} onClick={() => setAddEdgeMode(!addEdgeMode)}>
        <Spline size={18} strokeWidth={2} />
      </Button>
    </div>
  )
}

function Button({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={`border-t border-neutral-900/10 p-2 duration-200 first-of-type:border-t-transparent hover:bg-white/10 active:bg-white/20 dark:border-white/10 ${
        active && "bg-black/10 text-indigo-400 "
      }`}
      onClick={onClick ?? undefined}
    >
      {children}
    </button>
  )
}
