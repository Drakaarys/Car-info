import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/landing";
import Cars from "./pages/cars";
import Search from "./pages/SearchCar";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
