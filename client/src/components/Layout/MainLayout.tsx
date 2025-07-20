import React, { type ReactNode } from "react";
import Container from "@mui/material/Container";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {children}
    </Container>
  );
};

export default MainLayout;
