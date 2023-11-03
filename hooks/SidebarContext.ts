import { createContext } from "react"

const SidebarContext = createContext({
  isOpen: true,
  setIsOpen: (value: boolean) => {},
})

export default SidebarContext
