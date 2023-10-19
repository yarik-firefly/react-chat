import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { noData } from "../static/img/noData";
import DialogItem from "../components/messages/DialogItem";
import Loading from "../components/Loading";
import socket from "../core/socket";
import { addMessage, getMessages } from "../redux/slices/dialogsSlice";

const Dialogs = () => {
  const { dialogs, statusDialogs, currentDialogId } = useSelector(
    (state) => state.dialogsSlice
  );

  // const onNewMessage = () => (mes) => {
  //   console.log(mes);
  //   dispatch(addMessage(mes));
  // };

  //   React.useEffect(() => {
  //     // if (currentDialogId) {
  //     //   dispatch(getMessages(currentDialogId));
  //     // }

  //     socket.on("SERVER:NEW_MESSAGE", (data) => console.log(data));

  //     return () => {
  //       socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
  //     };
  //   }, []);

  return (
    <div>
      {dialogs.length ? (
        dialogs.map((el) => (
          <DialogItem
            selectDialog={currentDialogId === el._id}
            key={el._id}
            isSuccess={statusDialogs === "SUCCESS"}
            {...el}
          />
        ))
      ) : (
        <>
          <div className="middle-section__scroll-bar__no-data">{noData()}</div>
          <p id="text">Диалоги отсутствуют</p>
        </>
      )}
    </div>
  );
};

export default Dialogs;
