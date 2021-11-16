import { TextField } from "@mui/material";

export interface MomentInputProps {
  moment: number;
  onMomentChange: (moment: number) => void;
}

export function MomentInput({ moment, onMomentChange }: MomentInputProps) {
  return (
    <TextField
      label="Time moment"
      type="number"
      value={moment}
      onChange={(event) => onMomentChange(Number(event.target.value))}
    />
  );
}
