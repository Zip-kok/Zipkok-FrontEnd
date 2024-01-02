import React, { useState } from "react";
import styles from "./Onboarding.module.css";

import Location from "./Location";
import Price from "./Price";
import Complete from "./Complete";

import leftArrowIcon from "../../assets/left_arrow.svg";
import Type from "./Type";

// location: 온보딩_01_거주지역
// type: 온보딩_02_매물종류
// price: 온보딩_03_가격범위
// complete: 온보딩_04_완료
type StepKeys = "location" | "type" | "price" | "complete";

export type HouseType = "아파트" | "원룸" | "빌라/투룸" | "오피스텔" | null;

export default function Onboarding() {
    const [location, setLocation] = useState("");

  
    const [price, setPrice] = useState("");

    const [houseType, setHouseType] = useState<"아파트" | "원룸" | "빌라/투룸" | "오피스텔" | null>(null);


    const [step, setStep] = useState<StepKeys>("location");
    const steps: Record<StepKeys, JSX.Element> = {
        // location
        location: (
            <Location
                confirmLocation={(location: string) => {
                    setLocation(location);
                    setStep("price");
                }}
            />
        ),

        // type

        type: (
            <Type
                confirmHouseType={(houseType: HouseType) => {
                    setHouseType(houseType);
                    setStep("price");
                }}
            />
        ),

        // price
        price: <Price 
                confirmPrice={(Price: string) => {
                    setPrice(Price);
                    setStep("complete")
                }}
                />,

        // complete
        complete: <Complete />,
    };

    // 프로그레스바 가로 길이를 계산하기 위한 값
    const progresses: Record<StepKeys, number> = {
        location: 1,
        type: 2,
        price: 3,
        complete: 4,
    };
    const progress = (progresses[step] / 3) * 100;

    // 뒤로 가기 버튼을 눌렀을 때
    function handleBackClick() {
        if (step === "location") {
            return;
        } else if (step === "type") {
            setStep("location");
        } else if (step === "price") {
            setStep("type");
        } else if (step === "complete") {
            setStep("price");
        }
    } 

    return (
        <div>
            <div className={styles.topBar}>
                <button className="imgBtn" onClick={handleBackClick}>
                    <img src={leftArrowIcon}></img>
                </button>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.content}>{steps[step]}</div>
        </div>
    );
}
