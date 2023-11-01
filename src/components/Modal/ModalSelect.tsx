import React from "react";
import { Select, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { findUsers } from "../../redux/slices/userSlice";
import "./Modal.scss";
import { createDialog } from "../../redux/slices/dialogsSlice";
import debounce from "lodash.debounce";
import Loading from "../Loading";
import { AppDispatch, RootState } from "../../redux/store";
import { IModalSelect } from "./index.type";

export const ModalSelect = ({ setShow, show }: IModalSelect) => {
  const { TextArea } = Input;
  const dispatch: AppDispatch = useDispatch();
  const { findUsers: users, statusFindUser } = useSelector(
    (state: RootState) => state.userSlice
  );
  const [value, setValue] = React.useState<string>("");
  const [valueInput, setValueInput] = React.useState<string>("");

  const onSearch = debounce((value: string) => {
    dispatch(findUsers(value));
  }, 700);

  const handleClickCreate = () => {
    if (valueInput && value) {
      const obj: Record<string, string> = {
        text: valueInput,
        partner: value,
      };
      dispatch(createDialog(obj));
      setShow(false);
    }
  };

  // const filterOption = (input, option) =>
  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const options = users.map((el) => (
    <span className="modal" key={el._id}>
      {el.fullname}
      {el.email}
    </span>
  ));

  return (
    <Modal
      title="Создать диалог:"
      open={show}
      onCancel={() => setShow(false)}
      confirmLoading={statusFindUser === "LOADING"}
      cancelText="Закрыть"
      okText="Создать"
      onOk={() => handleClickCreate()}
      okButtonProps={{ disabled: !value || !valueInput }}
    >
      <Select
        listItemHeight={10}
        showSearch
        placeholder="Введите имя или почту пользователя"
        optionFilterProp="children"
        onChange={setValue}
        onSearch={onSearch}
        // filterOption={filterOption}
        // options={options}
        style={{ width: `100%` }}
      >
        {options}
      </Select>
      <TextArea
        value={valueInput}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setValueInput(e.target.value)
        }
        rows={3}
        maxLength={150}
        size="small"
      />
    </Modal>
  );
};

export default ModalSelect;
