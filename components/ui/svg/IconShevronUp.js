// IconShevronUp.js //Flaticon
//Шеврон(стрілка) вверх

export default function IconShevronUp(props) {
  const colorFill = props.colorFill || "white";
  const width = props.width || "64";
  const height = props.height || "64";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      //
      viewBox="0 0 256 256"
    >
      <path
        fill={colorFill}
        d="M128 48.907L0 176.907 30.187 207.093 128 109.28 225.813 207.093 256 176.907z"
      ></path>
    </svg>
  );
}
