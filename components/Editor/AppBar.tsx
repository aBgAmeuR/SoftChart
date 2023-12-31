import { useContext } from "react"
import { Layout, Save } from "lucide-react"

import { siteConfig } from "@/config/site"
import SidebarContext from "@/hooks/SidebarContext"

import { Icons } from "../icons"
import { ThemeToggle } from "../theme-toggle"

export function AppBar() {
  let { isOpen, setIsOpen } = useContext(SidebarContext)

  return (
    <div className="flex h-14 w-screen flex-row items-center justify-between border-b border-neutral-100 bg-white p-2 px-4 dark:border-white/5 dark:bg-neutral-900">
      <div className="w-1/3">
        <div className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </div>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        <input
          className="w-min rounded bg-transparent px-2 py-1 text-center text-sm outline-none duration-100 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          placeholder="project name"
          defaultValue={"Untitled"}
        />
      </div>
      <div className="flex w-1/3 flex-row items-center justify-end gap-2">
        {/* <button className="rounded bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
          <Save size={18} strokeWidth={2} />
        </button> */}
        <button
          className="rounded bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400"
          onClick={(e) => setIsOpen(!isOpen)}
        >
          <Layout size={18} strokeWidth={2} />
        </button>
        <ThemeToggle />
      </div>
    </div>
  )
}
