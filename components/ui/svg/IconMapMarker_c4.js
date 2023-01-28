// IconMapMarker_c4.js //Flaticon
//Маркер на карті 4-кол (процюють 2???)

export default function IconMapMarker_c4(props) {
  const colorFill = props.colorFill || "rgba(12,135,53,1)";
  const colorFill1 = props.colorFill1 || "red";
  const colorStroke = props.colorStroke || colorFill;
  const colorStroke1 = props.colorStroke1 || colorFill1;
  const width = props.width || "64";
  const height = props.height || "64";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path
        fill={colorFill}
        stroke={colorStroke}
        d="M256 103.278c-39.429 0-71.505 32.077-71.505 71.505 0 39.429 32.077 71.505 71.505 71.505s71.505-32.077 71.505-71.505-32.076-71.505-71.505-71.505z"
      ></path>
      <path
        fill={colorFill1}
        stroke={colorStroke1}
        d="M256 0C158.107 0 78.465 79.642 78.465 177.535c0 40.042 28.089 106.034 83.486 196.143 40.502 65.88 81.577 121.48 81.987 122.033L256 512l12.062-16.289c.41-.553 41.485-56.153 81.987-122.033 55.397-90.109 83.486-156.101 83.486-196.143C433.535 79.642 353.893 0 256 0zm0 276.306c-55.98 0-101.522-45.543-101.522-101.522 0-55.98 45.543-101.522 101.522-101.522s101.522 45.543 101.522 101.522c0 55.979-45.542 101.522-101.522 101.522z"
      ></path>
    </svg>
  );
}
