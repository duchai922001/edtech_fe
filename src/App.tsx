import { Toaster } from "react-hot-toast";
import MainRouter from "./routers/main.router";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  localStorage.setItem("mui-mode", "light");
  return (
    <>
      <Toaster position="top-center" />
      <GoogleOAuthProvider clientId="719253070118-6qgjhqtuoti37e63e8v0f9iq5ijkqmrt.apps.googleusercontent.com">
        <MainRouter />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
