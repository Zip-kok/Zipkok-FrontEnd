import React from "react";
import styles from "./AddressBtn.module.css";
import Address from "../../types/Address";
import searchArrowIcon from "../../assets/search_arrow.svg";

interface AddressBtnProps {
    address: Address;
    onClick: () => void;
}

export default function AddressBtn({ address, onClick }: AddressBtnProps) {
    return (
        <button className={styles.addressBtn} key={address.bdMgtSn} onClick={onClick}>
            <span>{address.roadAddr}</span>
            <img src={searchArrowIcon}></img>
        </button>
    );
}