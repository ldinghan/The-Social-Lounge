
interface CoinIcon {
    x: number;
    y: number;

}
const CoinIcon = ({ x, y, }: CoinIcon) => {
    const tailwindCSS = `w-[50px] h-[50px] absolute bg-yellow-300 border border-4 border-yellow-600 rounded-full`;
    const style = {
        left: `${x*2}%`,
        top: `${y*2}%`,
    }
    return (
        <>
            <div style={style} className={tailwindCSS}>
            </div>
        </>
    )
}


export default CoinIcon;