//HeaderLogo.js
import { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { ComponentContext } from "../../context/ComponentContext"

const HeaderLogo = () => {
  const { state } = useContext(ComponentContext)
  const theme = state.theme

  return (
    <div className="headerLogo">
      <Link href="/" className="headerLogo__icon">
        <Image
          title="ramag"
          width={70}
          height={50}
          src="/images/head/sun_man_hands-oval-ra-red.png"
          alt="logo"
          priority="true"
        />
        {/* <Image title="ramag" width={70} height={50} src="/images/head/sun_man_hands-oval-ra-red.png" alt="logo" /> */}
        {/* <Image title="raui" width={50} height={50} src="/images/head/sun_man_hands-oval-ra.png" alert="logo" /> */}
        {/* <Image title="raui" width={60} height={50} src="/images/head/Ra-oval.png" alert="logo" /> */}
      </Link>
      <Link href="/" legacyBehavior>
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
