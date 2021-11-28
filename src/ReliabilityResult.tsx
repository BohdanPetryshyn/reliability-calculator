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
    /* 1 */ -(l[0] + l[1] + l[2] + l[3] + l[4]) * P[0],
    /* 2 */ l[0] * P[0] - (l[1] + l[2] + l[3] + l[4]) * P[1],
    /* 3 */ l[1] * P[0] - (l[0] + l[2] + l[3] + l[4]) * P[2],
    /* 4 */ l[2] * P[0] - (l[0] + l[1] + l[3] + l[4]) * P[3],
    /* 5 */ l[3] * P[0] - (l[0] + l[1] + l[2] + l[4]) * P[4],
    /* 6 */ l[4] * P[0],
    /* 7 */ l[1] * P[1] + l[0] * P[2] - (l[2] + l[3] + l[4]) * P[6],
    /* 8 */ l[2] * P[1] + l[0] * P[3],
    /* 9 */ l[3] * P[1] + l[0] * P[4] - (l[1] + l[2] + l[4]) * P[8],
    /* 10 */ l[4] * P[1],
    /* 11 */ l[2] * P[2] + l[1] * P[3] - (l[0] + l[3] + l[4]) * P[10],
    /* 12 */ l[3] * P[2] + l[1] * P[4],
    /* 13 */ l[4] * P[2],
    /* 14 */ l[3] * P[3] + l[2] * P[4] - (l[0] + l[1] + l[4]) * P[13],
    /* 15 */ l[4] * P[3],
    /* 16 */ l[4] * P[4],
    /* 17 */ l[2] * P[6] + l[0] * P[10],
    /* 18 */ l[3] * P[6] + l[1] * P[8],
    /* 19 */ l[4] * P[6],
    /* 20 */ l[2] * P[8] + l[0] * P[13],
    /* 21 */ l[4] * P[8],
    /* 22 */ l[3] * P[10] + l[1] * P[13],
    /* 23 */ l[4] * P[10],
    /* 24 */ l[4] * P[13],
  ];

  const probabilitiesByMoment = rungeKutta(
    equations,
    INITIAL_PROBABILITIES,
    [0, moment || 1],
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
        <Typography variant="h6">Reliabilities</Typography>
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
