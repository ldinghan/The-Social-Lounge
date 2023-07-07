import { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { database, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface Player {
    x: number;
    y: number;
    color: string;
    name: string;
    coins: number;
  }
  
  interface Coin {
    id: string;
    x: number;
    y: number;
  }


const FloatingButtons = () => {
  const [moving, setMoving] = useState(false);
  const [players, setPlayers] = useState<{ [key:string]: Player}>({});
  const [coins, setCoins] = useState<{ [key:number|string]: Coin}>({});
  const [currentPlayerEmail, setCurrentPlayerEmail] = useState("");
  let playerId:any = "";
  let playerRef:any;
  const allPlayersRef = ref(database, 'players');
  const allCoinsRef = ref(database, 'coins/coinList');
  const [direction, setDirection] = useState("");

  if (auth.currentUser) {
    playerId = auth.currentUser.uid;
    playerRef = ref(database, `players/${playerId}`);
  }
  onAuthStateChanged(auth, (user:any) => {
    if (user) {
        playerId = user.uid;
        playerRef = ref(database, `players/${playerId}`);
        players[playerId] = players[playerId] || {};
    } 
    else {
        setCurrentPlayerEmail("");
    }
  })  

  useEffect(() => {
      const collectCoin = (id:string) => {
        players[playerId].coins++;
        update(playerRef,  players[playerId]);
        const coinRef = ref(database, `coins/coinList/${id}`)
        remove(coinRef);
      }

      const checkCoin = (newX: number, newY: number) => {
        Object.keys(coins).map((id) => {
          if (Math.abs(newX - (coins[id].x-1.5)) < 4 &&
              Math.abs(newY - (coins[id].y-2)) < 4) {
            collectCoin(id);
          }
        })
      }

      const canMoveTo = (newX: number, newY:number) => {
        return newX >= 0 && newX <= 43 && newY >= 0 && newY <= 43;
      }

      const updatePosition = (newX:number, newY:number) => {
        players[playerId].x = newX;
        players[playerId].y = newY;
        update(playerRef,  players[playerId]);
        if (auth.currentUser && auth.currentUser.email) {
          setCurrentPlayerEmail(auth.currentUser.email);
        }
      }

      function handleKeyPress(key: any) {
        if (!auth.currentUser) {
          return;
        }
        let xChange = 0;
        let yChange = 0;
        if (key === "ArrowUp") {
          yChange = -1;
        } else if (key === "ArrowDown") {
          yChange = 1;
        } else if (key === "ArrowLeft") {
          xChange = -1;
        } else if (key === "ArrowRight") {
          xChange = 1;
        } else {
          return;
        }
        const newX = (players[playerId]?.x || 0) + xChange;
        const newY = (players[playerId]?.y || 0) + yChange;
        if (canMoveTo(newX, newY)) { //if can move
          players[playerId] = players[playerId] || {};
          updatePosition(newX, newY);
          checkCoin(newX, newY);
        }
      }
      let interval:ReturnType<typeof setInterval>;
      if (moving) {
        interval = setInterval(() => {
          handleKeyPress(direction);
        }, 100)
      }
      return () => clearInterval(interval)
    }, [moving])

    const handleKeyDown = (arrowKey:string) => {
      setDirection(arrowKey)
      setMoving(true);
    }
    const handleKeyRelease = () => {
      setDirection("");
        setMoving(false);
    }
    useEffect(() => {
      onValue(allPlayersRef, (snapshot) => {
      setPlayers(snapshot.val() || {});
    })
    onValue(allCoinsRef, (snapshot) => {
        setCoins(snapshot.val() || {});
    })
  }, []);
    return (
        <div className="grid grid-rows-3 grid-cols-3 fixed bottom-10 left-10 w-40 h-40 border border-4 border-red-500">
            <div></div>
            <button className="" onTouchEnd={handleKeyRelease} onTouchStart={e => handleKeyDown("ArrowUp")} onMouseUp={handleKeyRelease} onMouseDown={e => handleKeyDown("ArrowUp")}>UP</button>
            <div></div>
            <button className="" onTouchEnd={handleKeyRelease} onTouchStart={e => handleKeyDown("ArrowLeft")}onMouseUp={handleKeyRelease} onMouseDown={e => handleKeyDown("ArrowLeft")}>LEFT</button>
            <div></div>
            <button className="" onTouchEnd={handleKeyRelease} onTouchStart={e => handleKeyDown("ArrowRight")}onMouseUp={handleKeyRelease} onMouseDown={e => handleKeyDown("ArrowRight")}>RIGHT</button>
            <div></div>
            <button className="" onTouchEnd={handleKeyRelease} onTouchStart={e => handleKeyDown("ArrowDown")}onMouseUp={handleKeyRelease} onMouseDown={e => handleKeyDown("ArrowDown")}>DOWN</button>
            <div></div>
        </div>
    )
}

export default FloatingButtons;