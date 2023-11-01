import React from "react";
import "./AudioMessage.scss";
import { PauseOutlined } from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";

import audioPath from "../../static/img/Combined Shape (1).png";
import currentTime from "../../helpers/currentTime";
interface IAudio {
  audioSrc: string;
}

export const AudioMessage = ({ audioSrc }: IAudio) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const [play, setPlay] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("playing", audioPlay);
      audioRef.current.addEventListener("ended", audioEnd);

      audioRef.current.addEventListener("timeupdate", function () {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          setProgress((currentTime / duration) * 100);
          setTime(currentTime);
        }
      });
    }
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
    if (play && audioRef.current) {
      setPlay(!play);
      return audioRef.current.pause();
    }

    if (!play && audioRef.current) {
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
        <img id="audio-wave" src={audioPath} alt="" />
        <audio ref={audioRef} src={audioSrc} />
      </span>
      <span id="current-time">{currentTime(time)}</span>
    </div>
  );
};

export default AudioMessage;
