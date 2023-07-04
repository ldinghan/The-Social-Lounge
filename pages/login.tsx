import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import Navbar from '../components/Navbar';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = async (e:any) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // User successfully logged in
        window.location.href="/";
        console.log("logged in")
      } catch (error:any) {
        setError(error.message);
      }
    };




    return (
      <>
        <Navbar />
        <div>
        <h2 className='text-4xl text-center mb-5'>Log in</h2>
            <form className='flex flex-col justify-center items-center' onSubmit={handleLogin}>
          <div className='my-2'>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-black mx-2'
            />
          </div>
          <div className='my-2'>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-black mx-2'
            />
          </div>
          <div>
            <button type="submit" className="border border-2 hover:border-white px-5 h-full w-full flex justify-evenly items-center hover:bg-gradient-to-r hover:from-violet-200 hover:to-emerald-200">
              Login
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
        </div>
        </>
    )
}

export default Login;