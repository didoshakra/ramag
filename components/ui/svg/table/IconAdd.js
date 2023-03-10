// IconArrowRight.js //Flaticon
//Плюсик

export default function IconAdd(props) {
  const colorFill = props.colorFill || "black";
  const width = props.width || "64";
  const height = props.height || "64";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 448 448">
      <path
        fill={colorFill}
        d="M408 184H272a8 8 0 01-8-8V40c0-22.09-17.91-40-40-40s-40 17.91-40 40v136a8 8 0 01-8 8H40c-22.09 0-40 17.91-40 40s17.91 40 40 40h136a8 8 0 018 8v136c0 22.09 17.91 40 40 40s40-17.91 40-40V272a8 8 0 018-8h136c22.09 0 40-17.91 40-40s-17.91-40-40-40zm0 0"
      ></path>
    </svg>
  );
}
