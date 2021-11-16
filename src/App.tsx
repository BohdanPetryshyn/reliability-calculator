import React from "react";
import { Container, Grid } from "@mui/material";
import { LambdasInput } from "./LambdasInput";
import { ReliabilityResult } from "./ReliabilityResult";
import { MomentInput } from "./MomentInput";

function App() {
  const [lambdas, setLambdas] = React.useState<number[]>([
    5 * 10 ** -4,
    4 * 10 ** -4,
    3 * 10 ** -4,
    2.5 * 10 ** -4,
    5 * 10 ** -4,
  ]);
  const [moment, setMoment] = React.useState(1);

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
