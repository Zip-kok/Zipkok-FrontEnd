import React from "react";

import styles from "./Complete.module.css"
import Lottie from "lottie-react";
import checkLottie from "../../../assets/checkLottie.json"
import { useNavigate } from "react-router-dom";



export default function Complete() {
    
    const navigate = useNavigate();
    const handleNextBtnClick = () => {
        navigate("/onboarding");
    }

    const handleSkipBtnClick = () => {
        navigate("/");
    }


    return (
    <div className={styles.root}>
        <div className={styles.imgContainer}>
            <Lottie animationData={checkLottie} loop={false}/>
        </div>
        <p className={styles.completeText}>프로필 설정을 완료했어요!</p>
        <p className={styles.detailText}>키워드 설정 후
        <br />더 빠르게 매물을 검색해보세요</p>
        <div className={styles.footer}>   
            <button className={styles.skipBtn} onClick={handleSkipBtnClick}>나중에 설정하기</button>
            <button className={styles.nextBtn} onClick={handleNextBtnClick}>
            키워드 설정하러 가기
            </button>
        </div>
    </div>
    )
}
