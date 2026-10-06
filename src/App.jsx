import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Favorites from "./components/Favorites";
// import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;