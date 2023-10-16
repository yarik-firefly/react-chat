import React from "react";
import "../pages/Home.scss";
import EmojiPicker from "emoji-picker-react";

import smile from "../static/img/Bitmap (5).png";
import camera from "../static/img/Bitmap (6).png";
import path from "../static/img/Path.png";
import micro from "../static/img/image.png";
import recordIco from "../static/img/record.png";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/slices/dialogsSlice";
import chatApi from "../service/chat.service";
import UploadImage from "./Upload/UploadImage";
import { upload } from "../redux/slices/uploadSlice";
import socket from "../core/socket";

export const Input = () => {
  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [attachments, setAttachments] = React.useState([]);
  const [record, setRecord] = React.useState(false);
  const [recorder, setMediaRecorder] = React.useState();
  const [state, setState] = React.useState({
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
    fileList: attachments,
  });

  const { currentDialogId } = useSelector((state) => state.dialogsSlice);
  const { infoMe } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const onError = (err) => {
    console.log("The following error occured: " + err);
  };

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setRecord(true);
    };

    recorder.onstop = () => {
      setRecord(false);
    };

    recorder.ondataavailable = (e) => {
      // const audioUrl = window.URL.createObjectURL(e.data);
      // new Audio(audioUrl).play();
      const file = new File([e.data], "audio.webm");

      // setLoading(true);
      chatApi.upload(file).then(({ data }) => {
        sendAudio(data._id);
      });
    };
  };

  React.useEffect(() => {
    setState({
      ...state,
      fileList: attachments,
    });
  }, [attachments]);

  const handleRecording = () => {
    if (!record) {
      setRecord(!record);
      onRecord();
    } else {
      setRecord(!record);
      recorder.stop();
    }
  };

  const inputRef = React.useRef(null);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      ...state,
      previewOpen: true,
      previewImage: `${file.url || file.preview}`,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleCancel = () => setState({ ...state, previewOpen: false });

  const handleChange = ({ fileList: newFileList }) =>
    setState({ ...state, fileList: newFileList });

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const inputClickHandler = (e) => {
    socket.emit("DIALOG:TYPING", { currentDialogId, user: infoMe });

    if (e.keyCode === 13 || e.type === "click") {
      const obj = {
        text: value,
        dialogId: currentDialogId,
        attachments: attachments.map((item) => item.uid),
      };
      dispatch(sendMessage(obj));

      setValue("");
      setAttachments([]);
    }
  };

  const sendAudio = (audioId) => {
    const obj = {
      text: value,
      dialogId: currentDialogId,
      attachments: [audioId],
    };
    dispatch(sendMessage(obj));
  };

  const onSelectFile = async (files) => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "uploading",
        },
      ];
      setAttachments(uploaded);

      chatApi.upload(file).then(({ data }) => {
        setAttachments(
          (uploaded = uploaded.map((item) => {
            if (item.uid === uid) {
              console.log(data);
              item = {
                uid: data._id,
                name: data.filename,
                url: data.url,
                status: "done",
              };
            }
            return item;
          }))
        );
      });
    }
    setAttachments(uploaded);
  };

  const onInputClick = () => {
    inputRef.current.click();
  };

  const EmojiToValue = (e) => {
    setValue((prev) => prev + e.emoji);
  };
  return (
    <>
      {visible && (
        <EmojiPicker emojiStyle="apple" onEmojiClick={(e) => EmojiToValue(e)} />
      )}
      <div id="my-area">
        <div className="middle-section__my-area">
          <>
            <input
              value={value}
              onKeyUp={inputClickHandler}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                !record ? "Введите текст сообщения…" : "Идёт запись..."
              }
              type="text"
              disabled={record}
            />
            {!record ? (
              <img src={smile} onClick={() => setVisible(!visible)} alt="" />
            ) : (
              <img id="record" src={recordIco} alt="record" />
            )}
            <img
              style={{ pointerEvents: record && "none" }}
              onClick={onInputClick}
              id="camera"
              src={camera}
              alt=""
            />
            <img src={micro} onClick={handleRecording} alt="" />

            <img
              style={{ pointerEvents: record && "none" }}
              src={path}
              onClick={inputClickHandler}
              alt=""
            />
          </>
        </div>
        <input
          ref={inputRef}
          multiple
          onChange={(e) => onSelectFile(e.target.files)}
          type="file"
          hidden
        />
      </div>
      <UploadImage
        fileList={state.fileList}
        handlePreview={handlePreview}
        handleChange={handleChange}
        previewO={state.previewOpen}
        previewT={state.previewTitle}
        previewI={state.previewImage}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Input;
