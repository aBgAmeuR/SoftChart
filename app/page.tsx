"use client";

import React from "react";
import { ReactFlowProvider } from "reactflow";
import { AppBar } from "@/components/Editor/AppBar";
import { Editor } from "@/components/Editor/Editor";
import { createContext, useState } from 'react';

interface AppContextInterface {
  isOpen: boolean;
  setIsOpen: (value: boolean) => boolean;
}
export const ContextDefaultValue: AppContextInterface = {
  isOpen: true,
  setIsOpen: () => true
}
export const SidebarContext = createContext(ContextDefaultValue);

export default function EditPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const value = { isOpen, setIsOpen }

  return (
    <>
      <SidebarContext.Provider value={value}>
        <ReactFlowProvider>
          <AppBar />
          <Editor />
        </ReactFlowProvider>
      </SidebarContext.Provider>
    </>
  )
}