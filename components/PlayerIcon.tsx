interface PlayerIcon {
    currentPlayer: string;
    x: number;
    y: number;
    name: string;
    color: string;
}

const PlayerIcon = ({currentPlayer, x, y, name, color}:PlayerIcon) => {

    const tailwindCSS = `w-[15%] h-[15%] absolute flex justify-center items-center`;
    const style = {
        left: `${x*2}%`,
        top: `${y*2}%`,
        backgroundColor: color,
        border: `${currentPlayer.substring(0, currentPlayer.indexOf("@")) == name ? '3px solid #FFFFBB' : ''}`
    }
    return (
        <>
            <div style={style} className={tailwindCSS}>
                <p className="bg-white text-center w-fit px-3">{name}</p>    
            </div>
        </>
    )
}

export default PlayerIcon;