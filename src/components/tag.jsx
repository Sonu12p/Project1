


export const COLORS = {
  red: 'red-500',
  redLight: 'red-100',
  purple: 'purple-500',
  purpleLight: 'purple-100',
  green: 'green-500',
  greenLight: 'green-100',
  blue: 'blue-500',
  blueLight: 'blue-100',
  orange: 'orange-500',
  orangeLight: 'orange-100',
}


export default function Tag({
  color, background, text
}) {
  return (
    <div className={`text-[${color}] bg-[${background}] font-semibold px-24 py-4 rounded-12 inline-block text-12`}>
      {text}
    </div>
  )
}