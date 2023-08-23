import { useEffect, useState } from "react";
import "./App.css";
import ChatPage from "./Pages/ChatPage";
import Layout from "./Pages/Layout";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <ChatPage />
      </Layout>
    </>
  );
}

export default App;
