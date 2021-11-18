import React from "react";
import { Container, Grid } from "@mui/material";
import { LambdasInput } from "./LambdasInput";
import { ReliabilityResult } from "./ReliabilityResult";
import { MomentInput } from "./MomentInput";

function App() {
  const [lambdas, setLambdas] = React.useState<number[]>([
    0.0005, 0.0004, 0.0003, 0.00025, 0.0005,
  ]);
  const [moment, setMoment] = React.useState<number>(1);

  return (
    <Container>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <LambdasInput lambdas={lambdas} onLambdasChange={setLambdas} />
        </Grid>
        <Grid item xs={12}>
          <MomentInput moment={moment} onMomentChange={setMoment} />
        </Grid>
        <Grid item xs={12}>
          <ReliabilityResult lambdas={lambdas} moment={moment} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
