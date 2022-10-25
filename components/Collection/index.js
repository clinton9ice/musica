import { useState } from "react";
import Image from "next/image";

export const Collections = () => {
  const [collection, setcollection] = useState([
    {
      artist: "Johnny Walker",
      image: "/images/artists/andre-sebastian-jNdK3CCH5D8-unsplash.jpg",
      src: "",
      album: "Limit",
    },
    {
      artist: "Ayrra Starr",
      image: "/images/artists/daria-volkova-OH6jXILNVAo-unsplash.jpg",
      src: "",
      album: "Rush",
    },
    {
      artist: "Jax",
      image: "/images/artists/joshua-rondeau-kf9tRJz3vVI-unsplash.jpg",
      src: "",
      album: "My Father",
    },
  ]);

  return (
    <div className="flex items-center flex-wrap gap-5">
      {collection.map((item) => (
        <div
          key={item.artist}
          className="card cursor-pointer group overflow-hidden lg:w-52 lg:h-52 md:w-48 md:h-48 w-full h-60 rounded-2xl bg-gray-dark relative flex-shrink-0"
        >
          <Image
            src={item.image}
            layout="fill"
            alt={item.artist}
            className="transition-all object-cover group-hover:scale-110 delay-75 object-center"
            priority
          />
          <div className="card-footer absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark-100 to-transparent flex items-end p-3 overflow-hidden">
            <div
              className="transition delay-100 group-hover:-translate-y-2
                "
            >
              <h3 className="font-medium">{item.album}</h3>
              <p className="text-gray text-sm">{item.artist}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
