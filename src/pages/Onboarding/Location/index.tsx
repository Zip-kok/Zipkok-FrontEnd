import React, { useState } from "react";

import styles from "./Location.module.css";

import searchIcon from "../../../assets/search.svg";

interface LocationProps {
    confirmLocation: (location: string) => void;
}

export default function Location({ confirmLocation }: LocationProps) {
    const [location, setLocation] = useState("");

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
                    희망 거주 지역을<br></br>알려주세요.
                </h1>
            </div>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    onChange={handleLocationChange}
                    placeholder="도로명, 지번 검색"
                    id="locationInput"
                ></input>
                <img src={searchIcon}></img>
            </div>
            <div className={styles.footer}>
                <a>나중에 설정하기</a>
                <button className="btnBottom" disabled={location === ""} onClick={handleConfirmClick}>
                    확인
                </button>
            </div>
        </div>
    );
}
