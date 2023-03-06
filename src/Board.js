import {Tile} from "./Tile";

export const Board = ({tiles, onTileClick, selectedTileIds, shake}) => {
    return (
        <div

            style={{
                width: "20vw",
                margin: '1em 40%',
                marginBottom:'2em',
                marginTop:'0',
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr 1fr",
                rowGap: '0.1em',
                columnGap: '0.1em'
            }}
        >
            {tiles.map((tile, idx) => {

                    return <Tile
                        shake={shake}
                        onClick={() => {
                            onTileClick(tile)
                        }}
                        key={idx}
                        isSelected={selectedTileIds.includes(tile.id)}
                        tile={tile}
                    />
                }
            )}
        </div>
    )
}