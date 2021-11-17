import { TextField } from "@mui/material";

export interface MomentInputProps {
  moment?: number;
  onMomentChange: (moment?: number) => void;
}

export function MomentInput({ moment, onMomentChange }: MomentInputProps) {
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    const moment = value ? Number(value) : undefined;
    onMomentChange(moment);
  };

  return (
    <TextField
      label="Time moment"
      type="number"
      value={moment}
      onChange={onChange}
      error={!moment || moment < 0}
    />
  );
}
