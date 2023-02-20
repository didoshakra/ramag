//HeaderTape.js
import { useState, useContext } from "react"
// import Link from "next/link"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faInstagram, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons"
// import { faPhoneAlt, faGlobe } from "@fortawesome/free-solid-svg-icons"
import IconPhone from "../ui/svg/social/IconPhone"
// import IconTwitter from "../ui/svg/social/IconTwitter"
import IconInstagram from "../ui/svg/social/IconInstagram_c2"
import IconFacebook from "../ui/svg/social/IconFacebook"
import { ComponentContext } from "../../context/ComponentContext"

const HeaderTape = () => {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [iconFacebookHover, setIconFacebookHover] = useState(false) //Для тоого щоб працював hover
  const [iconInstagramHover, setIconInstagramHover] = useState(false) //Для тоого щоб працював hover
  const iconSize = "13"
  const fontSize = "13px"

  return (
    <div className="headerTape-section">
      <span className="headerTape__social">
        <span className="headerTape__social__text">
          {/* <FontAwesomeIcon icon={faPhoneAlt} /> */}
          <IconPhone width={iconSize} height={iconSize} colorFill={theme.colors.headTapeText} />+ 38(067) 777-77-77
        </span>
        <span>
          <a
            href="https://www.instagram.com/roletydaynight"
            className="headerTape__social__iconWraper"
            onMouseEnter={() => setIconInstagramHover(true)}
            onMouseLeave={() => setIconInstagramHover(false)}
          >
            {/* <FontAwesomeIcon icon={faInstagram} /> */}
            <IconInstagram
              width={iconSize}
              height={iconSize}
              //   colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
              colorFill={iconInstagramHover ? theme.colors.headTapeTextHover : theme.colors.headTapeText}
              colorFill1={iconInstagramHover ? theme.colors.headTapeTextHover : theme.colors.headTapeText}
            />
            {/* instagram */}
          </a>
        </span>
        {/* <Link href="https://www.facebook.com/profile.php?id=100080681993195"> */}
        <a
          className="headerTape__social__iconWraper"
          href="https://www.facebook.com/profile.php?id=100080681993195"
          onMouseEnter={() => setIconFacebookHover(true)}
          onMouseLeave={() => setIconFacebookHover(false)}
        >
          {/* <FontAwesomeIcon icon={faFacebookF} /> */}
          <IconFacebook
            width={iconSize}
            height={iconSize}
            //   colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
            colorFill={iconFacebookHover ? theme.colors.headTapeTextHover : theme.colors.headTapeText}
            colorFill1={iconFacebookHover ? theme.colors.headTapeTextHover : theme.colors.headTapeText}
          />
        </a>
        {/* </Link> */}
      </span>
      <span className="headerTape__announce">Тільки якісні товари</span>
      {/* ======================================================================== */}
      <style jsx>{`
        .headerTape-section {
          top: 0;
          position: relative;
          padding: 0 1vw;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          background: ${theme.colors.headTapeBackground};
        }

        .headerTape__social {
          //display: block;
          //    margin: 1vw;
          //   align-items: center;
          align-items: flex-end;
          // padding: 1vw;
        }
        .headerTape__social__text {
          padding: 1vw;
          font-size: ${fontSize};
          color: ${theme.colors.headTapeText};
        }
        .headerTape__social__iconWraper {
          padding: 1vw;
          align-items: center;
          color: ${theme.colors.headTapeText};
        }

        .headerTape__social__iconWraper:hover {
          color: ${theme.colors.headTapeTextHover};
          //   background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }

        .headerTape__announce {
          //display: block;
          padding: 1vw;
          //   font-size: 10px;
          font-size: ${fontSize};
          color: ${theme.colors.headTapeText};
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (min-width: 600px) {
          .headerTape-section {
            height: 24px;
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </div>
  )
}

export default HeaderTape
