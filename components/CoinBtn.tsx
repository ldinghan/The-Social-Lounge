import { useEffect, useState } from "react"; 
import { ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";
import Timer from "./Timer";


interface Coin {
    id:string;
    x:number;
    y:number;
}



const CoinBtn = () => {
    const [timerKey, setTimerKey] = useState(0);
    const [coins, setCoins] = useState<{ [key:number|string]: Coin}>({});
    const [disabled, setDisabled] = useState(true);
    const [timerComponent, setTimerComponent] = useState(<Timer initialMinute={3} initialSeconds={0}/>);
    
    
    const drawCoin = async () => {
        const coinRef = ref(database, 'coins');
        setCoins(((await get(coinRef)).val() || {}));
        const coinCountRef = ref(database, 'coins/count');
        const coinCount = (await get(coinCountRef)).val();

        const x:number = Math.round(Math.random()*43);
        const y:number = Math.round(Math.random()*43);
        const id:string = coinCount;
        coins[id] = { id, x, y};
        set(coinRef, {
          coinList: coins,
          count: coinCount+1
        });
      }

      const allCoinsRef = ref(database, 'coins/coinList');
      useEffect(() => {
        onValue(allCoinsRef, (snapshot) => {
            setCoins(snapshot.val() || {});
          })
      }, []);

    const handleClick = () => {
        drawCoin();
        setTimerComponent(<Timer initialMinute={3} initialSeconds={0} key={timerKey}/>);
        setTimerKey(key => key + 1);
        setDisabled(true);
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setDisabled(false);
        }, 180000);

        return () => clearTimeout(timer);
    }, [disabled]);

    return (
        <>
            {timerComponent}
            <button title="You can only generate one coin every 3 minutes." className="bg-green-600" onClick={handleClick} disabled={disabled} type="button">GENERATE COIN</button>
            
        </>
    )
}

export default CoinBtn;