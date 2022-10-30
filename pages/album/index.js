import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  let { query } = useRouter();
  let pId = query?.id;

  const [data, setData] = useState("");

  useEffect(() => {
    return () => {
      console.log(query);
    };
  }, [query, data]);
  return (
    <>
      <Head>
        <title>Musica Album Playlist</title>
      </Head>
      {data ? (
        <section
          className={
            " absolute top-0 l-0 h-screen w-full bg-gradient-to-b  from-transparent bg-center bg-cover bg-no-repeat dark:to-dark-300 max-w-6xl"
          }
          style={{ backgroundImage: 'url("/images/01.png")' }}
        ></section>
      ) : (
        <div className="h-56 flex flex-col justify-center items-center">
          <h1 className=" text-4xl dark:text-warmGray-600 text-center font-medium">
            No Data Available
          </h1>
        </div>
      )}
    </>
  );
}
