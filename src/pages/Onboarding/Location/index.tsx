import React, { useState, useRef } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

import styles from "./Location.module.css";

import searchIcon from "../../../assets/search.svg";
import deleteIcon from "../../../assets/delete.svg";
import searchArrowIcon from "../../../assets/search_arrow.svg";

import { JUSO_KEY } from "../../../keys";

interface LocationProps {
    confirmLocation: (location: string) => void;
}

export default function Location({ confirmLocation }: LocationProps) {
    const isKeyboardOpen = useDetectKeyboardOpen();
    const locationInputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState(""); // 검색어
    const [hasSearched, setHasSearched] = useState(false); // 검색 여부
    const [searchResult, setSearchResult] = useState<any>(); // 검색 결과
    const [location, setLocation] = useState(""); // 최종 지역
    const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setHasSearched(false);
        setLocation("");
        setQuery(e.target.value);
    }

    async function handleConfirmClick() {
        if (location === "" && query !== "") {
            const res = await fetch(
                `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${JUSO_KEY}&resultType=json&keyword=${query}`
            );
            const data = await res.json();
            setHasSearched(true);
            setSearchResult(data.results);
        } else if (location !== "") {
            confirmLocation(query);
        }
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

            <div className={styles.searchBoxContainer}>
                <div
                    className={styles.searchBox}
                    onFocus={() => setIsSearchBoxFocused(true)}
                    onBlur={() => setIsSearchBoxFocused(false)}
                >
                    <input
                        type="text"
                        onChange={handleQueryChange}
                        placeholder="도로명, 지번 검색"
                        id="locationInput"
                        ref={locationInputRef}
                    ></input>
                    {isSearchBoxFocused ? (
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
                {hasSearched && location === "" && (
                    <span className={styles.addressCount}>
                        {searchResult.common.totalCount.toLocaleString()}건의 검색 결과
                    </span>
                )}
            </div>

            {hasSearched && location === "" && (
                <div className={styles.addressContainer}>
                    {searchResult.common.errorMessage !== "정상" && (
                        <span className={styles.errorMessage}>{searchResult.common.errorMessage}</span>
                    )}
                    {searchResult.common.errorMessage === "정상" && searchResult.common.totalCount === "0" && (
                        <span className={styles.errorMessage}>
                            일치하는 검색 결과가 없어요
                            <br />
                            주소를 다시 확인해주세요
                        </span>
                    )}
                    {searchResult.juso?.map((address: any) => (
                        <button
                            className={styles.addressBtn}
                            key={address.bdMgtSn}
                            onClick={() => {
                                setLocation(address.roadAddr);
                                locationInputRef.current!.value = address.roadAddr;
                            }}
                        >
                            <span>{address.roadAddr}</span>
                            <img src={searchArrowIcon}></img>
                        </button>
                    ))}
                </div>
            )}

            {!(hasSearched && location === "") && (
                <div className={`${styles.footer} ${isKeyboardOpen ? styles.full : ""}`}>
                    {!isKeyboardOpen && <a>나중에 설정하기</a>}
                    <button
                        className={`btnBottom ${isKeyboardOpen ? "btnKeyboard" : ""}`}
                        disabled={query === ""}
                        onClick={handleConfirmClick}
                    >
                        확인
                    </button>
                </div>
            )}
        </div>
    );
}
