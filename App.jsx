import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import ReactFlowComponent from "./src/ReactFlowComponent";
// import ReactFlowComponentOrganised from "./src/ReactFlowComponentOrganised";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <ReactFlowComponent />
        {/* <ReactFlowComponentOrganised /> */}
      </ReactFlowProvider>
    </>
  );
}

export default App;
