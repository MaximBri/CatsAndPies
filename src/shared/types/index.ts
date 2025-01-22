import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

export interface UserDataInterface {
  name: string;
  email?: string | null;
  birthday: Date | string;
  hobby: string;
  season: string;
  flower: string;
  dish: string;
  chillTime: string;
  film: string;
  singer: string;
  color: string;
  positiveTraits: string;
  dream: string;
}

export interface saveUserDataInterface extends UserDataInterface {
  setCanChangeInput: (value: React.SetStateAction<boolean>) => void;
  questionnaire: boolean | null;
  dispatch: Dispatch<UnknownAction>;
}

export interface FieldEtranceData {
  title: string;
  value: string;
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((text: string) => void);
  canChangeInput: boolean;
  main: boolean;
  placeholder: string;
}

export interface AuthProps {
  data: {
    auth: React.Dispatch<React.SetStateAction<boolean>>;
    reg: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export interface catInterface {
  existed: boolean;
  data: catDataInterface;
}

export interface catDataInterface {
  name: string | null;
  description: string | null;
  role: string | null;
  phrase: string | null;
  color: string | null;
}

export interface NotificationIntreface {
  message: string;
  statusCode: number;
}

export interface messageInterface {
  dispatch: any;
  message: string;
  statusCode: number;
}

export interface RegisterLogicReturnType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  repeatPass: string;
  setRepeatPass: React.Dispatch<React.SetStateAction<string>>;
  register: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}
export interface RegisterLogicEntanceType {
  login: string;
  pass: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthMess: React.Dispatch<React.SetStateAction<string>>;
  setStateAuthErr: React.Dispatch<React.SetStateAction<string>>;
}

export interface FieldWithSelectsEtranceData {
  title: string;
  value: string;
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((text: string) => void);
  canChangeInput: boolean;
  placeholder: string;
  variants: string[];
}
