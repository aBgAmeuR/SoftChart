"use client"

import React, { useState } from "react"
import { ReactFlowProvider } from "reactflow"

import SidebarContext from "@/hooks/SidebarContext"
import { AppBar } from "@/components/Editor/AppBar"
import { Editor } from "@/components/Editor/Editor"

export default function EditPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <>
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        <ReactFlowProvider>
          <AppBar />
          <Editor />
        </ReactFlowProvider>
      </SidebarContext.Provider>
    </>
  )
}
