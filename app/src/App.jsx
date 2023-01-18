import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import OrganizerForm from "./pages/OrganizerForm";
import MintTournament from "./pages/MintTournament";
import GamePage from "./pages/GamePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/organizer-form" element={<OrganizerForm />} />
          <Route path="/create-tournament" element={<MintTournament />} />
          <Route path="/games" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
