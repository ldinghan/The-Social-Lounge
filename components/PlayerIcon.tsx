
interface PlayerIcon {
    currentPlayer: string;
    x: number;
    y: number;
    name: string;
    color: string;
    coins: number;
    online: boolean;
}

const PlayerIcon = ({currentPlayer, x, y, name, color, coins, online}:PlayerIcon) => {
    const isCurrentPlayer:boolean = currentPlayer.substring(0, currentPlayer.indexOf("@")) == name;
    const tailwindCSS = `w-[15%] h-[15%] absolute flex flex-col justify-center items-center`;
    const style = {
        left: `${x*2}%`,
        top: `${y*2}%`,
        backgroundColor: `${online ? color : '#999999'}`,
        border: `${isCurrentPlayer ? '3px solid #FFFFBB' : ''}`,
        zIndex: `${isCurrentPlayer ? 999 : online ? 99 : 1}`,

    }
    return (
        <>
            <div style={style} className={tailwindCSS}>
                <p className="bg-white text-center w-fit px-3">{name}</p>
                <p className="mt-1 text-center bg-gray-200 w-fit px-3">{coins}</p>    
            </div>
        </>
    )
}

export default PlayerIcon;