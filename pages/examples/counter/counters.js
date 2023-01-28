//https://codesandbox.io/s/1x81b?file=/pages/index.js:0-1102
import CounterNew from "../../../components/Counters/CounterNew"
import Link from "next/link"

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#ddd",
  width: "80%",
  height: "calc(100vh - 1rem)",
  margin: "0 auto",
}

const counterStyles = {
  background: "#fff",
  boxShadow: "1px 2px 8px 1px rgba(30,30,30,0.4)",
  fontSize: "32px",
  fontWeight: "bold",
  lineHeight: 1,
  padding: "1rem 0",
  textAlign: "center",
  width: "200px",
}

const datas = [
  {
    startNum: 0,
    endNum: 45000000,
    duration: 3,
    delay: 1,
  },
  {
    startNum: 0,
    endNum: 853000,
    duration: 4,
    delay: 5,
  },
  {
    startNum: 0,
    endNum: 1200000,
    duration: 5,
    delay: 10,
  },
]

export default function Counters() {
  return (
    <div style={containerStyles}>
      {datas.map((data, i) => (
        <CounterNew data={data} styles={counterStyles} key={i} />
      ))}

      <div style={{ margin: "2rem 0 0" }}>
        <Link href="/examples/counter/custom">Custom Local Wrapper Version:</Link>
      </div>
    </div>
  )
}
