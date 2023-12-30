import React from "react";
import { useFunnel } from "@toss/use-funnel";

import styles from "./Onboarding.module.scss";

export default function Onboarding() {
    const [Funnel, setStep] = useFunnel(["0", "1", "2", "3"] as const);
    return (
        <Funnel>
            <Funnel.Step name="0">
                <div></div>
            </Funnel.Step>
            <Funnel.Step name="1">
                <div></div>
            </Funnel.Step>
            <Funnel.Step name="2">
                <div></div>
            </Funnel.Step>
            <Funnel.Step name="3">
                <div></div>
            </Funnel.Step>
        </Funnel>
    );
}
