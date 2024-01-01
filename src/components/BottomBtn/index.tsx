import React from "react";
import styles from "./BottomBtn.module.css";
import Btn from "../Btn";

interface BottomBtnProps {
    onClick: () => void;
    text: string;
    onAnchorClick?: () => void;
    anchorText?: string;
    isKeyboardOpen?: boolean;
    disabled?: boolean;
}

export default function BottomBtn({
    onClick,
    text,
    onAnchorClick,
    anchorText = "",
    isKeyboardOpen = false,
    disabled = false,
}: BottomBtnProps) {
    console.assert(
        anchorText === "" || onAnchorClick !== undefined,
        "onAnchorClick must be provided if anchorText is provided"
    );
    return (
        <div className={`${styles.container} ${isKeyboardOpen ? styles.full : ""}`}>
            {anchorText !== "" && (
                <a className={styles.anchor} onClick={onAnchorClick}>
                    {anchorText}
                </a>
            )}
            <Btn onClick={onClick} text={text} isKeyboardOpen={isKeyboardOpen} disabled={disabled} />
        </div>
    );
}
