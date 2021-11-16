import React from "react";
import { Box, Container } from "@mui/material";
import { LambdasInput } from "./LambdasInput";

function App() {
  const [lambdas, setLambdas] = React.useState<number[]>([
    5 * 10 ** -4,
    4 * 10 ** -4,
    3 * 10 ** -4,
    2.5 * 10 ** -4,
    5 * 10 ** -4,
  ]);

  return (
    <Container>
      <Box p={2}>
        <LambdasInput lambdas={lambdas} onLambdasChange={setLambdas} />
      </Box>
    </Container>
  );
}

export default App;
