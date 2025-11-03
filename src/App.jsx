import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Position from "./pages/Position";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/team"
        element={
          <MainLayout>
            <Team />
          </MainLayout>
        }
      />
      <Route
        path="/position"
        element={
          <MainLayout>
            <Position />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
