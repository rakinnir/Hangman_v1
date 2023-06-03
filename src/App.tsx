import AppContextProvider from "./AppContextProvider"
import Body from "./Components/Body"
import Keyboard from "./Components/Keyboard"
import Text from "./Components/Text"

function App() {
  return (
    <AppContextProvider>
      <div className="grid gap-6">
        <h1
          className={`font-bold text-5xl mt-4 sm:mt-6 text-center border-2 border-black p-6 w-[300px] mx-auto rounded-lg`}
        >
          Hangman
        </h1>
        <Body />
        <Text />
        <Keyboard />
      </div>
    </AppContextProvider>
  )
}

export default App
