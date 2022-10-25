const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "26d157918fmsh950b115399666d5p112920jsn541a032bcf59",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

fetch(
  "https://spotify23.p.rapidapi.com/albums/?ids=3IBcauSj5M2A6lTeffJzdv",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));