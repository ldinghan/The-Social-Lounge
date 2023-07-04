

const PlayerIcon = ({currentPlayer, x, y, name, color}:any) => {

    if (currentPlayer.substring(0, currentPlayer.indexOf("@")) == name ) {

    }


    const tailwindCSS = `w-[100px] h-[100px] absolute flex justify-center items-center`;
    const style = {
        left: `${x*2}%`,
        top: `${y*2}%`,
        backgroundColor: color,
        border: `${currentPlayer.substring(0, currentPlayer.indexOf("@")) == name ? '5px solid #FFFFBB' : ''}`
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