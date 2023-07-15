
export default function Dot({ color, colorHex }) {
  return (
    <div className={` inline-block w-8 h-8 rounded-hafl bg-[${colorHex}] bg-${color}`}></div>
  )
}