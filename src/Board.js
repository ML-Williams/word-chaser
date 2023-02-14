import {Tile} from "./Tile";

export const Board = ({tiles, onTileClick, selectedTileIds}) => {
    return (
        <div
            style={{
                width: "20vw",
                margin: '3em auto',
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr 1fr",
                rowGap: '0.1em',
                columnGap: '0.1em'
            }}
        >
            {tiles.map((tile, idx) => {

                    return <Tile
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