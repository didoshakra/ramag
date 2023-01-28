// IconPencil_c3.js //Flaticon
// Олівець

export default function IconPencil_c3(props) {
  const colorFill = props.colorFill || "black"
  const colorFill1 = props.colorFill1 || "black"
  const colorFill2 = props.colorFill2 || "black"
  const width = props.width || "64"
  const height = props.height || "64"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0"
      y="0"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path fill={colorFill1} d="M51.2 353.28L0 512 158.72 460.8z"></path>
      <path fill={colorFill} d="M89.73 169.097H443.007V322.696H89.73z" transform="rotate(-45.001 266.366 245.9)"></path>
      <path
        fill={colorFill2}
        d="M504.32 79.36L432.64 7.68c-10.24-10.24-25.6-10.24-35.84 0l-23.04 23.04 107.52 107.52 23.04-23.04c10.24-10.24 10.24-25.6 0-35.84z"
      ></path>
    </svg>
  )
}
