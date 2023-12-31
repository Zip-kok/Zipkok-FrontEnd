import React, { useState, useRef } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

import styles from "./Location.module.css";

import searchIcon from "../../../assets/search.svg";
import deleteIcon from "../../../assets/delete.svg";

interface LocationProps {
    confirmLocation: (location: string) => void;
}

export default function Location({ confirmLocation }: LocationProps) {
    const isKeyboardOpen = useDetectKeyboardOpen();
    const locationInputRef = useRef<HTMLInputElement>(null);

    const [location, setLocation] = useState("");

    const [isLocationInputFocused, setIsLocationInputFocused] = useState(false);

    function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value);
    }

    function handleConfirmClick() {
        confirmLocation(location);
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <h1>
                    희망 거주 지역을
                    <br />
                    알려주세요.
                </h1>
            </div>

            <div
                className={styles.searchBox}
                onFocus={() => setIsLocationInputFocused(true)}
                onBlur={() => setIsLocationInputFocused(false)}
            >
                <input
                    type="text"
                    onChange={handleLocationChange}
                    placeholder="도로명, 지번 검색"
                    id="locationInput"
                    ref={locationInputRef}
                ></input>
                {isLocationInputFocused ? (
                    <button
                        className="imgBtn"
                        onClick={() => {
                            if (locationInputRef.current) locationInputRef.current.value = "";
                        }}
                    >
                        <img src={deleteIcon}></img>
                    </button>
                ) : (
                    <button className="imgBtn" onClick={() => {}}>
                        <img src={searchIcon}></img>
                    </button>
                )}
            </div>

            <div className={`${styles.footer} ${isKeyboardOpen ? styles.full : ""}`}>
                {!isKeyboardOpen && <a>나중에 설정하기</a>}
                <button
                    className={`btnBottom ${isKeyboardOpen ? "btnKeyboard" : ""}`}
                    disabled={location === ""}
                    onClick={handleConfirmClick}
                >
                    확인
                </button>
            </div>
        </div>
    );
}
