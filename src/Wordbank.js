import {useEffect, useRef} from "react";


export const Wordbank = ({answers}) => {
    // scrolls to bottom when user has filled up box
    const divRef = useRef(null)
    useEffect(() => {
        const div = divRef.current
        if (div.scrollHeight > div.clientHeight){
            div.scrollTo(0, div.scrollHeight)
        }
    }, [answers])
    return (
        <div
            ref={divRef}
            style={{
                fontSize: '1.2rem',
                overflow:"auto",
                backgroundColor: "#185929",
                boxShadow:'inset 0 0 20px rgba(0, 0, 0, 0.2)',
                height: "75vh",
                width: "20vw",


            }}
        >
            {answers.map((answer, index) => {
                return (
                    <p
                        style={{
                            color:'white',
                            textTransform:'uppercase'
                        }}
                        key={index}>
                        <p
                            style={{
                                margin:'0 15%',
                                width:'20%',
                                display:'inline-block',
                                textAlign:'justify',

                            }}
                        >{answer.word}</p>
                        <p
                            style={{
                                margin:'0 15%',
                                width:'20%',
                                display:'inline-block',
                                textAlign:'justify',
                            }}
                        >+{answer.points}</p>
                    </p>

                )
            })}




        </div>
    )
}