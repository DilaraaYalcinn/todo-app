import React from "react";
import { Container, Box } from "@mui/material";

interface ContainerBoxProps {
  children: React.ReactNode;
}

const ContainerBox: React.FC<ContainerBoxProps> = ({ children }) => (
  <Container
    maxWidth="md"
    sx={{
      mt: 4,
      bgcolor: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 10,
    }}
  >
    <Box
      sx={{
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 5,
        width: "100%",
      }}
    >
      {children}
    </Box>
  </Container>
);

export default ContainerBox;
