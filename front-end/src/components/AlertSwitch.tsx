import { Box, Checkbox, Switch, useControllableState } from "@chakra-ui/react";
import { useState } from "react";

export const AlertSwitch = () => {
  const [on, setOn] = useState(true);
  const handleClick = () => {
    confirm("Are you sure") && setOn(!on);
  };

  return (
    <Box>
      <Switch isChecked={on} onChange={handleClick}></Switch>
    </Box>
  );
};
