import backgroundImage from './woodentile.png'
import './App.css';
import {useCallback, useEffect, useState} from "react"
import _ from 'underscore'
import {nanoid} from "nanoid";
import {Board} from "./Board";
import {Timer} from "./Timer";
import {Wordbank} from "./Wordbank";
import { Button } from '@mantine/core'


/**
  UX (user experience):
 * - user comes onto screen and sees:
 *      - tasks for how to make them see that
 * - user preses play:
 *      - add username / click to start game
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

const vowelTiles = _.sample(allVowelTiles, 5)
const consonantTiles = _.sample(allConsonantTiles, 11)

let tiles = [
    ...vowelTiles,
    ...consonantTiles
]
const randomizedTiles = _.shuffle(tiles)


export default function App() {
    const [wordBank, setWordBank] = useState()
    const [isTimerStart, setIsTimerStart]=useState(false)
    useEffect(() => {
        fetch(API_words)
            .then(r => r.json())
            .then(data => {
                setWordBank(data)
            })
    }, [])


    const [selectedTiles, setSelectedTiles] = useState([])

    useEffect(() => {

    }, [selectedTiles])
    const word = selectedTiles.reduce((accum, tile) => {
        return accum + tile.letter
    }, '')
    const wordScore = selectedTiles.reduce((accum, tile) => {
        return accum + tile.points
    }, 0)
    const [totalScore, setTotalScore]= useState(0)

    const addScore = (wordScore) => {
        setTotalScore(totalScore + wordScore)

    }
    const [answers, setAnswers] = useState([])
    const [showInvalidWord, setShowInvalidWord]=useState(false)
    const [hasDuplicates, setHasDuplicates]= useState(false)
    const [bestWord, setBestWord] = useState('')

    const onSubmit = useCallback(() => {
        // word = uon
        // wordBank = [wordswordsword]

        // validations: duplicate answer

        const answersWords = answers.map(answer => answer.word)
        if(answersWords.includes(word)) {
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
            addScore(wordScore)
            setSelectedTiles([])
        }
        else {
            setShowInvalidWord(true)
                setTimeout(() => {
                    setShowInvalidWord(false)
                    setSelectedTiles([])
                }, 1500)
        }
    }, [word, wordBank, answers, wordScore, addScore])


    const onTileClick = (tile) => {
        // prev = e, tile.letter = 'p' => 'ep'

        // tiles, selected
        const ids = selectedTiles.map(
            selectedTile => selectedTile.id
        )
        //
        // tiles -> [ { letter, id, points, etc}]
        // selectedTiles -> [] ->  [ { letter, id, points, etc} ]
        // score -> selectedTiles.points
        // ids -> [ selectedTiles.id ]
        // word -> selectedTiles.letter
        const getNeighbors = (i) => {
            const neighbors = []
            const coords = [];

                    // right
            if ((i + 1) % 4 !== 0) {
                coords.push(i + 1);
            }
                    // left
            if (i % 4 !== 0) {
                coords.push(i - 1);
            }
                    // top
            if (i >= 4) {
                coords.push(i - 4);
            }
                    // bottom
            if (i < 12) {
                coords.push(i + 4);
            }
                    // bottom right
            if ((i + 1) % 4 !== 0 && i < 12) {
                coords.push(i + 5);
            }
                    // top left
            if (i % 4 !== 0 && i >= 4) {
                coords.push(i - 5);
            }
                    // bottom left
            if (i % 4 !== 0 && i < 12) {
                coords.push(i + 3);
            }
                    // top right
            if ((i + 1) % 4 !== 0 && i >= 4) {
                coords.push(i - 3);
            }

            coords.forEach((coord) => {
                neighbors.push(randomizedTiles[coord])
            })

            return neighbors
        }
        const tileIndex = randomizedTiles.indexOf(tile)

        const tileNeighbors = getNeighbors(tileIndex)
        let hasSelectedNeighbor = false

        const lastSelected = selectedTiles[selectedTiles.length - 1]
        if(lastSelected === tile){
            onSubmit()
        }
        for (let i = 0; i < tileNeighbors.length; i++) {
            if (lastSelected === tileNeighbors[i]){
                hasSelectedNeighbor = true
                break
            }

        }
        if (!hasSelectedNeighbor && selectedTiles.length !== 0) {
            handleShake()
            return
        }

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

    }
    const clearString = () => {
        setSelectedTiles([])
    }

    const Submitbar = ({onChange, word}) => {

        return(
            <input
                autoFocus
                onSubmit={onSubmit}
                onKeyDown={(e) => {
                    onChange(e)
                }}
                value={word}
                type={'text'}
                placeholder={'Type words here...'}
                style={{
                    color:'white',
                    border:'none',
                    backgroundColor:'#3b7041',
                    display:"block",
                    marginLeft:'35%',
                    marginRight:'1%',
                    width: '25vw'
                }}
            />

        )
    }
    const [openModal, setOpenModal] = useState(true)
    const Modal = () => {

      return(
       <div className="modalBackground">
           <div style={{
               backgroundImage:`url(${backgroundImage})`
           }}
               className="modalContainer">
               <div className="title">
                   <h1>Welcome to Word Chaser</h1>
               </div>
               <div className="body">
                   <p>INSTRUCTIONS</p>
               </div>
               <div className="footer">
                   <Button

                       variant="gradient"
                       gradient={{ from: 'forestgreen', to: 'lime', deg: 105
                   }}

                       onClick={() => {
                           setIsTimerStart(
                               (prev) => prev === false
                           )
                           setOpenModal(false)
                       }}

                   > Play

                   </Button>
               </div>
           </div>
       </div>
      )

   }
    const [highestScore, setHighestScore] = useState(0)

   const [gameOverModal, setGameOverModal] = useState(false)
    useEffect(() => {
        // const storedBestWord = localStorage.getItem('bestWord')
        const storedHighestScore  = localStorage.getItem('highestScore')
            if (storedHighestScore && parseInt(storedHighestScore) > highestScore ){
            setHighestScore(parseInt(storedHighestScore))
        }
         // if(storedBestWord){
         //     setBestWord(JSON.parse(storedBestWord))
         // }
    }, [highestScore])
   const GameOverModal = () => {
       useEffect(() => {
           if (totalScore > highestScore) {
               setHighestScore(totalScore)
               localStorage.setItem('highestScore', totalScore)
           }
       }, [totalScore])


      return(
       <div
           className="EndModalBackground"
       >
           <div
               style={{
               backgroundImage:`url(${backgroundImage})`
           }}
               className="EndModalContainer">
               <div
                   className="EndTitle"
               >
                   <h1>Game Over</h1>
               </div>
               <div
                   style={{
                       display:'flex',
                       flexDirection:'column'
                   }}
                   className="body">
                   <p
                       style={{
                           fontWeight:'bold'
                       }}
                   >SCOREBOARD</p>
                   <p><a
                       style={{
                           fontWeight:'bold',
                       }}
                   >High Score:</a> {highestScore}</p>
                   <p><a
                       style={{
                           fontWeight:'bold',
                       }}
                   >Your Score:</a> {totalScore}</p>
                   {/*<p>Best Word: {bestWord} {bestWord.points} </p>*/}
               </div>
               <div className="footer">
                   <Button
                       variant="gradient"
                       gradient={{ from: 'forestgreen', to: 'lime', deg: 105
                       }}
                      className="AgainButton"
                       onClick={() =>{
                           setOpenModal(true)
                           setGameOverModal(false)
                           window.location.reload()
                       }}

                   >
                       Play Again?
                   </Button >
               </div>
           </div>
       </div>
      )
   }
    const [submitBarInput, setSubmitBarInput] = useState('')
    const [shake, setShake] = useState(false)
    const handleShake = () => {
        setShake(true)
        setTimeout(() => setShake(false), 1000)
    }

    return (
        <div
            style={{
                display: "flex",
            }}
            className="App"
        >
            {
                openModal && <Modal />
            }
            {
                gameOverModal &&
                <GameOverModal  />
            }
            <div
                style={{
                    flex: 1
                }}
            >
                <div
                    style={{
                        marginLeft:'7%',
                        color:"white",
                        marginTop:'10px',
                        fontSize:'2rem',
                        textAlign:"center",
                    }}
                >
                    {totalScore}
                </div>
                <div

                    style={{
                        textAlign:"center",
                    }}
                >

                <Board
                    shake={shake}
                    score={totalScore}
                    tiles={randomizedTiles}
                    word={word}
                    selectedTileIds={
                        selectedTiles.map(tile => tile.id)
                    }
                    onTileClick={onTileClick}
                />
                </div>

                <div>
                    {/*<Timerbar>*/}
                    {/*    <style>*/}
                    {/*     {*/}
                    {/*    height: 30px;*/}
                    {/*    border-radius: 15px;*/}
                    {/*    background-image: linear-gradient(to right, red, yellow);*/}
                    {/*    animation: timer 60s linear;*/}
                    {/*}*/}

                    {/*    </style>*/}

                    {/*</Timerbar>*/}
                <Timer
                    shouldStart={isTimerStart}
                    onTimer15Seconds={() => {

                    }}
                    onTimerZeroOut={() => {
                            setGameOverModal(true)
                    }}
                />
                </div>
                <div
                    style={{
                        display:'flex'
                    }}
                >
                    <Submitbar
                        style={{

                            border:'none',
                            borderRadius:'5px'
                        }}
                        value={submitBarInput}
                        onChange={e => {
                            const key = e.key
                            //  letter -> tile
                            if (key === 'Enter'){
                                onSubmit()
                                return
                            }
                            if (key ==="Backspace") {

                                const newSelectedTiles = selectedTiles.slice(0, -1)
                                setSelectedTiles(
                                    newSelectedTiles
                                )
                                return
                            }
                            const foundTiles = []
                            randomizedTiles.forEach((tile) => {
                                if (tile.letter === key ){
                                    foundTiles.push(tile)
                                }
                            })
                            console.log(foundTiles)
                            if (foundTiles.length > 0){
                                setSubmitBarInput(prev => `${prev}${key}`)
                                foundTiles.forEach(tile => onTileClick(tile))
                            }
                            else {
                                handleShake()
                            }
                        }}
                        word={word}
                    />
                    <div>
                        <button
                            style={{
                                backgroundColor:'green',
                                color:"white",
                            }}
                            onClick={onSubmit}
                        >
                            ✓
                        </button>

                        <button
                            style={{
                                backgroundColor:'red',
                                color:"white",
                            }}
                            onClick={clearString}
                        >X
                        </button>
                    </div>
                </div>
                        <div>
                    <p
                        style={{
                            textTransform:'uppercase',
                            color: 'white',
                            fontSize: '1.8rem',
                            textAlign: "center",
                            margin: 0,
                            padding: 0,

                        }}
                    >{word}
                    </p>
                    {showInvalidWord &&
                        <p
                        style={{
                            textTransform:'uppercase',
                            color:'white',
                            fontSize:'1.6rem',
                            margin: '0 auto',
                            textAlign: "center",
                            display: "flex",
                            flexDirection:"column"
                        }}
                    >
                        is not a valid word
                    </p> }
                    {hasDuplicates &&
                        <p
                            style={{
                                textTransform:'uppercase',
                                color: "white",
                                display:'flex',
                                flexDirection:'column',
                                fontSize:'1.6rem',
                                margin: '0 auto',
                                textAlign: "center",
                            }}
                        >
                            is a duplicate word
                        </p> }
                        </div>


            </div>

            <div
                style={{
                    backgroundColor:'white',
                }}
            >
            <Wordbank
                answers={answers}
            />
            </div>
        </div>
    );
}

