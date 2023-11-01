import React, { ChangeEvent, SyntheticEvent } from "react";
import "../../pages/Home.scss"
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";

import smile from "../../static/img/Bitmap (5).png";
import camera from "../../static/img/Bitmap (6).png";
import path from "../../static/img/Path.png";
import micro from "../../static/img/image.png";
import recordIco from "../../static/img/record.png";

import { useDispatch, useSelector } from "react-redux";
import chatApi from "../../service/chat.service";
import UploadImage from "../Upload/UploadImage";
import socket from "../../core/socket";
import { AppDispatch, RootState } from "../../redux/store";
import { ISendMessageRequest, IUploadResponse } from "../../types/slice";
import {
  IAttachments,
  ISetState,
  IUploadData,
  TypeUploaded,
  TypeUploadedData,
} from "./Input.type";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { IMessagesProps } from "../../containers/index.type";
import { sendMessage } from "../../redux/slices/dialogsSlice";

export const Input = ({ setIsTyping }: Omit<IMessagesProps, "isTyping">) => {
  const [value, setValue] = React.useState<string>("");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [attachments, setAttachments] = React.useState<
    UploadFile<IAttachments>[]
  >([]);
  const [record, setRecord] = React.useState<boolean>(false);
  const [recorder, setMediaRecorder] = React.useState<MediaRecorder>();
  const [state, setState] = React.useState<ISetState>({
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
    fileList: attachments,
  });

  const { currentDialogId } = useSelector(
    (state: RootState) => state.dialogsSlice
  );
  const { infoMe } = useSelector((state: RootState) => state.authSlice);

  const dispatch: AppDispatch = useDispatch();
  const navigator = window.navigator;

  // @ts-ignore
  navigator.getUserMedia =
    // @ts-ignore
    navigator.getUserMedia ||
    // @ts-ignore
    navigator.mozGetUserMedia ||
    // @ts-ignore
    navigator.msGetUserMedia ||
    // @ts-ignore
    navigator.webkitGetUserMedia;

  const onError = (err: Error) => {
    console.log("The following error occured: " + err);
  };

  const onRecord = () => {
    // @ts-ignore

    if (navigator.getUserMedia) {
      // @ts-ignore

      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setRecord(true);
    };

    recorder.onstop = () => {
      setRecord(false);
    };

    recorder.ondataavailable = (e: BlobEvent) => {
      const file = new File([e.data], "audio.webm");

      //@ts-ignore
      chatApi.upload(file).then(({ data }: IUploadData) => {
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
      recorder && recorder.stop();
    }
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setState({
      ...state,
      previewOpen: true,
      previewImage: `${file.url || file.preview}`,
      previewTitle:
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    });
  };

  const handleCancel = () => setState({ ...state, previewOpen: false });

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setState({ ...state, fileList: newFileList });

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const inputClickHandler = <TypeEvent extends UIEvent | SyntheticEvent>(
    e: TypeEvent
  ): void => {
    socket.emit("DIALOG:TYPING", { currentDialogId, user: infoMe });

    //@ts-ignore
    if (e.key === "Enter" || e.type === "click") {
      setIsTyping(false);
      const obj: ISendMessageRequest = {
        text: value,
        dialogId: currentDialogId as string,
        attachments: attachments.map((item) => item.uid),
      };
      dispatch(sendMessage(obj));

      setValue("");
      setAttachments([]);
    }
  };

  const sendAudio = (audioId: string) => {
    const obj = {
      text: value,
      dialogId: currentDialogId as string,
      attachments: [audioId],
    };
    dispatch(sendMessage(obj));
  };

  const onSelectFile = async (files: TypeUploadedData[]) => {
    let uploaded: UploadFile<IAttachments>[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const uid = Math.round(Math.random() * 1000);
      //@ts-ignore
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "uploading",
        },
      ];
      setAttachments(uploaded);

      chatApi.upload(file).then((data: IUploadResponse["data"]) => {
        setAttachments(
          (uploaded = uploaded.map((item) => {
            if (+item.uid === uid) {
              console.log(data);
              item = {
                uid: +data._id,
                name: data.filename,
                url: data.url,
                status: "done",
              };
            }
            return item;
          })) as UploadFile<IAttachments>[]
        );
      });
    }
    setAttachments(uploaded);
  };

  const onInputClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const EmojiToValue = (e: EmojiClickData) => {
    setValue((prev) => prev + e.emoji);
  };
  return (
    <>
      {visible && (
        <EmojiPicker
          emojiStyle={EmojiStyle.APPLE}
          onEmojiClick={(e: EmojiClickData) => EmojiToValue(e)}
        />
      )}
      <div id="my-area">
        <div className="middle-section__my-area">
          <>
            <input
              value={value}
              onKeyUp={(e) =>
                inputClickHandler<React.KeyboardEvent<HTMLInputElement>>(e)
              }
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
              style={{ pointerEvents: record ? "none" : undefined }}
              onClick={onInputClick}
              id="camera"
              src={camera}
              alt=""
            />
            <img src={micro} onClick={handleRecording} alt="" />

            <img
              style={{ pointerEvents: record ? "none" : undefined }}
              src={path}
              onClick={(e) =>
                inputClickHandler<React.MouseEvent<HTMLImageElement>>(e)
              }
              alt=""
            />
          </>
        </div>
        <input
          ref={inputRef}
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSelectFile(e.target.files as unknown as TypeUploadedData[])
          }
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