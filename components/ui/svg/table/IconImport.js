// import React from "react"
//Три рисочки (норм)

export default function IconImport(props) {
  const colorFill = props.colorFill || "black"
  const width = props.width || "64"
  const height = props.height || "64"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 465 465"
      enableBackground="new 0 0 465 465"
    >
      <path
        fill={colorFill}
        d="M356.213 10H135v207.5H0v30h135V455h330V118.787L356.213 10zM365 61.213L413.787 110H365V61.213zM165
        425V247.5h98.787l-34.393 34.394 21.213 21.213 70.607-70.606-70.607-70.606-21.213 21.213 34.393
        34.394H165V40h170v100h100v285H165z"
      ></path>
    </svg>
  )
}

