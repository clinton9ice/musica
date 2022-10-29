const path = require("path");

let dir = path.join("public/media/Popular");
let readFolder = require("../../utils/readFolder");

export default function handler(req, res) {
  let result = [];
  readFolder(dir, (track) => {
    for (let index = 0; index < track.songs.length; index++) {
      const file = track.songs[index];
      result.push({
        id: index,
        audio: file,
        title: track.title[index],
        artist: track.artists[index],
        cover: track.images[index],
        category: "popular",
      });
    }
  });
  res.status(200).json(result);
}