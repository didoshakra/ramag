//MobileMenuIcon.js ////Іконка(своя) яка викликає MobileMenuDroop-випадаюче меню
//список меню з масиву props.menu

import { useContext, useState } from "react"
import { ComponentContext } from "../../context/ComponentContext"
import IconList from "../ui/svg/head/IconListP_thin" //рисочки з крапочками (тонкі)

const MobileMenuIcon = (props) => {
  const { state } = useContext(ComponentContext)
  const { theme } = state
 const [iconHover, setIconHover] = useState(false) //Для тоого щоб працював hover
//  const iconSize = "25"

 //Для тоого щоб працював hover
 //Повинні бути і toggleHover і toggleNotHover бо інакше iconHover уде мінятись через раз
 const toggleHover = () => {
   setIconHover(true)
 }
 const toggleNotHover = () => {
   setIconHover(false)
 }

  return (
    // Навігація
    <div className="mobileMenuIcon">
      {/* іконка мобільного меню */}
      <p
        className="mobileMenuIcon__iconWraper"
        onClick={() => props.mobileMenuToggle(props.mobileMenuOpen ? false : true)}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleNotHover}
        title="RAMAG"
      >
        {/* <FontAwesomeIcon icon={faList} /> */}
        <IconList
          width={theme.size.headIcon}
          height={theme.size.headIcon}
          colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
          // colorFill={theme.colors.headIcon}
        />
      </p>

      <style jsx>{`
        .mobileMenuIcon {
          display: flex;
          align-items: center;
          margin: 0;
          margin-right: 5px;
          justify-content: center;
          color: ${theme.colors.headMobileIcon};
          background: ${theme.colors.headBackground};
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          border-radius: 40px;
          width: 40px;
          height: 40px;
        }

        .mobileMenuIcon__iconWraper {
          display: flex;
          align-items: center;
          margin-right: 5px; //Відступ від кожного елемента зліва
          width: 36px;
          height: 36px;
          justify-content: center;
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          border-radius: 36px;
          color: ${theme.colors.headIcon};
          background: ${theme.colors.headBackground};
        }

        .mobileMenuIcon__iconWraper:hover {
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }

        @media (min-width: 960px) {
          .mobileMenuIcon {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default MobileMenuIcon
