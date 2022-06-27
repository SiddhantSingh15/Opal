import React, {useState} from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function UserType({handleChange}) {
  const [type, setType] = useState('');

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" size="small">User Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={type}
        label="User Type"
        onChange={e => {setType(e.target.value); handleChange()}}
        sx={{height: "40px"}}
      >
        <MenuItem value='Intern'>Intern</MenuItem>
        <MenuItem value='Lawyer'>Lawyer</MenuItem>
        <MenuItem value='Senior'>Senior Associate</MenuItem>
        <MenuItem value='Admin'>Admin</MenuItem>
      </Select>
    </FormControl>
  );
}
