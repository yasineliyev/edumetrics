import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import { BASE_URL } from "./api/constants";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  document
    .querySelector("head > link")
    .setAttribute("href", `${BASE_URL}/api/logo`);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":lang" element={<Home />} />
        </Route>
        <Route path="register" element={<Register />}>
          <Route path=":lang" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
