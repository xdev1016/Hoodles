import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/home/index";
import MintNowPage from "./pages/mintnow";
import HoordlePage from "./pages/hoordle";
import { useLocation } from "react-router";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
function App() {
  const location: string = useLocation().pathname;
  let hrefs: string[] = [
    "https://discord.gg",
    "https://discord.gg/DmX24Nezym",
    "https://discord.gg/PxkUEKyPM8",
    "https://discord.gg/G42rQRSzcS",
  ];
  const getLibrary = (provider: ExternalProvider) => {
    return new Web3Provider(provider);
    console.log();
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navbar pointsTo={location} discs={hrefs} />

      <Routes>
        <Route
          path="/mint-now"
          element={<MintNowPage getLibrary={getLibrary} />}
        />
        <Route
          path="/giveaway"
          element={<MintNowPage getLibrary={getLibrary} isGiveaway />}
        />
        <Route path="/" element={<HomePage disc={hrefs[0]} pointsTo="" />} />
        <Route path="/1" element={<HomePage disc={hrefs[1]} pointsTo="/1" />} />
        <Route path="/2" element={<HomePage disc={hrefs[2]} pointsTo="/2" />} />
        <Route path="/3" element={<HomePage disc={hrefs[3]} pointsTo="/3" />} />
        <Route path="/hoordle" element={<HoordlePage disc={hrefs[0]} />} />
        <Route
          path="/1/hoordle"
          element={<HoordlePage pointsTo={1} disc={hrefs[1]} />}
        />
        <Route
          path="/2/hoordle"
          element={<HoordlePage pointsTo={2} disc={hrefs[2]} />}
        />
        <Route
          path="/3/hoordle"
          element={<HoordlePage pointsTo={3} disc={hrefs[3]} />}
        />
      </Routes>
    </Web3ReactProvider>
  );
}

export default App;
