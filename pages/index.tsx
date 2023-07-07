import Head from 'next/head';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import { useState } from "react";
import Navbar from '../components/Navbar';
import GameContainer from '../components/GameContainer';
import CoinBtn from '../components/CoinBtn';
import SettingsContainer from '../components/SettingsContainer';

export default function Home() {
  
  
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user:any) => {
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.email.substring(0, user.email.indexOf("@")));
      
    } else {
      setIsLoggedIn(false);
    }
  })  



  



  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-center items-center'>
        <Navbar />
        {isLoggedIn ? 
          <>
            <p>Hi {username}!</p>
            <CoinBtn/>
            <SettingsContainer/>
          </> : <div className='my-4'></div>}
        
        <div className='w-[600px] h-[600px] flex justify-center items-center'>
          <GameContainer />
          
        </div>
      </div>
    </>
    
  )
}
