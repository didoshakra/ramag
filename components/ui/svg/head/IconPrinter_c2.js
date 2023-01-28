// IconPrinterVector_c2.js //printer-Vector-svgrepo-com

export default function IconPrinter_c2(props) {
  const colorFill = props.colorFill || "black"
  const colorFill1 = props.colorFill1 || "black"
  const width = props.width || "64"
  const height = props.height || "64"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="#000"
      version="1.1"
      viewBox="0 0 72 72"
      xmlSpace="preserve"
    >
      <path
        fill={colorFill}
        d="M61.688 19H58V9.616C58 5.845 54.639 3 50.688 3H20.551C16.599 3 14 5.845 14 9.616V19H9.551C5.599 19 3 21.845 3 25.616v25.136C3 54.682 5.793 58 9.551 58H14v4.068A6.933 6.933 0 0020.932 69h30.136A6.933 6.933 0 0058 62.068V58h3.688C65.443 58 69 54.682 69 50.752V25.616C69 21.845 65.639 19 61.688 19zM18 9.616C18 7.898 19.094 7 20.551 7h30.137C52.145 7 54 7.898 54 9.616V19H18V9.616zm36 52.452A2.931 2.931 0 0151.068 65H20.932A2.932 2.932 0 0118 62.068V48.932A2.932 2.932 0 0120.932 46h30.136A2.932 2.932 0 0154 48.932v13.136zm11-11.316c0 1.7-1.777 3.248-3.313 3.248H58v-5.068A6.933 6.933 0 0051.068 42H20.932A6.933 6.933 0 0014 48.932V54H9.551C8.017 54 7 52.452 7 50.752V25.616C7 23.898 8.094 23 9.551 23h52.137c1.457 0 3.312.898 3.312 2.616v25.136z"
      ></path>
      <path
        fill1={colorFill1}
        d="M16.619 28a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM19.619 29h3a1 1 0 100-2h-3a1 1 0 100 2zM55.619 36h-40a1 1 0 100 2h40a1 1 0 100-2z"
      ></path>
    </svg>
  )
}
