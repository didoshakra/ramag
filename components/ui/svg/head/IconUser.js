//IconUser
//Чоловічок (запрвнений)

export default function IconUsers(props) {
  const colorFill = props.colorFill || "black"
  const width = props.width || "64"
  const height = props.height || "64"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      //
      viewBox="0 0 512 512"
    >
      <path
        fill={colorFill}
        d="M299.287 255.5h-86.574c-85.147 0-154.418 69.272-154.418 154.418V512h395.41V409.918c0-85.146-69.271-154.418-154.418-154.418zM256 0c-65.843 0-119.409 53.567-119.409 119.41 0 65.842 53.566 119.409 119.409 119.409s119.409-53.567 119.409-119.41C375.409 53.567 321.843 0 256 0z"
      ></path>
    </svg>
  )
}
