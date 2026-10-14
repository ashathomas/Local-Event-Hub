import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Favorites from "./components/Favorites";
import OrganizerDashboard from "./components/OrganizerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import SignIn from "./components/SignIn";
import AddEvent from "./components/AddEvent";
import OrganizerMyEvents from "./components/OrganizerMyEvents";
import { useState, useEffect } from "react";
function App() {
  // Load previous favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });
  // Save current favorites whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Home   favorites={favorites}
      setFavorites={setFavorites}/>} />
        <Route path="/events" element={<Events  favorites={favorites}
      setFavorites={setFavorites} />} />

        <Route path="/events/:id" element={<EventDetails  favorites={favorites}
      setFavorites={setFavorites} />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />

        <Route
          path="/organizer"
          element={<OrganizerDashboard />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route
          path="/organizer/add-event"
          element={<AddEvent />}
        />
        <Route
          path="/organizer/my-events"
          element={<OrganizerMyEvents />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;