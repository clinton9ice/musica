import React from "react";
import { useState, useEffect, useRef } from "react";

export const Player = ({ control }) => {
  const [player, setPlayer] = useState({
    duration: 100,
    items: [
      {
        src: "/audio/Reekado-Banks-–-Rora.mp3",
        name: "",
        selected: true,
        img: "",
        name: "Reekado Banks",
        songTitle: "Rora",
      },
      {
        src: "/audio/Jessie J - Flashlight.mp3",
        name: "",
        selected: false,
        img: "",
        name: "Jessie J",
        songTitle: "Flashlight",
      },
      {
        src: "/audio/Chike-Ft.-Simi-Running-To-You.mp3",
        name: "",
        selected: false,
        img: "",
        name: "Chike Ft Simi",
        songTitle: "Running to you",
      },
      {
        src: "/audio/Ayra_Starr_-_Away_(Official_Music_Video)(128k).mp3",
        name: "",
        selected: false,
        img: "",
        name: "Ayra_Starr",
        songTitle: "Away",
      },
      {
        src: "/audio/Jax_-_Like_My_Father_(Official_Video)(128k).mp3",
        name: "Jax",
        songTitle: "Like My Father",
        selected: false,
        img: "",
      },
    ],
    volume: 100,
    playing: false,
    muted: false,
    loop: false,
    shuffle: false,
    seeking: false,
  });
  const audioRef = useRef();
  const count = useRef(0);

  const setVolume = (e) => {
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
        audioRef.current.volume = player.volume / 100;
      }
      setPlayer({ ...player, volume: volumeControl.value });
      volumeControl.style.setProperty("--volume", player.volume + "%");
    }
  };

  const playAudio = () => {
    try {
      player.items.find((e) => {
        if (e.selected) {
          // Make sure the state of the player is inactive and no audio instance is created
          if (!player.playing && !audioRef.current)
            audioRef.current = new Audio(e.src);
        }
      });
      // Assign the set volume value to the construtor on default
      audioRef.current.volume = player.volume / 100;
      audioRef.current.muted = player.muted;
      audioRef.current.play();
      setPlayer({ ...player, playing: true });
    } catch (error) {
      alert("Something went wrong");
      throw error;
    }
  };

  const onChangeSeek = (e) => {
    if (audioRef.current) {
      let slideTractVal =
        Math.floor(audioRef.current.duration) * (e.target.value / 100);
      e.target.style.setProperty("--seeker", e.target.value + "%");
      audioRef.current.currentTime = slideTractVal;
    }
  };

  function seek() {
    let seekSlider = document.querySelector("#seekSlider");
    // Reset the seek range value
    seekSlider.value = 0;
    player.items.find((track) => {
      if (track.selected) {
        // Check to know if the mouse is moving the track to fast forward the time
        if (audioRef.current) {
          let sliderVal;
          // Update the seek slider value
          sliderVal = Math.floor(
            audioRef.current.currentTime * (100 / audioRef.current.duration)
          );
          seekSlider.value = isNaN(sliderVal) ? 0 : sliderVal;
          seekSlider.style.setProperty("--seeker", seekSlider.value + "%");
        }
      }
    });
  }

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
    if (count.current < player.items.length - 1) {
      count.current++;
      // Check for shuffling
      if (player.shuffle) shufftle();
      // Reload the Audio Play Track
      audioRef.current && audioRef.current.load();
      player.items.map((tracks, i) => {
        tracks.selected = false;
        if (i === count.current) {
          audioRef.current = new Audio(tracks.src);
          playAudio();
          // Check to know if the loop is still active to repeat the new audio instance
          player.loop
            ? (audioRef.current.loop = true)
            : (audioRef.current.loop = false);
          tracks.selected = !tracks.selected;
        }
      });
    }
  };

  const prevTrack = () => {
    if (count.current > 0) {
      count.current--;
      // Reload the Audio Play Traack
      audioRef.current.load();
      player.items.map((tracks, i) => {
        tracks.selected = false;
        if (i === count.current) {
          audioRef.current = new Audio(tracks.src);
          playAudio();
          tracks.selected = !tracks.selected;
        }
      });
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayer({ ...player, playing: !player.playing });
  };

  const muteAudio = () => {
    setPlayer({ ...player, muted: !player.muted });
    if (!player.muted && audioRef.current) {
      audioRef.current.muted = true;
      setVolume({ mute: true });
    } else {
      if (audioRef.current) {
        audioRef.current.muted = false;
        setVolume();
      }
    }
  };

  const loopTrack = () => {
    setPlayer({ ...player, loop: !player.loop });
    !player.loop
      ? (audioRef.current.loop = true)
      : (audioRef.current.loop = false);
  };

  const shufftle = () => {
    let list = player.items;
    let listLength = list.length,
      t,
      i;
    // While there are items to shuffle
    while (listLength) {
      // Pick a remaining item
      i = Math.floor(Math.random() * listLength--);
      // And Swap it with the current element using yachtes theory
      t = list[listLength];
      list[listLength] = list[i];
      list[i] = t;
    }
    return list;
  };

  useEffect(() => {
    let event = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.addEventListener("timeupdate", seek);
      }
    }, 500);

    return () => {
      document.querySelector("#seekSlider").value = 0;
      clearTimeout(event);
      // Check to know when the song has ended to move to the next track
      if (audioRef.current) {
        audioRef.current.addEventListener("ended", () => {
          // Reset the configurations if the song has gotten to the last list
          if (count.current === player.items.length) {
            setPlayer({ ...player, playing: false });
            document.querySelector("#seekSlider").value = 0;
            e.target.style.setProperty("--seeker", 0);
            console.log("ended");
          }
          nextTrack();
        });
      }
    };
  }, [count, player, seek]);

  return (
    <section className="dark: backdrop-blur-lg flex-wrap lg:nowrap rounded-md p-3 flex items-center justify-between fixed bottom-0 right-0 left-0 m-auto  z-40">
      {/* ====Player Title=========== */}
      <div className="player-h flex flex-shrink-0 items-center  justify-between gap-3 cursor-pointer">
        <div className="img-thumbnail h-12 w-12 rounded-md dark:bg-warmGray-400 bg-warmGray-200 animate"></div>
        {player.items.map((i, c) => {
          if (i.selected) {
            return (
              <div className="details" key={c}>
                <h2
                  className="dark:text-white whitespace-nowrap overflow-hidden font-medium text-ellipsis"
                  style={{ maxWidth: "115px" }}
                >
                  {i.songTitle}
                </h2>
                <p
                  className="dark:text-warmGray-300 artistName text-amber-300 whitespace-nowrap overflow-hidden font-medium text-ellipsis"
                  style={{ maxWidth: "120px" }}
                >
                  {i.name}
                </p>
              </div>
            );
          }
        })}
      </div>
      {/* =============/End======== */}

      <div className="tracts flex-1 mx-aut w-52 lg:w-full max-w-3xl ml-5 py-2 pt-4 lg:py-1">
        {/* =====Controls======== */}
        <div className="control max-w-md m-auto flex items-center justify-between lg:mb-5">
          <button
            onClick={() => setPlayer({ ...player, shuffle: !player.shuffle })}
            className={`shufftle btn lg:hover:text-amber-300 transition-all invisible -z-10 absolute lg:relative lg:visible ${
              player.shuffle ? "text-amber-400" : ""
            }`}
          >
            <i className="ri ri-shuffle-line"></i>
          </button>

          <button
            onClick={prevTrack}
            className="prev  btn lg:hover:text-amber-300 transition-all lg:hover:bg-warmGray-600 h-10 w-10 rounded-full"
          >
            <i className="ri ri-skip-back-fill"></i>
          </button>

          {/* ==========Play/Pause control============ */}
          {!player.playing ? (
            <button
              type="button"
              onClick={() => playAudio(audioRef.current)}
              className="btn after:h-8 after:w-8 after:rounded-full after:border-2 after:border-amber-100 after:transition-all after:animate-ping after:absolute after:left-0 after:top-0 after:right-0 after:m-auto after:bottom-0  relative bg-amber-300 h-10 w-10 transition-all leading-5  text-white rounded-full flex-shrink-0"
            >
              <i className="ri ri-play-fill"></i>
            </button>
          ) : (
            <button
              onClick={pause}
              className="play btn lg:hover:text-white bg-amber-300 shadow-inner shadow-amber-200 font-bold animate- border-amber-300 border h-10 w-10 text-white rounded-full flex-shrink-0"
            >
              <i className="ri ri-pause-fill"></i>
            </button>
          )}
          {/* ===================== */}

          <button
            onClick={nextTrack}
            className="next btn lg:hover:text-amber-300 transition-all lg:hover:bg-warmGray-600 h-10 w-10 rounded-full"
          >
            <i className="ri ri-skip-forward-fill"></i>
          </button>

          <button
            onClick={loopTrack}
            className={`repeat btn lg:hover:text-amber-300 transition-all invisible -z-10 absolute lg:relative lg:visible ${
              player.loop ? "text-amber-400" : ""
            }`}
          >
            {!player.loop ? (
              <i className="ri ri-repeat-2-fill"></i>
            ) : (
              <i className="ri ri-repeat-one-fill"></i>
            )}
          </button>
        </div>
        {/* ==========/End===========*/}

        {/* =======Seeker tract =========== */}
        <input
          type="range"
          className={`appearance-none invisible -z-10 absolute lg:relative lg:visible rounded-full dark:in-range:bg-dark-100 range w-full`}
          max={player.duration}
          onChange={onChangeSeek}
          id="seekSlider"
        />
        {/* ========== */}
      </div>

      {/* ==========Player Volume Set======== */}
      <div className="flex items-center lg:visible sm:invisible lg:relative sm:absolute justify-between gap-3">
        <div className="volume items-center hidden sm:flex">
          <button className="btn dark:text-white mr-2" onClick={muteAudio}>
            {!player.muted ? (
              <i className="ri ri-volume-up-fill"></i>
            ) : (
              <i className="ri ri-volume-mute-fill"></i>
            )}
          </button>
          <input
            type="range"
            className="input w-full appearance-none dark:in-range:bg-dark-100 rounded-lg h-2"
            value={player.volume}
            id="audioVolume"
            onChange={() => setVolume({ type: "range" })}
            onClick={() => setVolume({ type: "range" })}
          />
        </div>
      </div>
      {/* ================ */}
    </section>
  );
};
