import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

import RoutesApp from "./routes";

import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} transition={Bounce} />
      <RoutesApp />
    </div>
  );
}

export default App;
