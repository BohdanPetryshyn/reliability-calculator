import React from "react";
import { Grid, TextField } from "@mui/material";

export interface LambdasInputProps {
  lambdas: number[];
  onLambdasChange: (lambdas: number[]) => void;
}

export function LambdasInput({ lambdas, onLambdasChange }: LambdasInputProps) {
  const getChangeHandler =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onLambdasChange([
        ...lambdas.slice(0, index),
        Number(event.target.value),
        ...lambdas.slice(index + 1),
      ]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="Lambda 1"
            type="number"
            value={[lambdas[0]]}
            onChange={getChangeHandler(0)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Lambda 2"
            type="number"
            value={[lambdas[1]]}
            onChange={getChangeHandler(1)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Lambda 3"
            type="number"
            value={[lambdas[2]]}
            onChange={getChangeHandler(2)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Lambda 4"
            type="number"
            value={[lambdas[3]]}
            onChange={getChangeHandler(3)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Lambda 5"
            type="number"
            value={[lambdas[4]]}
            onChange={getChangeHandler(4)}
          />
        </Grid>
      </Grid>
    </>
  );
}
