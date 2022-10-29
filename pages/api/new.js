const path = require("path");
import fetch from "node-fetch"

// let dir = path.join("public/media/New");
// let readFolder = require("../../utils/readFolder");

export default function handler(req, res) {
  let result = [];
  // readFolder(dir, (track) => {
  //   for (let index = 0; index < track.songs.length; index++) {
  //     const file = track.songs[index];
  //     result.push({
  //       id: index,
  //       audio: file,
  //       title: track.title[index],
  //       artist: track.artists[index],
  //       cover: track.images[index],
  //       category: "new",
  //     });
  //   }
  // });

  fetch("https://api.deezer.com/chart/0")
    .then((e) => e.json())
    .then((data) => {
      if (data) {
        let directData = data?.tracks?.data;
        directData?.map((track) => {
          result.push({
            id: track.id,
            artist: track?.artist?.name,
            title: track.title,
            cover: track?.artist.picture_big,
            audio: track?.preview,
            category: "new",
          });
        });
      }
      res.status(200).json(result);
    });
}
