import React, { useRef } from 'react';

import deleteIcon from 'assets/img/fill/delete.svg';
import { TextInputStyle } from 'types/TextInput';

import styles from './TextInput.module.css';

interface TextInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  icon?: string;
  numberOnly?: boolean;
  style?: TextInputStyle;
  onClick?: () => void;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  caption?: string;
  captionStyle?: React.CSSProperties;
  maxLength?: number;
  ref?: React.Ref<HTMLInputElement>;
  readOnly?: boolean;
}

export default function TextInput({
  value,
  defaultValue,
  placeholder,
  icon,
  numberOnly,
  style = 'underline',
  onClick,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  caption,
  captionStyle,
  maxLength = 524288,
  readOnly,
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    if (numberOnly) {
      const value = e.currentTarget.value;
      if (value.length > maxLength)
        e.currentTarget.value = value.slice(0, maxLength);

      if (parseInt(value) < 0) e.currentTarget.value = '0';
    }
    onChange && onChange(e);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!numberOnly) return;
    if (
      e.key === 'e' ||
      e.key === 'E' ||
      e.key === '.' ||
      e.key === '-' ||
      e.key === '+'
    )
      e.preventDefault();
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (onSubmit) onSubmit();
    }
  }

  function handleDeleteClick() {
    if (inputRef.current) {
      inputRef.current.value = '';
      if (onChange)
        onChange({
          currentTarget: inputRef.current,
        } as React.FormEvent<HTMLInputElement>);
    }
  }

  function handleInputFocus() {
    onFocus && onFocus();
  }

  function handleInputBlur() {
    onBlur && onBlur();
  }

  function handleBoxFocus() {
    setIsFocused(true);
  }

  function handleBoxBlur() {
    setIsFocused(false);
  }

  return (
    <div
      className={styles.container}
      onFocus={handleBoxFocus}
      onBlur={handleBoxBlur}
    >
      <div
        className={`${styles.textBox} ${
          readOnly && onClick ? styles.clickable : ''
        } ${
          {
            underline: styles.underline,
            roundedBox: styles.roundedBox,
          }[style]
        }`}
      >
        <input
          type={numberOnly ? 'number' : 'text'}
          defaultValue={defaultValue}
          onClick={onClick}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={value}
          placeholder={placeholder}
          ref={inputRef}
          maxLength={maxLength}
          readOnly={readOnly}
        ></input>

        {isFocused &&
        inputRef.current &&
        inputRef.current.value !== '' &&
        !readOnly ? (
          <button className="imgBtn" onClick={handleDeleteClick}>
            <img src={deleteIcon}></img>
          </button>
        ) : (
          <img src={icon}></img>
        )}
      </div>
      {caption && (
        <span className={styles.caption} style={captionStyle}>
          {caption}
        </span>
      )}
    </div>
  );
}
