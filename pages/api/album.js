import fetch from "node-fetch";
import { Result } from "postcss";
export default function handler(req, res) {
  let data = [
    {
      id: "playlist-1",
      title: "YBNL Playlist",
      cover: "https://musica-api.up.railway.app/cover/play_cover_1.jpg",
      info: "Yahoo Boy No Laptop Nation, popularly known as YBNL, is an independent record label founded by Olamide in 2012",
      files: [
        {
          id: "ybnl-1",
          artist: "Olamide",
          duration: "2:35",
          title: "We Outside",
          cover: "https://musica-api.up.railway.app/cover/cover_8.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_8.mp3",
        },
        {
          id: "ybnl-2",
          artist: "Asake",
          duration: "2:33",
          title: "PBUY",
          cover: "https://musica-api.up.railway.app/cover/cover_19.png",
          audio: "https://musica-api.up.railway.app/audio/audio_19.mp3",
        },
        {
          id: "ybnl-3",
          artist: "Asake ft Burna Boy",
          duration: "3:30",
          title: "Sungba Remix",
          cover: "https://musica-api.up.railway.app/cover/cover_16.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_16.mp3",
        },
        {
          id: "ybnl-4",
          artist: "Fireboy",
          duration: "3:27",
          title: "Playboy",
          cover: "https://musica-api.up.railway.app/cover/cover_17.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_17.mp3",
        },
        {
          id: "ybnl-5",
          artist: "Asake",
          duration: "2:19",
          title: "Terminator",
          cover: "https://musica-api.up.railway.app/cover/cover_11.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_11.mp3",
        },
      ],
    },
    {
      id: "playlist-2",
      title: "Asake Playlist",
      cover: "https://musica-api.up.railway.app/cover/play_cover_2.png",
      info: "Ahmed Ololade , known professionally as Asake, is a Nigerian singer and songwriter of Yoruba heritage who specialises in Afrobeats. He got signed to YBNL Nation and Empire Distribution.",
      files: [
        {
          id: "asake-1",
          artist: "Asake",
          duration: "2:33",
          title: "PBUY",
          cover: "https://musica-api.up.railway.app/cover/cover_19.png",
          audio: "https://musica-api.up.railway.app/audio/audio_19.mp3",
        },
        {
          id: "asake-2",
          artist: "Asake ft Burna Boy",
          duration: "3:30",
          title: "Sungba Remix",
          cover: "https://musica-api.up.railway.app/cover/cover_16.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_16.mp3",
        },
        {
          id: "asake-3",
          artist: "Asake",
          duration: "2:19",
          title: "Terminator",
          cover: "https://musica-api.up.railway.app/cover/cover_11.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_11.mp3",
        },
      ],
    },
    {
      id: "playlist-3",
      title: "Zinoleesky Playlist",
      cover: "https://musica-api.up.railway.app/cover/play_cover_3.jpg",
      info: "Zinoleesky is a Nigerian singer and song-writer currently signed to Naira Marley record label, Marlian Music Imprint.",
      files: [
        {
          id: "zino-1",
          artist: "Zinoleesky",
          duration: "2:24",
          title: "Call Of Duty",
          cover: "https://musica-api.up.railway.app/cover/cover_10.jpg",
          audio: "https://musica-api.up.railway.app/audio/audio_10.mp3",
        },
        {
          id: "zino-2",
          artist: "Zinoleesky",
          duration: "2:05",
          title: "Loving You",
          cover: "https://musica-api.up.railway.app/cover/cover_20.jpg",
          audio: "https://musica-api.up.railway.app/audio/audio_20.mp3",
        },
      ],
    },
    {
      id: "playlist-4",
      title: "Ayra Starr Playlist",
      cover: "https://musica-api.up.railway.app/cover/play_cover_4.jpeg",
      info: "Oyinkansola Sarah Aderibigbe (born 14 June 2002), known professionally as Ayra Starr, is a Nigerian singer. Born in Cotonou, Benin, Ayra Starr began a fashion career at the age of 16 with Quove Model Management before deciding to pursue music.",
      files: [
        {
          id: "ayra-1",
          artist: "Ayra Starr",
          duration: "3:09",
          title: "Rush",
          cover: "https://musica-api.up.railway.app/cover/cover_2.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_2.mp3",
        },
        {
          id: "ayra-2",
          artist: "Magix ft Ayra Starr",
          duration: "2:26",
          title: "Love Don't Cost A Dime",
          cover: "https://musica-api.up.railway.app/cover/cover_12.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_12.mp3",
        },
      ],
    },
    {
      id: "playlist-5",
      title: "Kizz Daniel Playlist",
      cover: "https://musica-api.up.railway.app/cover/play_cover_5.jpeg",
      info: 'Oluwatobiloba Daniel Anidugbe, better known by his stage name Kizz Daniel, is a Nigerian singer and songwriter. He is best known for his singles "Woju" and "Yeba". He went by the stage name Kiss Daniel prior to changing it in May 2018.',
      files: [
        {
          id: "new-1",
          artist: "Kizz Daniel",
          duration: "2:56",
          title: "Cough (Odo)",
          cover: "https://musica-api.up.railway.app/cover/cover_1.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_1.mp3",
        },
        {
          id: "popular-4",
          artist: "Kizz Daniel ft Tekno",
          duration: "2:59",
          title: "Buga",
          cover: "https://musica-api.up.railway.app/cover/cover_14.jpeg",
          audio: "https://musica-api.up.railway.app/audio/audio_14.mp3",
        },
      ],
    },
    {
      id: "playlist-6",
      title: "BNXN (Buju) Playlist",
      cover: "https://musica-api.up.railway.app/cover/play_cover_6.jpeg",
      info: "Daniel Benson (born 14 May 1997), known professionally as Bnxn (pronounced as Benson) and formerly known as Buju, He is a Nigerian Afro-fusion singer, songwriter and record producer.",
      files: [
        {
          id: "new-7",
          artist: "JAE5 ft Dave & BNXN",
          duration: "3:24",
          title: "Propeller",
          cover: "https://musica-api.up.railway.app/cover/cover_7.png",
          audio: "https://musica-api.up.railway.app/audio/audio_7.mp3",
        },
        {
          id: "popular-8",
          artist: "BNXN ft Wande Coal",
          duration: "3:33",
          title: "Kenkele",
          cover: "https://musica-api.up.railway.app/cover/cover_18.png",
          audio: "https://musica-api.up.railway.app/audio/audio_18.mp3",
        },
      ],
    },
  ];
  let newDatas = [];
  //   fetch("https://musica-api.up.railway.app/playlist")
  //     .then((d) => d.json())
  //     .then((Result) => {
  //       if (Result) {
  //       }
  //     })
  //     .catch((error) => {
  //       res.status(500).json({ message: error.message });
  //     });
  data = data.map((item, i) => {
    let { files } = item;

    if (files && Array.isArray(files)) {
      item.files = files.map((tracks, e) => ({
        ...tracks,
        id: e,
        category: "album",
      }));
    }
    return item;
  });
  res.status(200).json(data);
}
