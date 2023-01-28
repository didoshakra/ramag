import MyCountUp from "../../../components/Counters/MyCounterUp"
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
  margin: "0 0 1rem",
}

export default function AboutPage() {
  return (
    <div style={containerStyles}>
      <h2>Custom Wrapper Version</h2>
      <p>(my own custom React wrapper, using hooks)</p>

      <Link href="/">{`< Go Back`}</Link>

      <h3>Counters</h3>
      <MyCountUp
        startVal={0}
        endVal={85000000}
        duration={7}
        delay={1}
        // smartEasingAmount={400}
        styles={counterStyles}
      />
      <MyCountUp
        startVal={0}
        endVal={125000000}
        duration={8}
        delay={9}
        // smartEasingAmount={1000}
        styles={counterStyles}
      />
      <MyCountUp
        startVal={0}
        endVal={11000000}
        duration={9}
        delay={17}
        // smartEasingAmount={100}
        styles={counterStyles}
      />
    </div>
  )
}
