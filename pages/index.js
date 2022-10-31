import Head from "next/head";
import { CuratedPlaylist, TopCharts, HorizontontalItems } from "../components";
import musicContext from "../store/context";
import {useContext } from "react";

export default function Home() {
  const { albums, popularSongs, newSongs } = useContext(musicContext);

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
          <TopCharts albumList={albums} />
        </div>

        <HorizontontalItems tag={"new release"} items={newSongs} />
        <HorizontontalItems tag={"Popular"} items={popularSongs} />
        {/* <HorizontontalItems tag={"Foreign"} items={foreignSongs} />`   */}
      </>
    </>
  );
}
