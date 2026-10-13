import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
 import Favorites from "./components/Favorites";
 import OrganizerDashboard from "./components/OrganizerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import SignIn from "./components/SignIn";
import AddEvent from "./components/AddEvent";
import OrganizerMyEvents from "./components/OrganizerMyEvents";
function App() {
  return (
    <BrowserRouter>
      {/* <Routes>

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

      </Routes> */}

       <Routes>
      <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />

      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/favorites" element={<Favorites />} />

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