import React from "react";
import Dashboard from "./components/Dashboard";
import KanbanLanding from "./KanbanLanding";

function App() {
  return (
    <KanbanLanding>
      <Dashboard />
    </KanbanLanding>
  );
}

export default App;
