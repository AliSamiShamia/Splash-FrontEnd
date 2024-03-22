import { ReactNode } from "react";

export type UserType = {
  id: number;
  name: string;
  token: string;
  score: number;
};

export type RoundType = {
  point: number;
  multiplier: number;
  spped?: number;
};

export type GuessType = {
  value: number;
};

export type LayoutProp = {
  children: ReactNode;
};

export type ItemType = {
  icon: string;
  value: string;
};

export type RankingType = {
  data: RankingItemType[];
};
export type RankingItemType = {
  id: number;
  name: string;
  multiplier: string;
  points: string;

  score: string;
};

export type RoundResultType = {
  data: RoundResultItemType[];
};
export type RoundResultItemType = {
  id: number;
  name: string;
  points: string;
  multiplier: string;
  score?: number;
};
export type MessageType = {
  name: string;
  msg: string;
};

export type UserDataType = {
  id?: number;
  name?: string | undefined;
  token?: string;
  score?: number;
  // Add more user properties as needed
};

export type AuthValuesType = {
  loading: boolean;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
};

export type LoginParams = {
  name: string;
};

export type RegisterParams = {
  name: string;
};

export type RoundItemType = {
  title: string;
  value: number;
  step: number;
  action: (value: number) => void;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;
