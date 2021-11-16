import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { LambdasInput } from "./LambdasInput";
import { ReliabilityResult } from "./ReliabilityResult";

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
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <LambdasInput lambdas={lambdas} onLambdasChange={setLambdas} />
        </Grid>
        <Grid item xs={12}>
          <ReliabilityResult lambdas={lambdas} moment={10} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
