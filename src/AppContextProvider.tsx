import React, { createContext, useState, useEffect } from "react"
import { ListOfWords } from "./Words"
import { BodyParts } from "./Components/BodyParts"

// types
type contextChildProp = {
  children: React.ReactNode
}
export type AppContextValueProps = {
  pressedKeys: string[]
  incorrectGuess: number
  randomWord: string
  randomIndex: number | null
  isGameOver: boolean
  isWinner: boolean
  setPressedKeys: React.Dispatch<React.SetStateAction<string[]>>
  setIncorrectGuess: React.Dispatch<React.SetStateAction<number>>
  setRandomWord: React.Dispatch<React.SetStateAction<string>>
  setRandomIndex: React.Dispatch<React.SetStateAction<number | null>>
}

// context api
export const AppContext = createContext<AppContextValueProps | null>(null)

// state management
const AppContextProvider = ({ children }: contextChildProp) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [incorrectGuess, setIncorrectGuess] = useState<number>(0)
  const [randomWord, setRandomWord] = useState<string>("")
  const [randomIndex, setRandomIndex] = useState<number | null>(null)

  // Game result and winner/loser
  const isWinner = randomWord
    .split("")
    .every((letter) => pressedKeys.includes(letter))
  const isGameOver = isWinner || incorrectGuess === BodyParts.length

  // context value
  const contextValues: AppContextValueProps = {
    pressedKeys,
    incorrectGuess,
    randomWord,
    randomIndex,
    isGameOver,
    isWinner,
    setPressedKeys,
    setIncorrectGuess,
    setRandomWord,
    setRandomIndex,
  }

  // random word  at first reload
  useEffect(() => {
    const word = ListOfWords[Math.floor(Math.random() * ListOfWords.length)]
    setRandomWord(word)
  }, [])

  // random letter shown as first letter at first reload
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomWord.length)
    setRandomIndex(randomIndex)
    setPressedKeys((prev) => [...prev, randomWord[randomIndex]])
  }, [randomWord, setPressedKeys])

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
