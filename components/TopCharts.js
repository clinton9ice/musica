import React from "react";
import { useState } from "react";

export const TopCharts = () => {
  let [charts, setChart] = useState([
    {
      artistName: "Mavins Record",
      album: "Rush",
      albumDuration: "20:15:10",
      img: "",
      liked: false,
    },
    {
      artistName: "Burna boy",
      album: "Common person",
      albumDuration: "10:09:30",
      img: "",
      liked: false,
    },
  ]);
  // Toggle the like state
  const like = (e) => {
    charts.find((item) => {
      // Check for match
      if (item.album === e) {
        item.liked = !item.liked;
        setChart([...charts]);
      }
    });
  };

  return (
    <section className={`w-full max-w-xl lg:px-10 py-5 ml-auto`}>
      <h2 className=" text-xl font-medium">Top Charts</h2>
      <ul
        className="list overflow-y-auto py-4"
        style={{ maxHeight: "450px" }}
      >
        {charts.length > 0
          ? charts.map((chart) => {
              return (
                <li
                  key={chart.artistName}
                  className="py-3 px-5 mb-3 bg-slate-50 dark:bg-dark-100 w-full flex flex-wrap lg:flex-nowrap relative list-none items-center justify-between rounded-xl overflow-hidden transition after:absolute after:left-0 after:bottom-0 after:w-full after:h-full after:to-amber-300 after:from-transparent after:rotate-90 after:translate-x-72 after:bg-gradient-to-tr after:rounded-xl after:transition-all after:ease-linear after:delay-200 shadow-xl lg:leading-9 after:opacity-0 after:hover:opacity-100 hover:-translate-y-2 hover:after:rotate-0 hover:after:translate-x-0 group cursor-pointer ease-linear"
                >
                  {/* =====Image & COntent-section===== */}
                  <div className="content-section flex flex-wrap lg:flex-nowrap items-center gap-4 relative z-10 group-hover:dark:text-white">
                    <div className="img-thumb animate-pulse  w-14 h-14 rounded-xl bg-gray-light dark:bg-gray-dark mr-1 group-hover:dark:bg-warmGray-400 group-hover:delay-200"></div>

                    <div className="txt-content">
                      <h3 className="album-name capitalize font-bold">
                        {chart.album}
                      </h3>
                      <p className="dark:text-gray group-hover:dark:text-white artist-name text-sm mb-3">
                        {chart.artistName}
                      </p>
                      <p className="duration text-sm">{chart.albumDuration}</p>
                    </div>
                  </div>
                  {/* ======/End */}

                  {/* =====Button======= */}
                  {!chart.liked ? (
                    <button
                      onClick={() => like(chart.album)}
                      className="btn border ml-2  relative z-10 rounded-full dark:border-gray-dark text-amber-500 transition-all group-hover:dark:border-warmGray-300 hover:bg-amber-500 hover:text-amber-100 hover:border-amber-300 w-10 h-10"
                    >
                      <i className="ri ri-heart-line"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => like(chart.album)}
                      className="btn border ml-2  relative z-10 rounded-full bg-amber-500 border-amber-300 text-amber-100 transition-all hover:bg-transparent hover:text-amber-500 hover:border-amber-300 w-10 h-10"
                    >
                      <i className="ri ri-heart-fill"></i>
                    </button>
                  )}
                  {/* ========> */}
                </li>
              );
            })
          : ""}
      </ul>
    </section>
  );
};
