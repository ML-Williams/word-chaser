import './App.css';
import {useCallback, useEffect, useRef, useState} from "react"
import _ from 'underscore'
import {nanoid} from "nanoid";
import {Board} from "./Board";
import {Timer} from "./Timer";
import {Wordbank} from "./Wordbank";

/**
 * UX (user experience):
 * - user comes onto screen and sees:
 *      - tasks for how to make them see that
 * - user preses play:
 *      - add username / click to start game
 * - user selected a letter:
 *      -  highlight
 *
 *  - check word input: isValid, isDuplicated, isNotValid
 *
 * - Add a clear and submit button
 *      - clear button should empty str (word="")
 *      - submit button should accept valid word into word bank or not then clear str(word)
 */

const API_words = 'https://random-word-api.herokuapp.com/all'


const allVowelTiles = [
    {
        letter: "a",
        points: 10,
        vowel: true
    },
    {
        letter: "e",
        points: 10,
        vowel: true
    },
    {
        letter: "i",
        points: 10,
        vowel: true
    },
    {
        letter: "o",
        points: 10,
        vowel: true
    },
    {
        letter: "u",
        points: 20,
        vowel: true
    },
    {
        letter: "a",
        points: 10,
        vowel: true
    },
    {
        letter: "e",
        points: 10,
        vowel: true
    },
    {
        letter: "o",
        points: 10,
        vowel: true
    },
]
    .map(tile => ({...tile, id: nanoid()}))
const allConsonantTiles = [
    {

        letter: "b",
        points: 20,
        vowel: false,
    },
    {
        letter: "c",
        points: 30,
        vowel: false,
    },
    {
        letter: "d",
        points: 20,
        vowel: false,
    },

    {
        letter: "f",
        points: 20,
        vowel: false,
    },
    {
        letter: "g",
        points: 20,
        vowel: false,
    },
    {
        letter: "h",
        points: 20,
        vowel: false,
    },

    {
        letter: "j",
        points: 40,
        vowel: false,
    },
    {
        letter: "k",
        points: 40,
        vowel: false,
    },
    {
        letter: "l",
        points: 20,
        vowel: false,
    },
    {
        letter: "m",
        points: 20,
        vowel: false,
    },
    {
        letter: "n",
        points: 20,
        vowel: false,
    },

    {
        letter: "p",
        points: 30,
        vowel: false,
    },
    {
        letter: "q",
        points: 50,
        vowel: false,
    },
    {
        letter: "r",
        points: 20,
        vowel: false,
    },
    {
        letter: "s",
        points: 20,
        vowel: false,
    },
    {
        letter: "t",
        points: 20,
        vowel: false,
    },
    {
        letter: "v",
        points: 40,
        vowel: false,
    },
    {
        letter: "w",
        points: 30,
        vowel: false,
    },
    {
        letter: "x",
        points: 50,
        vowel: false,
    },
    {
        letter: "y",
        points: 30,
        vowel: false,
    },
    {
        letter: "z",
        points: 50,
        vowel: false,
    },

]
    .map(tile => ({...tile, id: nanoid()}))

export const useCountDown = (
    total,
    ms = 1000,
) => {
    const [counter, setCountDown] = useState(total);
    const [startCountDown, setStartCountDown] = useState(false);
    // Store the created interval
    const intervalId = useRef();
    const start = () => setStartCountDown(true);
    const pause = () => setStartCountDown(false);
    const reset = () => {
        clearInterval(intervalId.current);
        setStartCountDown(false);
        setCountDown(total);
    };

    useEffect(() => {
        intervalId.current = setInterval(() => {
            startCountDown && counter > 0 && setCountDown(counter => counter - 1);
        }, ms);
        // Clear interval when count to zero
        if (counter === 0) clearInterval(intervalId.current);
        // Clear interval when unmount
        return () => clearInterval(intervalId.current);
    }, [startCountDown, counter, ms]);

    return [counter, start, pause, reset];
};

//
// const Submitbar = ({onKeyDown, word}) => {
//
//     return(
//             <input
//                 onSubmit={(e) =>  {
//
//                 }}
//                 onChange={(e) => {
//                     onKeyDown(e.target.value)
//                 }}
//                 value={word}
//                 type={'text'}
//                 placeholder={'Type words here...'}
//                 style={{
//                     display:"block",
//                     margin:"1em auto",
//                     width: '25vw'
//                 }}
//             />
//
//     )
// }
const vowelTiles = _.sample(allVowelTiles, 7)
const consonantTiles = _.sample(allConsonantTiles, 9)

let tiles = [
    ...vowelTiles,
    ...consonantTiles
]
const randomized = _.shuffle(tiles)


