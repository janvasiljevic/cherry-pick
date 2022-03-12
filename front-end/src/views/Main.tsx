import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Companies } from "./Companies";
import { Login } from "./Login";

export const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Grid
      width="100%"
      height="100%"
      templateColumns="250px auto"
      templateRows="70px auto"
    >
      <Navbar setOpen={setIsOpen} isOpen={isOpen} />
      <Sidebar isOpen={isOpen} setOpen={setIsOpen} />
      <GridItem rowStart={2} rowEnd={3} colStart={{ base: 1, md: 2 }} colEnd={{ base: 3, md: 4 }} overflowY="auto" >
        <Outlet />
      </GridItem>
    </Grid>
  );
};
