import Image from "next/image";
export const Likes = () => {
  return (
    <div className="flex items-center flex-wrap gap-5">
      <div className="card cursor-pointer group overflow-hidden lg:w-52 lg:h-52 md:w-48 md:h-48 w-36 h-36 rounded-2xl bg-gray-dark relative flex-shrink-0">
        <Image
          src={"/images/artists/andre-sebastian-jNdK3CCH5D8-unsplash.jpg"}
          layout="fill"
          priority
          alt="user album"
          className="transition-all object-cover group-hover:scale-110 delay-75"
        />
        <div className="card-footer absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark-100 to-transparent flex items-end p-3 overflow-hidden">
          <div
            className="transition delay-100 group-hover:-translate-y-2
                "
          >
            <h3 className="font-medium">Limits</h3>
            <p className="text-gray text-sm">Johnny Walker</p>
          </div>
        </div>
      </div>
    </div>
  );
};
