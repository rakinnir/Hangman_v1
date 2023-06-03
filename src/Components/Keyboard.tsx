import { AppContext, AppContextValueProps } from "../AppContextProvider"
import { useContext, useEffect, useState } from "react"
import { BodyParts } from "./BodyParts"

// types
type keyboardProp = (event: KeyboardEvent) => void
type onScreenProp = (event: string) => void
type keyStateProp = {
  letter: string
  isRight: boolean
}[]

const letters = "abcdefghijklmnopqrstuvwxyz".split("")

const Keyboard = () => {
  const [keyState, setKeyState] = useState<keyStateProp>(
    letters.map((letter) => ({ letter, isRight: {} as boolean })) //{} as boolean is for faking typeScript
  )

  // context values
  const {
    pressedKeys,
    randomWord,
    incorrectGuess,
    randomIndex,
    isGameOver,
    isWinner,
    setPressedKeys,
    setIncorrectGuess,
  } = useContext(AppContext) as AppContextValueProps

  // push pressed key via onScreen keyboard + counts incorrect guesses
  const handlePressedKey: onScreenProp = (letter: string) => {
    if (!pressedKeys.includes(letter)) {
      setPressedKeys([...pressedKeys, letter])
      if (!randomWord.includes(letter) && incorrectGuess < BodyParts.length) {
        setIncorrectGuess((prev) => prev + 1)
      }
    }
  }

  // at reload complex function
  useEffect(() => {
    // push pressed key via physical keyboard + counts incorrect guesses
    const handlePressedKey: keyboardProp = (event) => {
      if (!pressedKeys.includes(event.key))
        setPressedKeys([...pressedKeys, event.key])
      if (
        !randomWord.includes(event.key) &&
        incorrectGuess < BodyParts.length
      ) {
        setIncorrectGuess((prev) => prev + 1)
      }

      // updating onscreen keyboard color based on right/wrong keypress
      setKeyState((prev) =>
        prev.map((letterObj) => {
          if (
            (letterObj.letter === event.key &&
              randomWord.includes(event.key)) ||
            (randomIndex && letterObj.letter === randomWord[randomIndex])
          ) {
            return { ...letterObj, isRight: true }
          } else if (
            letterObj.letter === event.key &&
            !randomWord.includes(event.key)
          ) {
            return { ...letterObj, isRight: false }
          } else {
            return letterObj
          }
        })
      )
    }

    document.addEventListener("keypress", handlePressedKey)
    return () => {
      document.removeEventListener("keypress", handlePressedKey)
    }
  }, [
    pressedKeys,
    randomWord,
    randomIndex,
    incorrectGuess,
    setIncorrectGuess,
    setPressedKeys,
  ])

  // whether the pressed key via onScreen keyboard is right
  const handleGuess = (letter: string) => {
    setKeyState((prev) =>
      prev.map((letterObj) => {
        if (
          (letterObj.letter === letter && randomWord.includes(letter)) ||
          (randomIndex && letterObj.letter === randomWord[randomIndex])
        ) {
          return { ...letterObj, isRight: true }
        } else if (
          letterObj.letter === letter &&
          !randomWord.includes(letter)
        ) {
          return { ...letterObj, isRight: false }
        } else {
          return letterObj
        }
      })
    )
  }

  // try again button
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <section className="grid justify-center p-6">
      {isGameOver ? (
        // when game is over
        <div className="grid justify-center gap-16">
          <h1 className="text-4xl font-semibold underline sm:text-5xl underline-offset-8">
            {isWinner ? "!! You have won !!" : "!! You have lost !!"}
          </h1>
          <button
            className="p-3 text-white bg-black border-2 border-black rounded-lg w-[200px] mx-auto text-lg"
            onClick={handleRefresh}
          >
            Try again
          </button>
        </div>
      ) : (
        // game is going
        <div className="grid justify-start grid-cols-5 gap-6 xs:grid-cols-6 lg:grid-cols-8">
          {keyState.map((letterObj, index) => {
            return (
              <button
                key={index}
                className={
                  `active:text-white font-semibold active:bg-gray-400 w-[40px] h-[40px]  border-2 border-gray-300 rounded  ` +
                  `${
                    letterObj.isRight === true ? "bg-green-400 border-none" : ""
                  }` +
                  `${
                    letterObj.isRight === false ? "bg-red-500 border-none" : ""
                  }`
                }
                onClick={() => {
                  handlePressedKey(letterObj.letter)
                  handleGuess(letterObj.letter)
                }}
              >
                {letterObj.letter}
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Keyboard
