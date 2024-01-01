import React, { useRef } from "react";
import styles from "./LoginInput.module.css";
import deleteIcon from "../../assets/delete.svg";

interface LoginInputProps {
    value?: string;
    placeholder?: string;
    icon?: string;
    numberOnly?: boolean;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
}

export default function LoginInput({ value, placeholder, icon, numberOnly, onChange, onSubmit }: LoginInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (onSubmit) onSubmit();
        }
    }

    function handleDeleteClick() {
        if (inputRef.current) {
            inputRef.current.value = "";
            if (onChange) onChange({ currentTarget: inputRef.current } as React.FormEvent<HTMLInputElement>);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.textBox}>
                <input
                    type={numberOnly ? "number" : "text"}
                    onChange={onChange}
                    onKeyUp={handleKeyUp}
                    value={value}
                    placeholder={placeholder}
                    ref={inputRef}
                ></input>

                {inputRef.current?.value !== "" ? (
                    <button className="imgBtn" onClick={handleDeleteClick}>
                        <img src={deleteIcon}></img>
                    </button>
                ) : (
                    <button className="imgBtn" onClick={() => {}}>
                        <img src={icon}></img>
                    </button>
                )}
            </div>
        </div>
    );
}
