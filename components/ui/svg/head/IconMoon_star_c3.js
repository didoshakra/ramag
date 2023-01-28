// IconFreeShiping.js //Flaticon
//Півмісяць з зірочками

export default function IconMoon_star_c3(props) {
  const colorFill = props.colorFill || "black"
  const colorFill1 = props.colorFill1 || "#F4C534"
  const colorFill2 = props.colorFill2 || "red"
  const width = props.width || "64"
  const height = props.height || "64"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0"
      y="0"
      enableBackground="new 0 0 499.712 499.712"
      version="1.1"
      viewBox="0 0 499.712 499.712"
      xmlSpace="preserve"
    >
      <path
        fill={colorFill}
        d="M146.88 375.528c126.272 0 228.624-102.368 228.624-228.64 0-55.952-20.16-107.136-53.52-146.88C425.056 33.096 499.696 129.64 499.696 243.704c0 141.392-114.608 256-256 256-114.064 0-210.608-74.64-243.696-177.712 39.744 33.376 90.944 53.536 146.88 53.536z"
      ></path>
      <path
        fill={colorFill1}
        d="M401.92 42.776c34.24 43.504 54.816 98.272 54.816 157.952 0 141.392-114.608 256-256 256-59.68 0-114.448-20.576-157.952-54.816 46.848 59.472 119.344 97.792 200.928 97.792 141.392 0 256-114.608 256-256 0-81.584-38.32-154.064-97.792-200.928z"
      ></path>
      <g fill={colorFill2}>
        <path d="M128.128 99.944L154.496 153.4 213.472 161.96 170.8 203.56 180.864 262.296 128.128 234.568 75.376 262.296 85.44 203.56 42.768 161.96 101.744 153.4z"></path>
        <path d="M276.864 82.84L290.528 110.552 321.104 114.984 298.976 136.552 304.208 166.984 276.864 152.616 249.52 166.984 254.752 136.552 232.624 114.984 263.2 110.552z"></path>
      </g>
    </svg>
  )
}
