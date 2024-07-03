import React from "react";
import MainLayout from "./views/layouts/main.layout";

function App() {
  const [count, setCount] = React.useState("transfer");

  return (
    <>
      <MainLayout tab={count} onChange={(values) => setCount(values)} />
    </>
  );
}

export default App;
