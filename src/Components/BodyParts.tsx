const Head = () => {
  return (
    <div className="circle border-[8px] border-black rounded-full aspect-square w-[40px] absolute top-[46px] right-[-15px]"></div>
  )
}
const Base = () => {
  return (
    <div className="body bg-black w-[8px] h-[70px] absolute top-[85px] right-0"></div>
  )
}
const LeftHand = () => {
  return (
    <div
      className="left-hand w-[8px] h-[40px] bg-black absolute
        top-[85px] rotate-[-60deg] right-[15px] "
    ></div>
  )
}
const RightHand = () => {
  return (
    <div
      className="right-hand w-[8px] h-[40px] bg-black absolute
        top-[85px] rotate-[60deg] right-[-15px] "
    ></div>
  )
}
const LeftLeg = () => {
  return (
    <div
      className="left-leg w-[8px] h-[30px] bg-black absolute
        top-[150px] rotate-[40deg] right-[10px]"
    ></div>
  )
}
const RightLeg = () => {
  return (
    <div
      className="right-leg w-[8px] h-[30px] bg-black absolute
        top-[150px] rotate-[-40deg] right-[-10px]"
    ></div>
  )
}
export const BodyParts = [Head, Base, RightHand, LeftHand, RightLeg, LeftLeg]
