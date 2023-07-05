import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { useEffect, useState } from "react";


const Navbar = () => {
    const [navbarLoggedIn, setNavbarLoggedIn] = useState(false);
    const handleSignOut = () => {
        signOut(auth).then(() => {
          setNavbarLoggedIn(false);
        }).catch((error) => {
          console.error(error)
        })
    }

      useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setNavbarLoggedIn(true);
            }
          })
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