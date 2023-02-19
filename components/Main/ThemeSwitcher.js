//ThemeSwitcher.js //Зміна теми(шконка+зміна теми)
//Використовую

import  { useContext, useState } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ComponentContext } from "../../context/ComponentContext";
import IconSun from "../ui/svg/head/IconSun_border"
import IconMoon from "../ui/svg/head/IconMoon_border"

const ThemeSwitche = () => {
  const { state, dispatch } = useContext(ComponentContext);
  const { theme, themeTypeLight } = state;
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

  // console.log("ThemeSwitcher.js/themeDark1", themeDark1);
  // console.log("ThemeSwitcher.js/themeLith1", themeLith1);
  const themeMenuToggle = () => {
    let newTheme = "light";
    if (themeTypeLight) {
      newTheme = "dark";
    }
    dispatch({ type: "THEME", payload: newTheme }); //Змінюємо state.theme
  };

  return (
    <div className="themeSwitcher">
      {/* іконка зміни теми */}
      <p
        className="themeSwitcher__iconWraper"
        title="теми"
        onClick={themeMenuToggle}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleNotHover}
      >
        {themeTypeLight ? (
          <IconMoon
            width={theme.size.headIcon}
            height={theme.size.headIcon}
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
            // colorFill={theme.colors.headIcon}
          />
        ) : (
          <IconSun
            width={theme.size.headIcon}
            height={theme.size.headIcon}
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
            // colorFill={theme.colors.headIcon}
          />
        )}
      </p>

      <style jsx>{`
        .themeSwitcher {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          list-style-type: none;
        }
        .themeSwitcher__iconWraper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px; //Відступ від кожного елемента зліва
          width: 36px;
          height: 36px;
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          border-radius: 36px;
          color: ${theme.colors.headIcon};
          background: ${theme.colors.headBackground};
        }

        .themeSwitcher__iconWraper:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }
        @media (min-width: 960px) {
          themeSwitcher__iconWraper {
            color: ${theme.colors.headIcon};
            // background: ${theme.colors.headMobileBackground};
            background: ${theme.colors.headBackground};
          }
        }
      `}</style>
    </div>
  )
};

export default ThemeSwitche;
