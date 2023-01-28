// import React from "react"
//Три рисочки (норм)

export default function IconExport(props) {
  const colorFill = props.colorFill || "black"
  const width = props.width || "64"
  const height = props.height || "64"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width={width}
      height={height}
      viewBox="0 0 486.213 486.213"
      enableBackground="new 0 0 486.213 486.213"
    >
      <path
        fill={colorFill}
        d="M377.426 20.607H156.213v207.5H57.427l34.393-34.394L70.607 172.5 0 243.107l70.607 70.606L91.82 292.5l-34.393-34.394h98.787v207.5h330V129.393L377.426 20.607zm8.787 51.213L435 120.607h-48.787V71.82zm-200 363.787v-177.5h135v-30h-135v-177.5h170v100h100v285h-270z"
      ></path>
    </svg>
  )
}
