import React, { useRef } from 'react';
import deleteIcon from 'assets/img/fill/delete.svg';
import styles from './TextInput.module.css';

import { TextInputStyle } from 'types/TextInput';

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
      if (value.length > maxLength) {
        inputRef.current!.value = value.slice(0, maxLength);
      }
    }
    onChange && onChange(e);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!numberOnly) return;
    if (e.key === 'e' || e.key === '.' || e.key === '-' || e.key === '+')
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

  function handleFocus() {
    setIsFocused(true);
    onFocus && onFocus();
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur && onBlur();
  }

  return (
    <div className={styles.container}>
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
          onFocus={handleFocus}
          onBlur={handleBlur}
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
