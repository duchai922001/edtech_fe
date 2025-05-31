import { Toaster } from "react-hot-toast";
import MainRouter from "./routers/main.router";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <MainRouter />
    </>
  );
}

export default App;
