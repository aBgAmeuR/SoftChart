import { Edge, Node } from "reactflow";

export interface initialDataState {
  nodes: Node[];
  edges: Edge[];
}

export type Class = {
  name: string;
  type: string;
  attributes: Attribute[];
  methods: Method[];
  addEdgeMode? : boolean;
};

export type Attribute = {
  name: string,
  type: string,
  visibility?: string
};

export type Method = {
  name: string,
  visibility: string,
  return: string,
  parameters?: MethodParameters[]
};

export type MethodParameters = {
  name: string,
  type: string
};