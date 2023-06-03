import { useContext } from "react"
import { AppContext, AppContextValueProps } from "../AppContextProvider"
import { BodyParts } from "./BodyParts"

export default function Body() {
  const { incorrectGuess, isGameOver } = useContext(
    AppContext
  ) as AppContextValueProps

  return (
    <section className="mx-auto">
      {!isGameOver && (
        <div className="relative">
          <div className="h-[8px] bg-black mt-10 w-[80px]"></div>
          <div className="w-[8px] bg-black h-[200px]"></div>
          <div className="h-[40px] bg-black w-[8px] absolute top-[8px] right-0"></div>
          <div className="h-[8px] bg-black  w-[80px] absolute bottom-0 right-[40px]"></div>

          {BodyParts.slice(0, incorrectGuess).map((Bodypart, index) => (
            <Bodypart key={index} />
          ))}
        </div>
      )}
    </section>
  )
}
