import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { database, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import PlayerIcon from "./PlayerIcon";


const GameContainer = () => {
  const [players, setPlayers] = useState({});
  const [currentPlayerEmail, setCurrentPlayerEmail] = useState("");
  let playerId:any = "";
  
  let playerRef:any;


  

  
    useEffect(() => {
      const canMoveTo = (newX: number, newY:number) => {
        return newX >= 0 && newX <= 46 && newY >= 0 && newY <= 43;
      }
      const updatePosition = (newX:number, newY:number) => {
        set(playerRef, players[playerId]);
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
          players[playerId].x = newX;
          players[playerId].y = newY;
          updatePosition(newX, newY);
          
        }
      }
      document.addEventListener("keydown", handleKeyPress);
      // clean up
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [playerRef, players, playerId])

    useEffect(() => {
      const allPlayersRef = ref(database, 'players');
      onValue(allPlayersRef, (snapshot) => {
        setPlayers(snapshot.val() || {});

        
        
      })
    }, []);




    if (auth.currentUser) {
        playerId = auth.currentUser.uid;
        playerRef = ref(database, `players/${playerId}`);
    }
    onAuthStateChanged(auth, (user:any) => {
        if (user) {
            playerId = user.uid;
            playerRef = ref(database, `players/${playerId}`);
        } else {
          console.log("user signed out");
          
        }
      })  
  

      
    console.log(currentPlayerEmail)

    
    return (
        <div className="w-full h-full bg-emerald-100 relative">

          {Object.keys(players).map((playerId) => {
            return <PlayerIcon currentPlayer={currentPlayerEmail} color={players[playerId]?.color} x={players[playerId]?.x} y={players[playerId]?.y} key={playerId} name={players[playerId]?.name}/>
          })}
          
        </div>
    )
  }


export default GameContainer;