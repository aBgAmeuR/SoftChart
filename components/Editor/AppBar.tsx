import { Save } from "lucide-react";

export function AppBar() {
  return (
    <div className="flex h-14 w-screen flex-row items-center justify-between border-b border-white/5 bg-neutral-900 p-2 px-4">
      <div className="w-1/3"></div>
      <div className="flex w-1/3 items-center justify-center">
        <input
          className="w-min rounded bg-transparent px-2 py-1 text-center text-sm text-white outline-none duration-100 hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none"
          placeholder="project name"
          defaultValue={"Untitled"}
        />
      </div>
      <div className="flex w-1/3 flex-row items-center justify-end">
        <button className="rounded bg-neutral-800 p-2 text-neutral-400">
          <Save size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}