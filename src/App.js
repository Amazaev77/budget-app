import React from "react";
import { Container } from "@material-ui/core";
import LabTabs from "./components/LabTabs";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <LabTabs />
      </Container>
    </div>
  );
}

export default App;
