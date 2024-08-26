import React from "react";
import { Route, Routes } from "react-router-dom";
import MapComponent from "./MapComponent";
import ReactFlowComponent from "./ReactFlowComponent";
import { ReactFlowComponent2 } from "./ReactFlowComponent2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MapComponent />} />
        <Route path="/flow" element={<ReactFlowComponent />} />
        <Route path="/flow2" element={<ReactFlowComponent2 />} />
      </Routes>
    </>
  );
}

export default App;
