import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import OrganizerForm from "./pages/OrganizerForm";
import MintTournament from "./pages/MintTournament";
import GamePage from "./pages/GamePage";
import GameDetails from "./pages/GameDetails";
import NinjaGame from "./pages/NinjaGame";
import Tournaments from "./pages/Tournaments";
import LeaderBoard from "./pages/LeaderBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/organizer-form" element={<OrganizerForm />} />
          <Route path="/create-tournament" element={<MintTournament />} />

          <Route path="/games" element={<GamePage />} />
          <Route path="/games">
            <Route path=":gameName" element={<GameDetails />} />
            <Route path=":gameName">
              <Route path=":slug" element={<NinjaGame />} />
            </Route>
          </Route>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
