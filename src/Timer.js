import {useEffect} from "react";
import {useCountDown} from "./App";

export const Timer = ({onTimerZeroOut, onTimer15Seconds}) => {
    const [counter, start, pause, reset] = useCountDown(120)
    useEffect(() => {
        start()
    }, [])

    useEffect(() => {
        if (counter === 0) {
            // game over?
            onTimerZeroOut()

        }

    }, [counter])

    return (
        <div
            style={{
                margin: '0 auto',
                width: "50vw",
                display: "flex",
                backgroundColor: "#f5e6ab",
                height: "5vh"
            }}
        >
            <p
                style={{
                    margin: "0.5em auto"
                }}
            >
                <span>Round: 1</span> <span>Timer: {counter}</span></p>
        </div>
    )
}