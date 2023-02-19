//userSwitcher.js //
//Іконка мови окремо (випадаючий список викликається)

import { useState, useContext, useRef, useEffect } from "react"
import Image from "next/image"
import { ComponentContext } from "../../context/ComponentContext"
import NotAuthenticated from "../ui/svg/head/IconUser_border"

const UserSwitcher = () => {
  const { state, dispatch, profile } = useContext(ComponentContext)
  const { theme } = state
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [iconHover, setIconHover] = useState(false) //Для тоого щоб працював hover
  const iconSize = "25"

  //Для тоого щоб працював hover
  const toggleHover = () => {
    // setIconHover(!iconHover);
    setIconHover(true)
  }
  const toggleNotHover = () => {
    setIconHover(false)
  }


  //   console.log("profile=", profile);
  const userMenuOpenToggle = () => {
    setUserMenuOpen(!userMenuOpen)
    let newUser = "admin"
    if (profile === "admin") {
      newUser = "user"
    }
    // console.log("userSwitcher.js/newUser=", newUser)
    console.log("profile=", profile)
    dispatch({ type: "PROFILE", payload: newUser }) //Змінюємо state.user
  }

  return (
    <div className="userSwitcher">
      {/* іконка зміни користувача */}
      <div
        className="userSwitcher__iconWraper"
        // title={t("headerMenu_iconTitleTheme")}
        onClick={userMenuOpenToggle}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleNotHover}
      >
        {profile === "admin" ? (
          <Image className="userSwitcher__avatar" width={40} height={40} alt="avatar" />
        ) : (
          <NotAuthenticated
            width={iconSize}
            height={iconSize}
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
          />
        )}
      </div>
      {/* Випадаюче меню */}
      {/* <userSwitcherDroop userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} /> */}
      {/* <userSwitcherDroop userMenuOpen={userMenuOpen} /> */}
      <style jsx>{`
        .userSwitcher {
          position: relative;
          //margin: 0;
          //padding: 0;
          list-style-type: none; //маркери для списка.
        }

        .userSwitcher__iconWraper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px; //Відступ від кожного елемента зліва
          width: 36px;
          height: 36px;
          border-radius: 36px;
          //   border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          //   color: ${theme.colors.headIcon};
          //   background-image: url("/avatar/2.jpg");
        }

        .userSwitcher__iconWraper:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }

        .userSwitcher__avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          //background-size: contain;
          background-size: cover;
          background-image: url("/avatar/2.jpg");
        }
      `}</style>
    </div>
  )
}

export default UserSwitcher
