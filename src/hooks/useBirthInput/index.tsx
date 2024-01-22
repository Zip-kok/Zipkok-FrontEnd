import React, { useState, useCallback } from 'react';
import TextInput from 'components/TextInput';
import { TextInputStyle } from 'components/TextInput';

export default function useBirthInput() {
  const [birth, setBirth] = useState<Date>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const date = getDateFromString(value);

    if (value.length === 6) {
      const isValid = date !== null;
      setIsValid(isValid);

      if (!isValid) setWarningMsg('유효하지 않은 생년월일입니다.');
      else {
        setBirth(date);
        setWarningMsg('');
      }
    } else {
      setIsValid(false);
      setWarningMsg('');
    }
  };

  interface BirthInputProps {
    defaultValue?: string;
    placeholder?: string;
    handleSubmit?: () => void;
    style?: TextInputStyle;
    caption?: string;
    captionStyle?: React.CSSProperties;
  }

  const BirthInput = useCallback(
    ({
      defaultValue,
      placeholder,
      handleSubmit,
      style,
      caption,
      captionStyle,
    }: BirthInputProps) => (
      <TextInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        numberOnly
        style={style}
        maxLength={6}
        onChange={handleChange}
        onSubmit={handleSubmit}
        caption={caption}
        captionStyle={captionStyle}
      />
    ),
    [],
  );

  // 날짜 문자열로부터 Date 객체를 반환하는 함수
  const getDateFromString = (birthString: string) => {
    if (birthString.length !== 6) return null;

    const year_prefix =
      parseInt(birthString.substring(0, 2)) > 24 ? '19' : '20';
    const formatted_date = `${year_prefix}${birthString.substring(
      0,
      2,
    )}-${birthString.substring(2, 4)}-${birthString.substring(4, 6)}`;

    if (isNaN(Date.parse(formatted_date))) return null;
    return new Date(formatted_date);
  };

  return [BirthInput, birth, isValid, warningMsg] as [
    typeof BirthInput,
    typeof birth,
    typeof isValid,
    typeof warningMsg,
  ];
}
