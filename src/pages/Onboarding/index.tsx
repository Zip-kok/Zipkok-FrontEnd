import React, { useState } from "react";
import styles from "./Onboarding.module.css";

import Location from "./Location";
import Type from "./Type";
import Price from "./Price";
import Complete from "./Complete";

import leftArrowIcon from "../../assets/left_arrow.svg";

// location: 온보딩_01_거주지역
// type: 온보딩_02_매물종류
// price: 온보딩_03_가격범위
// complete: 온보딩_04_완료
type StepKeys = "location" | "type" | "price" | "complete";

export default function Onboarding() {
    const [step, setStep] = useState<StepKeys>("location");

    const steps: Record<StepKeys, JSX.Element> = {
        location: <Location />,
        type: <Type />,
        price: <Price />,
        complete: <Complete />,
    };

    const progresses: Record<StepKeys, number> = {
        location: 1,
        type: 2,
        price: 3,
        complete: 4,
    };
    const progress = (progresses[step] / 4) * 100;

    return (
        <div>
            <div className={styles.topBar}>
                <button className={styles.imgBtn}>
                    <img src={leftArrowIcon}></img>
                </button>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
            {steps[step]}
        </div>
    );
}
