import { Avatar, Box, Divider, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";

import { FaCheck } from "react-icons/fa";

// Icon
interface IIconProps{
  done:boolean;
  i:number
}
const Ico = ({done, i}:IIconProps) => {
  if(done){
    return(<Avatar bg='teal.400' color="whiteAlpha.900" icon={<FaCheck fontSize='1.3rem' />} />);
  }
  return (
    <Avatar name={(i+1).toString()} color="blackAlpha.600" bgColor="gray.200" />
  )
  ;
};

// Divider
const MyDivider = () => {
  const done = false;
  return <Box h={1} mx={4} bgColor={done ? "accent.light" : "blackAlpha.200"} w="full"></Box>;
};


// Stepper
interface IStepperProps{
  numSteps: number;
  step: number;
}
export const Stepper = ({step, numSteps, ...other}:IStepperProps) => {
  return (
    <HStack {...other} divider={<MyDivider />} w="full" justify="space-between" p={8}>
      {Array(numSteps).fill(1).map((j,i)=>{
        return(<Ico done={(i <= step)} i={i} key={i} />)
      })}
    </HStack>
  );
};
