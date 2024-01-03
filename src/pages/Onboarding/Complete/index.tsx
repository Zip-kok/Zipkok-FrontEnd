import React from "react";

import styles from "./Complete.module.css"
import Lottie from "lottie-react";
import checkLottie from "../../../assets/checkLottie.json"
import { useNavigate } from "react-router-dom";



export default function Complete() {
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }


    return (<div className={styles.root}>
        <div className={styles.imgContainer}>
        <Lottie animationData={checkLottie} loop={false}/>
        </div>
        <p className={styles.completeText}>키워드 설정을 완료했어요!</p>
        <p className={styles.detailText}>선택한 내용은 
        <br />마이페이지에서 수정 가능해요</p>

        <div className={styles.footer}>   
            <button onClick={handleClick}>
            홈으로 돌아가기
            </button>
        </div>
    </div>
    )
}
