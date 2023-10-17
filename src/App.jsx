import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("")
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&**()~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordClipboard = useCallback(() => {passwordRef.current?.select(); passwordRef.current?.setSelectionRange(0,20); window.navigator.clipboard.writeText(password)},[password])

  useEffect(() => {PasswordGenerator()},[length,numberAllowed.charAllowed,PasswordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 text-orange-400'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'> <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />

          <button onClick={copyPasswordClipboard} className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0'>copy</button></div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={70} value={length} className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} /> <label>Length: {length}</label> </div>
          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
      </div >
   </>
  )
}


export default App
