import { Edge } from "reactflow";
import FloatingEdge from "./FloatingEdge";

export type NodesState = {
  edges: Edge[];
};

export declare namespace Edges {
  export {
    FloatingEdge,
  };
}

export namespace Edges {
  Edges.FloatingEdge = FloatingEdge;

  export const edgesTypes = {
    floating: Edges.FloatingEdge
  };

}