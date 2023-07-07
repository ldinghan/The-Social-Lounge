import { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { database, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import PlayerIcon from "./PlayerIcon";
import CoinIcon from "./CoinIcon";

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

const GameContainer = () => {
  const [players, setPlayers] = useState<{ [key:string]: Player}>({});
  const [coins, setCoins] = useState<{ [key:number|string]: Coin}>({});
  const [currentPlayerEmail, setCurrentPlayerEmail] = useState("");
  let playerId:any = "";
  let playerRef:any;
  const allPlayersRef = ref(database, 'players');
  const allCoinsRef = ref(database, 'coins/coinList');




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
        if (key.code === "ArrowUp") {
          yChange = -1;
        } else if (key.code === "ArrowDown") {
          yChange = 1;
        } else if (key.code === "ArrowLeft") {
          xChange = -1;
        } else if (key.code === "ArrowRight") {
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
      document.addEventListener("keydown", handleKeyPress);
      // clean up
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [playerRef, players, playerId])


    useEffect(() => {
        onValue(allPlayersRef, (snapshot) => {
        setPlayers(snapshot.val() || {});
      })
      onValue(allCoinsRef, (snapshot) => {
          setCoins(snapshot.val() || {});
      })
    }, []);





      

    return (
        <div className="w-full h-full bg-emerald-100 relative">

          {Object.keys(players).map((id) => {
            return <PlayerIcon currentPlayer={currentPlayerEmail} color={players[id].color} x={players[id].x} y={players[id].y} key={id} name={players[id].name} coins={players[id].coins}/>
          })}
          {Object.keys(coins).map((id) => {
            return <CoinIcon id={id} x={coins[id].x} y={coins[id].y} key={id}/>
          })}
        </div>
    )
  }


export default GameContainer;