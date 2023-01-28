// IconMoon_star.js //Flaticon
//Півмісяць з зірочками

export default function IconTable_c2(props) {
  const colorFill = props.colorFill || "black"
  const colorFill1 = props.colorFill1 || "red"
  const width = props.width || "64"
  const height = props.height || "64"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width={width}
      height={height}
      enableBackground="new 0 0 486 486"
      viewBox="0 0 486 486"
    >
      <path fill={colorFill} d="M60.5 0v486h365V0h-365zm350 471h-335V15h335v456z"></path>
      <path
        fill={colorFill1}
        d="M381.5 55h-275v375h275V55zm-200 360h-60V125h60v290zm0-305h-60V70h60v40zm185 305h-170v-50h170v50zm0-65h-170v-45h170v45zm0-60h-170v-45h170v45zm0-60h-170v-45h170v45zm0-60h-170v-45h170v45zm0-60h-170V70h170v40z"
      ></path>
    </svg>
  )
}
