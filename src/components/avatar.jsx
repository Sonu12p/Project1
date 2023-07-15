import { generate_avatar_data } from "../utility"

export default function Avatar({ url, name }) {
  if (url) {
    return <img src={url} alt="avatar" />
  }
  if (name) {
    const { initials, color } = generate_avatar_data(name)
    return (
      <div className={`inline-flex items-center justify-center w-48 h-48 rounded-hafl  text-white bg-[${color}]`}>
        {initials}
      </div>
    )
  }

}