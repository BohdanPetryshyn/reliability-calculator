import React from "react";
import { Grid, TextField } from "@mui/material";

export interface LambdasInputProps {
  lambdas: number[];
  onLambdasChange: (lambdas: number[]) => void;
}

export function LambdasInput({ lambdas, onLambdasChange }: LambdasInputProps) {
  const getChangeHandler =
    (index: number) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const numberValue = Number(event.target.value);
      const normalizedValue = numberValue >= 0 ? numberValue : 0;

      return onLambdasChange([
        ...lambdas.slice(0, index),
        normalizedValue,
        ...lambdas.slice(index + 1),
      ]);
    };

  const renderLambda = (index: number) => (
    <TextField
      label={`Lambda ${index}`}
      type="number"
      value={lambdas[index]}
      onChange={getChangeHandler(index)}
    />
  );

  return (
    <>
      <Grid container spacing={2}>
        {[...new Array(5).keys()].map((i) => (
          <Grid item key={i}>
            {renderLambda(i)}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
