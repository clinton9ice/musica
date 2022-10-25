import { useContext } from "react";
import { useRef } from "react";
import Link from "next/link";
import Style from "./style.module.css";
import musicContext from "../../store/context";
import {
  HomeIcon,
  LibraryIcon,
  RadioIcon,
  VideoIcon,
  ExitIcon,
  AvatarIcon,
} from "../Icons";
import { useRouter } from "next/router";

export const AsideNav = () => {
  const links = useRef([
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon styles="text-yellow" />,
    },
    {
      name: "My collection",
      href: "/collection",
      icon: <LibraryIcon />,
    },
    {
      name: "Radio",
      href: "/radio",
      icon: <RadioIcon />,
    },
    {
      name: "Music Video",
      href: "/music_video",
      icon: <VideoIcon />,
    },
  ]);
  const { toggleNav, navOpen } = useContext(musicContext);
  const router = useRouter();
  return (
    <section
      className={`lg:mt-5 transition-all lg:w-auto lg:sticky lg:top-24 lg:z-40 lg:visible  rounded-md fixed overflow-hidden  left-0 top-20 max-w-xs h-full bg-black lg:bg-transparent ${
        navOpen ? "z-50 visible w-72" : "-z-40 invisible w-0"
      }`}
    >
      <div className="col">
        <ul
          className={`lg:bg-dark-200 aside-lists block lg:rounded-full lg:mb-10 lg:ml-2`}
        >
          {links.current.map((link) => {
            return (
              <li
                className={`list-none hover:bg-warmGray-800 first:lg:rounded-t-full last:lg:rounded-b-full ${
                  router.pathname == link.href &&
                  "text-amber-300 bg-warmGray-800  " + Style.linkActive
                } ${Style.asideListItem}`}
                key={link.name}
                title={link.name}
                onClick={toggleNav}
              >
                <Link href={link.href}>
                  <a
                    className={`list-item-line flex items-center gap-5 p-5  hover:text-amber-300`}
                  >
                    {link.icon}
                    <span className="text lg:hidden">{link.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className={`lg:bg-dark-200 block lg:rounded-full lg:mb-7 ml-2 `}>
          <li
            className={`list-none hover:bg-warmGray-800  ${Style.asideListItem} lg:rounded-t-full`}
          >
            <a
              href="#"
              className="list-item-line flex items-center gap-5 p-5 hover:text-amber-300 "
            >
              <AvatarIcon />
              <span className="text lg:hidden ">Profile</span>
            </a>
          </li>

          <li
            className={`list-none hover:bg-warmGray-800 rounded-sm lg:rounded-b-full ${Style.asideListItem}`}
          >
            <a
              href="#"
              className="list-item-line flex items-center gap-5 p-5 hover:text-amber-300"
            >
              <ExitIcon />
              <span className="text lg:hidden">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
