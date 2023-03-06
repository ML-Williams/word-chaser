import {useEffect} from "react";
import {useCountDown} from "./UseCountDown";

export const Timer = ({onTimerZeroOut, onTimer15Seconds, shouldStart,}) => {
    const [counter, start, reset] = useCountDown(120)
    useEffect(() => {
        if (shouldStart){
            start()
        }
    }, [shouldStart, start])

    useEffect(() => {
        if (counter === 0) {
            // game over
            onTimerZeroOut()
            reset()

        }

    }, [counter, reset, onTimerZeroOut])

    return (
        <div
            style={{
                borderRadius:'5px',
                textAlign:'center',
                backgroundColor: "#185929",
                boxShadow:'inset 0 0 20px rgba(0, 0, 0, 0.2)',
                color:'white',
                marginLeft:'25px',
                width: "10vw",
                display: "flex",
                height: "5vh"
            }}
        >
            <p
                style={{
                    margin: "auto",
                    fontSize:"1.2rem"
                }}
            >
                <span> {counter}</span></p>
        </div>
    )
}