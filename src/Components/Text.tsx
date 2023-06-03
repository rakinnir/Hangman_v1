import { useContext } from "react"
import { AppContext, AppContextValueProps } from "../AppContextProvider"

const Text = () => {
  const { randomWord, pressedKeys, randomIndex, isGameOver } = useContext(
    AppContext
  ) as AppContextValueProps

  return (
    <div className="flex gap-3 mx-auto mt-10">
      {isGameOver ? (
        // if game is over
        <h1 className="text-3xl sm:text-4xl">
          Correct word:
          <span className="text-4xl font-semibold sm:text-5xl">
            {" "}
            {randomWord}
          </span>
        </h1>
      ) : (
        // if game is running
        randomWord.split("").map((letter, index) => {
          if (index === randomIndex) {
            // visible random letter
            return (
              <span
                key={index}
                className={`text-center text-4xl w-[35px] h-[55px] xs:text-5xl border-b-4 font-semibold border-b-black xs:w-[45px] xs:h-[65px]
        `}
              >
                {letter}
              </span>
            )
          }
          // other letters to be appeared
          return (
            <span
              key={index}
              className={`text-center text-4xl w-[35px] h-[55px]  xs:text-5xl  border-b-4 font-semibold border-b-black xs:w-[45px] xs:h-[65px]
         `}
            >
              {pressedKeys.includes(letter) && letter}
            </span>
          )
        })
      )}
    </div>
  )
}
export default Text
