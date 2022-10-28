import { useState, useEffect } from "react";

export const Playlist = ({ playlist }) => {
  const [playlists, setPlaylist] = useState(playlist);

  return (
    <ul className="list-group mt-10 w-full">
      {Array.isArray(playlists) && playlists.map((item) => {
        return (
          <li
            key={item.name}
            className="flex cursor flex-wrap lg:flex-nowrap justify-between pl-3 my-5 py-4 items-center dark:bg-dark-300 bg-warmGray-200 rounded-2xl hover:-translate-y-3 transition-all ease-linear lg:pr-6 w-full"
          >
            <div className="flex items-center justify-between w-full md:w-auto pr-4 image_section gap-4 mr-4">
              <div className="img-thumbnail w-20 h-20 lg:w-12 lg:h-12 rounded-md dark:bg-slate-700 bg-warmGray-400"></div>

              <button className="btn text-xl transition-all text-amber-300 ease-linear lg:hover:animate-pulse">
                {!item.favourite ? (
                  <i className="ri ri-heart-line"></i>
                ) : (
                  <i className="ri ri-heart-fill"></i>
                )}
              </button>
            </div>

            <div class="text_&_option w-full flex justify-between max-w-5xl ml-auto items-center lg:pt-0 pt-5 flex-wrap-reverse pr-4">
              <div class="text_side gap-2 flex flex-1 items-center justify-between font-medium capitalize w-full flex-wrap">
                <p>{item.name}</p>
                <p>{item.albumType}</p>
                <p>{item.duration}</p>
              </div>

              <button className="btn ml-10 dark:text-amber-300 medium text-gray transition-all h-10 w-10 rounded-full focus:dark:bg-warmGray-600 focus:bg-warmGray-300 ease-linear lg:hover:rotate-90">
                <i className="ri ri-more-2-fill"></i>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
