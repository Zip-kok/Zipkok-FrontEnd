import React, { useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

import LoginInput from "../../../components/LoginInput";
import AddressContainer from "../../../components/AddressContainer";
import BottomBtn from "../../../components/BottomBtn";

import styles from "./Location.module.css";
import Address from "../../../types/Address";

import searchIcon from "../../../assets/search.svg";

import { JUSO_KEY } from "../../../keys";

interface LocationProps {
    confirmLocation: (location: string) => void;
}

export default function Location({ confirmLocation }: LocationProps) {
    const isKeyboardOpen = useDetectKeyboardOpen();

    const [inputValue, setInputValue] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    async function searchAddress(query: string) {
        try {
            const res = await fetch(
                `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${JUSO_KEY}&resultType=json&keyword=${query}`
            );
            const data = await res.json();
            return await data.results;
        } catch (e) {
            return null;
        }
    }

    function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        setSelectedAddress(null);
        setInputValue(e.currentTarget.value);
    }

    function handleAddressClick(address: Address) {
        setInputValue(address.roadAddr);
        setAddresses([]);
        setSelectedAddress(address);
    }

    async function handleSubmit() {
        if (inputValue === "") return;
        if (selectedAddress) {
            confirmLocation(selectedAddress.roadAddr);
        } else {
            const data = await searchAddress(inputValue);

            if (data === null) {
                setErrorMessage("주소를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
                setAddresses([]);
            } else if (data.common.totalCount === "0") {
                if (data.common.errorMessage === "정상")
                    setErrorMessage("일치하는 검색 결과가 없어요.\n주소를 다시 확인해주세요.");
                else setErrorMessage(data.common.errorMessage);
                setAddresses([]);
            } else {
                setErrorMessage("");
                setAddresses(data.juso as Address[]);
            }
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

            <LoginInput
                placeholder="도로명, 지번 검색"
                value={inputValue}
                icon={searchIcon}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
            />
            <AddressContainer errorMessage={errorMessage} addresses={addresses} onClick={handleAddressClick} />
            {addresses.length === 0 && (
                <BottomBtn
                    onClick={handleSubmit}
                    text="확인"
                    onAnchorClick={() => {}}
                    anchorText="나중에 설정하기"
                    isKeyboardOpen={isKeyboardOpen}
                    disabled={inputValue === ""}
                />
            )}
        </div>
    );
}
