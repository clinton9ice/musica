import fetch from "node-fetch";

export default function handler(req, res) {
  let { id } = req.query;
  fetch("https://musica-api.up.railway.app/playlist")
    .then((d) => d.json())
    .then((e) => {
      if (e) {
        e.find((item) => {
          if (item.id === id) {
            res.status(200).json(item);
          }
        });
      } else {
        res.json({status: "not found"})
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
