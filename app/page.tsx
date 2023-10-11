"use client";

import { ReactFlowProvider } from "reactflow";
import { AppBar } from "@/components/Editor/AppBar";
import { Editor } from "@/components/Editor/Editor";

export default function EditPage() {
  return (
    <>
      <ReactFlowProvider>
        <AppBar />
        <Editor />
      </ReactFlowProvider>   
    </>
  )
}