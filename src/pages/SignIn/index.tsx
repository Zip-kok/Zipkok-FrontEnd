import { useState } from "react";

import Birth from "./Birth";
import Complete from "./Complete";
import Gender from "./Gender";
import NickName from "./NickName";

import styles from "./SignIn.module.css";

import leftArrowIcon from "../../assets/left_arrow.svg";

type StepKeys = "nickname" | "gender" | "birth" | "complete";

export default function SignIn() {
  const [step, setStep] = useState<StepKeys>("nickname");

  const steps: Record<StepKeys, JSX.Element> = {
    nickname: <NickName onConfirm={() => setStep("gender")} />,
    gender: <Gender />,
    birth: <Birth />,
    complete: <Complete />,
  };

  function isBackBtn(step: StepKeys) {
    if (step === "nickname") {
      return false;
    } else {
      return true;
    }
  }

  function handleBackClick() {
    if (step === "gender") {
      setStep("nickname");
    } else if (step === "birth") {
      setStep("gender");
    }
  }

  return (
    <div className={styles.root}>
      {isBackBtn(step) && (
        <div className={styles.topBar}>
          <button className="imgBtn" onClick={handleBackClick}>
            <img src={leftArrowIcon}></img>
          </button>
        </div>
      )}
      <div className={styles.content}>{steps[step]}</div>
    </div>
  );
}
