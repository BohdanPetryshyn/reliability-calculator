import { Grid, Typography } from "@mui/material";
import rungeKutta from "runge-kutta";

const INITIAL_PROBABILITIES = [1, ...new Array(23).fill(0)];
const FAILURE_STATES = [
  5, 7, 9, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 21, 23, 24,
];

export interface ReliabilityResultProps {
  lambdas: number[];
  moment: number;
}

export function ReliabilityResult({
  lambdas: l,
  moment,
}: ReliabilityResultProps) {
  const equations = (t: number, P: number[]) => [
    /* P[0]  = */ -(l[0] + l[1] + l[2] + l[3] + l[4]) * P[0],
    /* P[1]  = */ l[0] * P[0] - (l[1] + l[2] + l[3] + l[4]) * P[1],
    /* P[2]  = */ l[1] * P[0] - (l[0] + l[2] + l[3] + l[4]) * P[2],
    /* P[3]  = */ l[2] * P[0] - (l[0] + l[1] + l[3] + l[4]) * P[3],
    /* P[4]  = */ l[3] * P[0] - (l[0] + l[1] + l[2] + l[4]) * P[4],
    /* P[5]  = */ l[4] * P[0],
    /* P[6]  = */ l[1] * P[1] + l[0] * P[2] - (l[2] + l[3] + l[4]) * P[6],
    /* P[7]  = */ l[2] * P[1] + l[0] * P[3],
    /* P[8]  = */ l[3] * P[1] + l[0] * P[4] - (l[1] + l[2] + l[4]) * P[8],
    /* P[9]  = */ l[4] * P[1] + l[0] * P[5],
    /* P[10] = */ l[2] * P[2] + l[1] * P[3] - (l[1] + l[3] + l[4]) * P[10],
    /* P[11] = */ l[3] * P[2] + l[1] * P[4],
    /* P[12] = */ l[4] * P[2] + l[1] * P[5],
    /* P[13] = */ l[3] * P[3] + l[2] * P[4] - (l[0] + l[1] + l[4]) * P[13],
    /* P[14] = */ l[4] * P[3] + l[2] * P[5],
    /* P[15] = */ l[4] * P[4] + l[3] * P[5],
    /* P[16] = */ l[2] * P[6] + l[2] * P[10],
    /* P[17] = */ l[3] * P[6] + l[1] * P[8],
    /* P[18] = */ l[4] * P[6],
    /* P[19] = */ l[2] * P[8] + l[0] * P[13],
    /* P[20] = */ l[4] * P[8],
    /* P[21] = */ l[3] * P[10] + l[1] * P[13],
    /* P[22] = */ l[4] * P[10],
    /* P[23] = */ l[4] * P[13],
  ];

  const probabilitiesByMoment = rungeKutta(
    equations,
    INITIAL_PROBABILITIES,
    [0, moment],
    1
  ) as number[][];
  const probabilities = probabilitiesByMoment[moment];

  const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);

  const failureProbability = probabilities
    .filter((p, i) => FAILURE_STATES.includes(i))
    .reduce((sum, p) => sum + p, 0);
  const serviceabilityProbability = totalProbability - failureProbability;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">Reliabilities:</Typography>
        {probabilities.map((p, i) => (
          <Typography variant="body1" key={i}>{`P[${i}] = ${p}`}</Typography>
        ))}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Failure probability</Typography>
        <Typography variant="body1">{failureProbability}</Typography>
        <Typography variant="h6">Serviceability probability</Typography>
        <Typography variant="body1">{serviceabilityProbability}</Typography>
        <Typography variant="h6">Total probability</Typography>
        <Typography variant="body1">{totalProbability}</Typography>
      </Grid>
    </Grid>
  );
}
