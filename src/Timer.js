import {useEffect} from "react";
import {useCountDown} from "./UseCountDown";

export const Timer = ({onTimerZeroOut, onTimer15Seconds, shouldStart,}) => {
    const [counter, start, pause, reset] = useCountDown(120)
    useEffect(() => {
        if (shouldStart){
            start()
        }
    }, [shouldStart])

    useEffect(() => {
        if (counter === 0) {
            // game over?
            onTimerZeroOut()
            reset()

        }

    }, [counter])

    return (
        <div
            style={{
                color:'white',
                margin: '0 auto',
                width: "50vw",
                display: "flex",
                height: "5vh"
            }}
        >
            <p
                style={{
                    margin: "0.2em auto",
                    fontSize:"1.3rem"
                }}
            >
                <span>Timer: {counter}</span></p>
        </div>
    )
}