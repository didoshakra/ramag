//HeaderLogo.js
import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { ComponentContext } from "../../context/ComponentContext"
// import Drawer from "./Drawer";

const HeaderLogo = () => {
  const { state } = useContext(ComponentContext)
  const theme = state.theme

  return (
    <div className="headerLogo">
      <Link href="/">
        <a className="headerLogo__icon">
          <img title="ramag" width={70} height={50} src="/images/head/sun_man_hands-oval-ra-red.png" alert="logo" />
          {/* <img title="ramag" width={70} height={50} src="/images/head/sun_man_mount-380.png" alert="logo" /> */}
          {/* <img title="raui" width={50} height={50} src="/images/head/sun_man_hands-oval-ra.png" alert="logo" /> */}
          {/* <img title="raui" width={60} height={50} src="/images/head/Ra-oval.png" alert="logo" /> */}
        </a>
      </Link>
      <Link href="/">
        <a className="headerLogo__text" title="RAMAG">
          RAMAG
        </a>
      </Link>
      {/* ========================================================================== */}
      <style jsx>{`
        .headerLogo {
          margin: 0 10px;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .headerLogo__text {
          padding: 0 1vw;
          text-decoration: none;
          font-family: ${theme.fontFamily.sansSerif};
          font-size: 20px;
          font-weight: 800;
          color: ${theme.colors.headLogoText};
          background: ${theme.colors.headBackground};
        }
        .headerLogo__text:hover {
          color: ${theme.colors.headLogoTextHover};
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
export default HeaderLogo
