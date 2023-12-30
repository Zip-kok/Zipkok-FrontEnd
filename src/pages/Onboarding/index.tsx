import React, { useState } from "react";
import styles from "./Onboarding.module.scss";

import Location from "./Location";
import Type from "./Type";
import Price from "./Price";
import Complete from "./Complete";

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
    return steps[step];
}
