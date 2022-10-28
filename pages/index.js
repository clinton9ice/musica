import Head from "next/head";
import { CuratedPlaylist, TopCharts, HorizontontalItems } from "../components";
import musicContext from "../store/context";
import { useState, useContext, useEffect } from "react";

export default function Home() {
  const [release, setRelease] = useState([
    {
      id: 54,
      songName: "Common person",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 14 (1).png",
      playing: false,
      artistName: "Burnaboy",
    },
    {
      id: 61,
      songName: "Joha",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 14 (2).png",
      playing: false,
      artistName: "Kiss Daniel",
    },
    {
      id: 65,
      songName: "Rush",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 14 (3).png",
      playing: false,
      artistName: "Ayra starr",
    },
    {
      id: 63,
      songName: "Organise",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 14 (4).png",
      playing: false,
      artistName: "Asake",
    },
    {
      id: 64,
      songName: "Electricity ft Davido",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 26.png",
      playing: false,
      artistName: "Pheelz",
    },
    {
      id: 69,
      songName: "Odo ft Empire",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 14 (5).png",
      playing: false,
      artistName: "Kizz Daniel",
    },
    {
      id: 68,
      songName: "For My Hand",
      src: "https://www.naijaloaded.com",
      img: "Rectangle 14.png",
      playing: false,
      artistName: "Burna boy",
    },
  ]);
  const { requestTracks, albums, newSongs, popularSongs } = useContext(musicContext);

  useEffect(() => {
    setTimeout(async () => {
      await requestTracks();
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Musica</title>
        <meta
          name="description"
          content="Musica is an online musical platform where you can stream and download current musics and get the latest top charts songs from celebrities of your choice."
        />
      </Head>

      <>
        <div className="grid-cols-1 grid lg:grid-cols-2 items-start justify-between w-full flex-wrap">
          <CuratedPlaylist />
          <TopCharts playList={ albums } />
        </div>

        <HorizontontalItems tag={"new release"} items={newSongs} />
        <HorizontontalItems tag={"Hottest"} items={popularSongs} />
      </>
    </>
  );
}
