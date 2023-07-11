import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, database } from "../firebase";
import { useEffect, useState } from "react";
import { ref, update } from "firebase/database";

const Navbar = () => {
    const [navbarLoggedIn, setNavbarLoggedIn] = useState(false);
    const handleSignOut = () => {
        if (auth.currentUser) {
          const playerRef = ref(database, `players/${auth.currentUser.uid}`);
          update(playerRef, {online: false});
          signOut(auth).then(() => {
            setNavbarLoggedIn(false);
          }).catch((error) => {
            console.error(error)
          })
        }
    }

      useEffect(() => {
        const setOffline = () => {
          if (auth.currentUser) {
            const playerRef = ref(database, `players/${auth.currentUser.uid}`);
            update(playerRef, {online: false});
          }
        }
        onAuthStateChanged(auth, user => {
          if (user) {
            setNavbarLoggedIn(true);
            const playerRef = ref(database, `players/${user.uid}`) ;
            update(playerRef, {online: true});
          }
        })
        window.addEventListener('beforeunload', setOffline);

        return () => {
          window.removeEventListener('beforeunload', setOffline);
        }
      }, []);



    return (    
        <div className="w-screen bg-green-300 flex justify-around items-center h-14 ">
            <Link href="/" className='border-2 border-green-400 text-center h-auto w-24 hover:bg-green-500'>Home</Link>
            
            {!navbarLoggedIn ? <><Link href="/register" className='border-2 border-green-400 text-center h-auto w-24 hover:bg-green-500'>Register</Link>
            <Link href="/login" className='border-2 border-green-400 text-center h-auto w-24 hover:bg-green-500'>Login</Link></> 
            : 
            <Link href="/" onClick={handleSignOut} className='border-2 border-green-400 text-center h-auto w-24 hover:bg-green-500'>Sign out</Link>}
        </div>
    )
}

export default Navbar;