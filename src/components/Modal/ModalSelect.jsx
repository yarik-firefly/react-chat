import React from "react";
import { Select, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { findUsers } from "../../redux/slices/userSlice";
import "./Modal.scss";
import { createDialog } from "../../redux/slices/dialogsSlice";
import debounce from "lodash.debounce";

export const ModalSelect = ({ setShow, show }) => {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { findUsers: users, statusFindUser } = useSelector(
    (state) => state.userSlice
  );
  const [value, setValue] = React.useState(null);
  const [valueInput, setValueInput] = React.useState(null);
  console.log(value);

  const onSearch = debounce((value) => {
    dispatch(findUsers(value));
  }, 700);

  const handleClickCreate = () => {
    const obj = {
      text: valueInput,
      partner: value,
    };
    dispatch(createDialog(obj));
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
        loading={statusFindUser === "LOADING"}
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
        onChange={(e) => setValueInput(e.target.value)}
        rows={3}
        maxLength={150}
        size="small"
      />
    </Modal>
  );
};

export default ModalSelect;
