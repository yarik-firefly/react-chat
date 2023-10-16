import React from "react";
import "./AudioMessage.scss";
import { PauseOutlined } from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";

import audioPath from "../../static/img/Combined Shape (1).png";
import audio from "../../static/img/jg-032316-sfx-clock-tick-with-alarm.mp3";
import currentTime from "../../helpers/currentTime";

export const AudioMessage = ({audioSrc}) => {
  const audioRef = React.useRef(null);
  const progressRef = React.useRef(null);
  const [play, setPlay] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    audioRef.current.addEventListener("playing", audioPlay);
    audioRef.current.addEventListener("ended", audioEnd);

    audioRef.current.addEventListener("timeupdate", function () {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
      setTime(currentTime);
    });
  }, []);

  const audioPlay = () => {
    setPlay(true);
  };
  const audioPause = () => {
    setPlay(false);
  };
  const audioEnd = () => {
    setPlay(false);
    setProgress(0);
    setTime(0);
  };

  const playAudioHandle = () => {
    if (play) {
      setPlay(!play);
      return audioRef.current.pause();
    }

    if (!play) {
      setPlay(!play);
      return audioRef.current.play();
    }
  };

  return (
    
    <div className="audio-message">
      <div
        style={{ width: progress + "%" }}
        ref={progressRef}
        className="audio-message__progress-bar"
      ></div>
      <span className="audio-message__controll" onClick={playAudioHandle}>
        {!play ? <CaretRightOutlined /> : <PauseOutlined />}
      </span>
      <span>
        <img src={audioPath} alt="" />
        <audio ref={audioRef} src={audioSrc} />
      </span>
      <span>{currentTime(time)}</span>
    </div>
  );
};

export default AudioMessage;
