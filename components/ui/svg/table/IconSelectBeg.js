// import React from "react"
//Три рисочки (норм)

export default function IconSelectBeg(props) {
  const colorFill = props.colorFill || "black"
  const width = props.width || "64"
  const height = props.height || "64"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width={width} height={height} viewBox="0 0 24 24">
      <path
        fill={colorFill}
        stroke="#000"
        strokeWidth="2"
        d="M8 1h6-6zm11.188 18.472L16 22l-3.5-4.5-3 3.5L7 7l13 6.5-4.5 1.5 3.688 4.472zM19 4V1h-3M6 1H3v3m0 10v3h3M19 6v4-4zM3 12V6v6z"
      ></path>
    </svg>
  )
}
