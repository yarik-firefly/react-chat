export interface IRegisterRequest {
  email: string;
  fullname: string;
  password: string;
  password2: string;
}

export interface IRegisterOrLoginProps {
  toggle: "LOGIN" | "REGISTER";
  setToggle: React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;
  status: boolean;
}
