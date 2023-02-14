// modal
import {useState} from "react";
import backgroundImage from './woodentile.png'


export const Tile = ({tile, onClick, isSelected}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const border = `1px solid ${isSelected ? 'red' : 'black'}`
    return (
        <span
            onClick={() => {
                onClick()
            }}
            onMouseEnter={() => {
              setHoveredIndex(true)
            }}
            onMouseLeave={ () => {
               setHoveredIndex(null)
            }}
            style={{
                transform: hoveredIndex ? 'translateY(-10px)': 'none',
                transition:'transform 0.3s ease',
                cursor: 'pointer',
                backgroundImage:`url(${backgroundImage})`,
                backgroundPosition: 'center center',
                fontSize: "40px",
                margin: '1px auto',
                border,
                height: '7vh',
                width: '5vw',
                textAlign: "center",
                color: 'black'
            }}
        >
            {tile.letter}
        </span>
    )

}