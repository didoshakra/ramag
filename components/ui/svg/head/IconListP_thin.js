// IconFreeShiping.js //Flaticon
//Три рисочки з крапочками (вузькі)

export default function IconListP_thin(props) {
  const colorFill = props.colorFill || "black"
  const width = props.width || "64"
  const height = props.height || "64"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      x="0"
      y="0"
      enableBackground="new 0 0 60.123 60.123"
      version="1.1"
      viewBox="0 0 60.123 60.123"
      xmlSpace="preserve"
    >
      <path
        fill={colorFill}
        d="M57.124 51.893H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6zM57.124 33.062H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6zM57.124 14.231H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6z"
      ></path>
      <circle fill={colorFill} cx="4.029" cy="11.463" r="4.029"></circle>
      <circle fill={colorFill} cx="4.029" cy="30.062" r="4.029"></circle>
      <circle fill={colorFill} cx="4.029" cy="48.661" r="4.029"></circle>
    </svg>
  )
}
