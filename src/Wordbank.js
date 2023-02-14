export const Wordbank = ({answers}) => {
    return (
        <div
            style={{
                overflow:"auto",
                border: "1px solid black",
                height: "75vh",
                width: "20vw",


            }}
        >
            {answers.map((answer, index) => {
                return (
                    <p key={index}>
                        {answer.word}
                        {answer.points}
                    </p>

                )
            })}




        </div>
    )
}