import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./intro";
import { Shell } from "./Shell";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Case from "./pages/Case";
import About from "./pages/About";
import Lost from "./pages/Lost";

// Static routes are mirrored in scripts/emit-routes.mjs, which writes a real
// index.html per path so deep links resolve on the static host.
const App = () => (
  <BrowserRouter>
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Case />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Navigate to="/about" replace />} />
        <Route path="/reel" element={<Navigate to="/work" replace />} />
        <Route path="/play" element={<Navigate to="/about" replace />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </Shell>
  </BrowserRouter>
);

export default App;
