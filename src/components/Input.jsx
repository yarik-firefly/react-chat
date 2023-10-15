import React from "react";
import "../pages/Home.scss";
import EmojiPicker from "emoji-picker-react";

import smile from "../static/img/Bitmap (5).png";
import camera from "../static/img/Bitmap (6).png";
import path from "../static/img/Path.png";
import micro from "../static/img/image.png";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/slices/dialogsSlice";
import chatApi from "../service/chat.service";
import UploadImage from "./Upload/UploadImage";

export const Input = () => {
  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [attachments, setAttachments] = React.useState([]);
  const [state, setState] = React.useState({
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
    fileList: attachments,
  });

  React.useEffect(() => {
    setState({
      ...state,
      fileList: attachments,
    });
  }, [attachments]);

  const inputRef = React.useRef(null);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(123);
    }
    setState({ ...state, previewImage: file.url || file.preview });
    setState({ ...state, previewOpen: true });
    setState({
      ...state,
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

  const [fileList, setFileList] = React.useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const { currentDialogId } = useSelector((state) => state.dialogsSlice);

  const dispatch = useDispatch();

  const inputClickHandler = (e) => {
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

      chatApi.uploadImage(file).then(({ data }) => {
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
          <input
            value={value}
            onKeyUp={inputClickHandler}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите текст сообщения…"
            type="text"
          />
          <img src={smile} onClick={() => setVisible(!visible)} alt="" />
          <img onClick={onInputClick} id="camera" src={camera} alt="" />
          <img src={micro} alt="" />

          <img src={path} onClick={inputClickHandler} alt="" />
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
