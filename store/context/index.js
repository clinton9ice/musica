import { createContext, useState, useCallback, useRef, useEffect } from "react";

const musicContext = createContext();

export function MusicStore({ children }) {
  const [history, setHistories] = useState([
    "ayrra",
    "tems",
    "akon",
    "burnaboy",
    "rudeboi",
    "davido",
    "jason derulo",
    "justin bieber",
    "justin timberlake",
  ]);

  //============ Custom Player configuration=======
  const audioRef = useRef();
  const trackPlayed = useRef(0);

  const [player, setPlayer] = useState({
    duration: 100,
    current: {
      id: "new-2",
      artist: "Ayra Starr",
      duration: "3:05",
      title: "Rush",
      cover: "https://musica-api.up.railway.app/cover/cover_2.jpeg",
      audio: "https://musica-api.up.railway.app/audio/audio_2.mp3",
    },
    selectedId: 1,
    selectedAlbum: "new",
    volume: 100,
    playing: false,
    muted: false,
    loop: false,
    shuffle: false,
    seeking: false,
  });

  // =========Music Data=============
  let [data, setData] = useState({
    albums: [],
    newSongs: [],
    popularSongs: [],
  });
  const [playList, addToPlaylist] = useState([]);
  let [likes, setLikes] = useState([]);
  let [collection, setCollection] = useState([]);

  // ================

  //=================== Music Apis Request
  let requests = [
    "https://musica-api.up.railway.app/new",
    "https://musica-api.up.railway.app/popular",
    "https://musica-api.up.railway.app/playlist",
  ];
  const requestTracks = async () => {
    let req = requests.map(
      async (url) =>
        await fetch(url)
          .then((e) => e.json())
          .then((data) => data)
          .catch((error) => new Error(error.message))
    );
    setData({
      newSongs: await req[0],
      popularSongs: await req[1],
      albums: await req[2],
    });
  };
  // ================/

  const playerVolume = (e) => {
    let volumeControl = document.querySelector("#audioVolume");

    if (!e) {
      player.volume = 100;
      volumeControl.style.setProperty("--volume", 100 + "%");
      return;
    }

    let { mute, type } = e;

    if (mute) {
      volumeControl.style.setProperty("--volume", 0);
    }

    if (type === "range") {
      if (audioRef.current) {
        if (audioRef.current.ready) {
          audioRef.current.volume = player.volume / 100;
        }
      }
      setPlayer({ ...player, volume: volumeControl.value });
      volumeControl.style.setProperty("--volume", player.volume + "%");
    }
  };

  const play = async () => {
    player.seeking = true;
    if (audioRef.current) {
      await audioRef.current.play();
      player.seeking = false;
    } else {
      createAudio(player.current.id);
      trackPlayed.current = player.current.id;
    }

    setPlayer({
      ...player,
      playing: true,
    });
  };

  const createAudio = useCallback(
    (aId) => {
      player.seeking = true;
      // Check for selected track
      try {
        let [type, id] = aId?.split("-");
        id = Number(id);
        // Reload the Audio Constructor
        audioRef.current && audioRef.current?.load();
        if (audioRef.current) {
          // Assign the set volume value to the construtor on default
          audioRef.current.volume = player.volume / 100;
          audioRef.current.muted = player.muted;
        }
        if (type == "new") {
          audioRef.current = new Audio(data.newSongs[id - 1]?.audio);
        }

        if (type == "popular") {
          audioRef.current = new Audio(data.popularSongs[id - 1]?.audio);
        }
      } catch (error) {
        alert("Something went wrong " + error.message);
        throw error.message;
      }
    },
    [data.newSongs, data.popularSongs, player]
  );

  const selectTrack = (content) => {
    if (content) {
      const [type, id] = content?.id.split("-");
      player.selectedId = id;
      player.selectedAlbum = type;
      player.current = content;
      trackPlayed.current = id;

      // Reload the Audio Play Track
      audioRef.current && audioRef.current?.load();

      if (type === "new") {
        addToPlaylist(data.newSongs);
      } else if (type === "popular") {
        addToPlaylist(data.popularSongs);
      } else if (type === "album") {
        addToPlaylist(data.albums);
      }
      createAudio(content?.id);
    }
  };

  const seekRange = (e) => {
    if (audioRef.current) {
      let slideTractVal =
        Math.floor(audioRef.current?.duration) * (e.target.value / 100);
      e.target.style.setProperty("--seeker", e.target.value + "%");
      audioRef.current.currentTime = slideTractVal;
    }
  };

  function seek() {
    let seekSlider = document.querySelector("#seekSlider");
    // Reset the seek range value
    seekSlider.value = 0;
    // Check to know if the mouse is moving the track to fast forward the time
    if (audioRef.current) {
      let sliderVal;
      // Update the seek slider value
      sliderVal = Math.floor(
        audioRef.current.currentTime * (100 / audioRef.current?.duration)
      );
      seekSlider.value = isNaN(sliderVal) ? 0 : sliderVal;
      seekSlider.style.setProperty("--seeker", seekSlider.value + "%");
    }
  }
  const playFrom = (index) => {
    // Check for shuffling
    if (player.shuffle) shuffle();
    // Reload the Audio Play Track
    audioRef.current && audioRef.current.load();
    player.seeking = true;
    audioRef.current = new Audio(playList[index].audio);
    player.current = playList[index];
    play();

    player.loop
      ? (audioRef.current.loop = true)
      : (audioRef.current.loop = false);
  };

  function seektimeupdate() {
    // var nt = audio.currentTime * (100 / audio.duration);
    // seekslider.value = nt;
    // var curmins = Math.floor(audio.currentTime / 60);
    // var cursecs = Math.floor(audio.currentTime - curmins * 60);
    // var durmins = Math.floor(audio.duration / 60);
    // var dursecs = Math.floor(audio.duration - durmins * 60);
    // if (cursecs < 10) {
    //   cursecs = "0" + cursecs;
    // }
    // if (dursecs < 10) {
    //   dursecs = "0" + dursecs;
    // }
    // if (curmins < 10) {
    //   curmins = "0" + curmins;
    // }
    // if (durmins < 10) {
    //   durmins = "0" + durmins;
    // }
    // curtimetext.innerHTML = curmins + ":" + cursecs;
    // durtimetext.innerHTML = durmins + ":" + dursecs;
  }

  const nextTrack = () => {
    if (trackPlayed.current === playList.length - 1) {
      playFrom(0);
    } else if (playList.length === trackPlayed.current) {
      addToPlaylist(data.newSongs);
    } else if (trackPlayed.current < playList.length - 1) {
      trackPlayed.current++;
      if (trackPlayed.current == player.selectedId) {
        trackPlayed.current += 1;
      }
      playFrom(trackPlayed.current - 1);
    }
  };

  const prevTrack = () => {
    if (trackPlayed.current > 0) {
      trackPlayed.current--;
      // Reload the Audio Play Traack
      audioRef.current.load();
      playList.map((tracks, i) => {
        if (i === trackPlayed.current) {
          playFrom(i);
        }
      });
    } else {
      pause();
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayer({ ...player, playing: false });
  };

  const muteAudio = () => {
    setPlayer({ ...player, muted: !player.muted });
    if (!player.muted && audioRef.current) {
      audioRef.current.muted = true;
      playerVolume({ mute: true });
    } else {
      if (audioRef.current) {
        audioRef.current.muted = false;
        playerVolume();
      }
    }
  };

  const loopTrack = () => {
    setPlayer({ ...player, loop: !player.loop });
    !player.loop
      ? (audioRef.current.loop = true)
      : (audioRef.current.loop = false);
  };

  const shuffle = () => {
    let list = player.playList;
    let listLength = list.length,
      t,
      i;
    if (!player.shuffle) {
      setPlayer({ ...player, shuffle: true });
      // While there are items to shuffle
      while (listLength) {
        // Pick a remaining item
        i = Math.floor(Math.random() * listLength--);
        // And Swap it with the current element using yachtes theory
        t = list[listLength];
        list[listLength] = list[i];
        list[i] = t;
      }
    }

    setPlayer({ ...player, shuffle: false });
    return list;
  };

  useEffect(() => {
    let event;
    if (audioRef.current) {
      event = setTimeout(() => {
        if (audioRef.current.networkState == 2) {
          setPlayer({ ...player, playing: false, seeking: true });
        } else {
          setPlayer({ ...player, playing: true, seeking: false });
        }

        audioRef.current.addEventListener("waiting", () => {
          setPlayer({ ...player, playing: false, seeking: true });
        });

        audioRef.current.addEventListener("loadeddata", () => {
          audioRef.current?.play();
          setPlayer({ ...player, playing: true, seeking: false });
        });

        audioRef.current.addEventListener("ended", () => {
          console.log("ended");
          setPlayer({ ...player, playing: false, seeking: false });
        });
      }, 100);
    }
    return () => {
      clearTimeout(event);
    };
  }, [audioRef.current?.currentTime, audioRef.current?.networkState]);
  // ===============

  // ===========Add search history
  const setHistory = (e) => {
    // Check if the arg is an array and clear the history if empty
    if (Array.isArray(e) && e.length === 0) setHistories([]);

    // Make sure the provided parameter is not an array
    if (!Array.isArray(e)) {
      // Check if the provided parameter already exists
      let exists =
        history.includes(e.toLowerCase()) ||
        localStorage.getItem(e.toLowerCase()) != null;

      if (!exists) {
        //   Set New History
        setHistories([e, ...history]);
        //   Set the history data in your browser local storage
        localStorage.setItem("histories", history);
      }
    }
  };
  const rmHistory = (e) => setHistories(history.filter((i) => i !== e));
  // =================/

  // ===============Navbar setup===========/
  const toggleNav = () => OpenNav(!navOpen);
  const [navOpen, OpenNav] = useState(false);
  //=====================/

  return (
    <musicContext.Provider
      value={{
        history,
        setHistory,
        rmHistory,
        navOpen,
        toggleNav,
        ...data,
        requestTracks,
        player,
        playerVolume,
        nextTrack,
        prevTrack,
        createAudio,
        pause,
        play,
        seekRange,
        muteAudio,
        loopTrack,
        seek,
        selectTrack,
        shuffle,
        time: audioRef.current?.currentTime,
      }}
    >
      {children}
    </musicContext.Provider>
  );
}

export default musicContext;
