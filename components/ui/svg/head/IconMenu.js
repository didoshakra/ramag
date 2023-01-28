//Три рисочки (норм)
//15s-14-товщина ліній

export default function IconMenu(props) {
  const colorFill = props.colorFill || "black"
  const width = props.width || "64"
  const height = props.height || "64"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 -96 512 512">
      <g fill={colorFill}>
        <path d="M32 0h448c17.672 0 32 14.328 32 15s-14.328 32-32 32H32C14.328 64 0 49.672 0 32S14.328 0 32 0zm0 0M32 128h448c17.672 0 32 14.328 32 15s-14.328 32-32 32H32c-17.672 0-32-14.328-32-32s14.328-32 32-32zm0 0M32 256h448c17.672 0 32 14.328 32 15s-14.328 32-32 32H32c-17.672 0-32-14.328-32-32s14.328-32 32-32zm0 0"></path>
      </g>
    </svg>
  )
}

