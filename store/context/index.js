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
  const trackCount = useRef(0);

  const [player, setPlayer] = useState({
    duration: 100,
    current: "",
    selectedId: 1,
    selectedAlbum: "new",
    volume: 100,
    playing: false,
    muted: false,
    loop: false,
    shuffle: false,
    seeking: false,
    timer: 0,
  });

  // =========Music Data=============
  let [data, setData] = useState({
    albums: [],
    newSongs: [],
    popularSongs: [],
    foreignSongs: [],
  });
  const [playList, addToPlaylist] = useState([]);
  const [playing, setPlaying] = useState("");
  let [likes, setLikes] = useState([]);
  let [collection, setCollection] = useState([]);

  // ================

  //=================== Music Apis Request

  const requestTracks = useCallback(async () => {
    let requests = ["/api/popular", "/api/foreign", "/api/new", "/api/album"];
    let req = requests.map(
      async (url) =>
        await fetch(url)
          .then((e) => e.json())
          .then((data) => data)
          .catch((error) => new Error(error.message))
    );

    setData({
      popularSongs: await req[0],
      foreignSongs: await req[1],
      newSongs: await req[2],
      albums: await req[3],
    });
  }, []);
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
        if (audioRef.current?.readyState === 4) {
          audioRef.current.volume = player.volume / 100;
        }
      }
      setPlayer({ ...player, volume: volumeControl.value });
      volumeControl.style.setProperty("--volume", player.volume + "%");
    }
  };

  const play = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      player.seeking = false;
      setPlayer({
        ...player,
        playing: true,
      });
    }
  };

  const selectTrack = useCallback(
    (content, album) => {
      if (content) {
        let { id, category } = content;
        trackCount.current = id;
        player.seeking = true;

        // Reload the Audio Play Track
        audioRef.current && audioRef.current?.load();

        if (audioRef.current) {
          // Assign the set volume value to the construtor on default
          audioRef.current.volume = player.volume / 100;
          audioRef.current.muted = player.muted;
        }

        switch (category) {
          case "new":
            addToPlaylist(data.newSongs);
            audioRef.current = new Audio(data.newSongs[id]?.audio);
            break;
          case "popular":
            addToPlaylist(data.popularSongs);
            audioRef.current = new Audio(data.popularSongs[id]?.audio);
            break;
          case "foreign":
            addToPlaylist(data.foreignSongs);
            audioRef.current = new Audio(data.foreignSongs[id]?.audio);
            break;

          case "album":
            addToPlaylist(album? album: []);
            audioRef.current = new Audio(content?.audio);
            break;
        }
        trackCount.current = content.id;
        setPlaying(content);

        setPlayer({
          ...player,
          selectedAlbum: category,
          selectedId: id,
        });
      }
    },
    [data.newSongs, data.popularSongs, data.albums, player]
  );

  const audioRange = (e) => {
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
    if (audioRef.current) {
      // Get the next track
      let playingItem = playList[index];
      // Check for shuffling
      if (player.shuffle) shuffle();
      // Reload the Audio Play Track
      audioRef.current && audioRef.current.load();
      audioRef.current = new Audio(playingItem.audio);
      setPlaying(playingItem);
      play();

      setPlayer({
        ...player,
        selectedAlbum: playingItem.category,
        selectedId: index,
      });

      player.loop
        ? (audioRef.current.loop = true)
        : (audioRef.current.loop = false);
    }
  };

  function timeUpdate() {
    var time =
      audioRef.current?.currentTime * (100 / audioRef.current?.duration);
    console.log(time);
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
    if (!audioRef.current) return false;
    if (trackCount.current === playList.length - 1) {
      trackCount.current = 0;
      playFrom(0);
    } else {
      trackCount.current++;
      playFrom(trackCount.current);
    }
  };

  const prevTrack = () => {
    if (trackCount.current > 0) {
      trackCount.current--;
      playFrom(trackCount.current);
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
    let list = playList;
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
        audioRef.current.addEventListener("loadstart", () => {
          setPlayer({ ...player, playing: false, seeking: true });
        });

        audioRef.current.addEventListener("loadeddata", () => {
          audioRef.current?.play();
          setPlayer({ ...player, playing: true, seeking: false });
        });

        audioRef.current.addEventListener("ended", () => {
          if (trackCount.current !== playList.length - 1) return nextTrack();
        });
      }, 100);
    } else seek();
    return () => {
      clearTimeout(event);
      requestTracks();
    };
  }, [audioRef.current?.networkState]);

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
        pause,
        play,
        audioRange,
        muteAudio,
        loopTrack,
        seek,
        selectTrack,
        shuffle,
        playing,
        time: audioRef.current?.currentTime,
        controller: audioRef,
      }}
    >
      {children}
    </musicContext.Provider>
  );
}

export default musicContext;
