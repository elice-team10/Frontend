export const NICKNAME_REGEX = /^[A-Za-z가-힣0-9]{2,10}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PWD_REGEX = /^.{5,}$/;

// 영어 소문자, 대문자, 숫자, 특수문자 포함 8~24자
export const PWD_DIFFICULT_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
