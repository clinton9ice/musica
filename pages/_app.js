import "../styles/globals.css";
import "../styles/output.css";
// import { createTheme, NextUIProvider } from "@nextui-org/react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MusicStore } from "../store/context";
import "remixicon/fonts/remixicon.css";
// Import Swiper styles
import "swiper/css";
import { AsideNav, Player, Nav } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <MusicStore>
      <Nav />
      <div className="lg:flex items-start">
        <AsideNav />
        <div className="w-full pb-28 min-h-full max-w-7xl px-4 mx-auto mb-auto relative">
          <Component {...pageProps} />
        </div>
      </div>
      <Player />
    </MusicStore>
  );
}

export default MyApp;
