import { useEffect, useState } from "react"; 
import { ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";


interface Coin {
    x:number;
    y:number;
}
const CoinBtn = () => {
    const [coins, setCoins] = useState<{ [key:number|string]: Coin}>({});
    const drawCoin = async () => {
        const coinRef = ref(database, 'coins');
        setCoins(((await get(coinRef)).val() || {}));
        const coinCountRef = ref(database, 'coins/count');
        const coinCount = (await get(coinCountRef)).val();

        const x:number = Math.random()*46;
        const y:number = Math.random()*46;
        const id:number = coinCount;
        coins[id] = {x, y};
        set(coinRef, {
          coinList: coins,
          count: coinCount+1
        });
      }


      useEffect(() => {
        const allCoinsRef = ref(database, 'coins/coinList');
        onValue(allCoinsRef, (snapshot) => {
            setCoins(snapshot.val() || {});
          })
      })



    const [disabled, setDisabled] = useState(true);

    const handleClick = () => {
        console.log('clicked')
        drawCoin();
        setDisabled(true);
    }







    useEffect(() => {
        const timer = setTimeout(() => {
            setDisabled(false);
        }, 180000);

        return () => clearTimeout(timer);
    }, [disabled]);
    return (
        <button title="You can only generate one coin every 3 minutes." className="bg-green-600" onClick={handleClick} disabled={disabled} type="button">GENERATE COIN</button>
    )
}

export default CoinBtn;