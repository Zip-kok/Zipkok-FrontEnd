import React from "react";
import styles from "./AddressContainer.module.css";
import Address from "../../types/Address";
import AddressBtn from "../AddressBtn";

interface AddressContainerProps {
    errorMessage?: string;
    addresses: Address[];
    onClick: (address: Address) => void;
}

export default function AddressContainer({ errorMessage, addresses, onClick }: AddressContainerProps) {
    return (
        <div className={styles.container}>
            {errorMessage !== "" ? (
                <span className={styles.errorMessage}>{errorMessage}</span>
            ) : (
                addresses.map((address) => (
                    <AddressBtn key={address.bdMgtSn} address={address} onClick={() => onClick(address)} />
                ))
            )}
        </div>
    );
}