export default function App() {
    const [wordBank, setWordBank] = useState()

    useEffect(() => {
        fetch(API_words)
            .then(r => r.json())
            .then(data => {
                setWordBank(data)
            })
    }, [])

    // possibly figure out to iterate "qu" without separating the characters into strs

    const [selectedTiles, setSelectedTiles] = useState([])
    const word = selectedTiles.reduce((accum, tile) => {
        return accum + tile.letter
    }, '')
    const wordScore = selectedTiles.reduce((accum, tile) => {
        return accum + tile.points
    }, 0)
    const [answers, setAnswers] = useState([])
    const [showInvalidWord, setShowInvalidWord]=useState(false)
    const [hasDuplicates, setHasDuplicates]= useState(false)

    const onSubmit = useCallback(() => {
        // word = uon
        // wordBank = [wordswordsword]

        // validations: duplicate answer
        if(answers.includes(word)) {
            setHasDuplicates(true)
                setTimeout(() =>{
                    setHasDuplicates(false)
                    setSelectedTiles([])
                }, 1500)
            /*
                 if validation fails in any way,
                 return so the below code doesn't run
             */
            return
        }

        // submit action
        if (wordBank.includes(word)) {
            setAnswers(prev => [
                ...prev,
                {
                    word: word,
                    points: wordScore
                }])

            setSelectedTiles([])
        }
        else {
            setShowInvalidWord(true)
                setTimeout(() => {
                    setShowInvalidWord(false)
                    setSelectedTiles([])
                }, 1500)
        }
    }, [word, wordBank, answers])

    const clearString = () => {
        setSelectedTiles([])
    }

    window.tiles = randomized

    return (
        <div
            style={{
                display: "flex",
            }}
            className="App"
        >
            <div
                style={{
                    flex: 1
                }}
            >
                <div
                    style={{
                    }}
                >
                <Board
                    tiles={randomized}
                    word={word}
                    selectedTileIds={
                        selectedTiles.map(tile => tile.id)
                    }
                    onTileClick={tile => {
                        // prev = e, tile.letter = 'p' => 'ep'

                        // tiles, selected
                        const ids = selectedTiles.map(
                            selectedTile => selectedTile.id
                        )

                        // tiles -> [ { letter, id, points, etc}]
                        // selectedTiles -> [] ->  [ { letter, id, points, etc} ]
                        // score -> selectedTiles.points
                        // ids -> [ selectedTiles.id ]
                        // word -> selectedTiles.letter



                        // const getNeighbors = (i) => {
                        //     const neighbors = []
                        //     const coords = [
                        //          i + 1, // right
                        //          i - 1, // left
                        //          i - 4,
                        //          i + 4,
                        //          i + 5,
                        //          i - 5,
                        //          i + 3,
                        //          i - 3
                        //     ]
                        //
                        //     coords.forEach((coord, i) => {
                        //         neighbors.push(tiles[coord])
                        //     })
                        //
                        //     return neighbors
                        // }

                        // const tileIndex = randomized.indexOf(tile)// change this to get the current tile's index
                        //
                        // const tileNeighbors = getNeighbors(tileIndex)
                        // let hasNeighbor = true
                        //
                        // tileNeighbors.forEach(neighbor => {
                        //     hasNeighbor = selectedTiles.includes(neighbor)
                        // })
                        //
                        // if (!hasNeighbor) {
                        //     return
                        // }

                        if (!ids.includes(tile.id)) {
                            setSelectedTiles(prev => [...prev, tile])
                        } else {
                            // remove the tile
                            setSelectedTiles(prev => {
                                return prev.filter(
                                    selectedTile =>
                                        selectedTile.id !== tile.id
                                )
                            })
                        }

                    }}
                />
                </div>
                <div
                    style={{
                        textAlign: "center"
                    }}
                >
                    <button
                        onClick={onSubmit}
                    >
                        Submit
                    </button>

                    <button
                        onClick={clearString}
                    >Clear
                    </button>
                </div>
                <Timer
                    onTimer15Seconds={() => {

                    }}
                    onTimerZeroOut={() => {

                    }}/>
                <div
                    style={{
                        margin: '0 auto'
                    }}
                >
                    <p
                        style={{
                            textAlign: "center",
                            margin: 0,
                            padding: 0,

                        }}
                    >{word}
                    </p>
                    {showInvalidWord &&
                        <p
                        style={{
                            textAlign: "center",
                            display: "inline-block",
                            margin: 0,
                            width:  "50%"
                        }}
                    >
                        is not a valid word
                    </p> }
                    {hasDuplicates &&
                        <p
                            style={{
                                textAlign: "center",
                                display: "inline-block",
                                margin: 0,
                                width:  "50%"
                            }}
                        >
                            is a duplicate word
                        </p> }
                </div>


            </div>
            {/** need to have valid words appended in the word bank
             present total score for each letter
             * iterate between the points
             * display total points of word -> need array
             * accumulate overall score
             **/}


            <Wordbank
                answers={answers}
            />
        </div>
    );
}

