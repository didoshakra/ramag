//HeaderMenu.js
//Горизонтальне меню що згортається в іконку яка викликає HeaderMenuDroop-випадаюче меню

//список меню з масиву menu

import { useContext } from "react"
import Link from "next/link"
import { ComponentContext } from "../../context/ComponentContext"

const HeaderMenu = (props) => {
  const { state } = useContext(ComponentContext)
  const { theme } = state

  const renderMenu = () => {
    return props.menu.map((item, index) => {
      return (
        <li className="headerMenu__menu__item--goriz" key={index}>
          <Link href={`${item.link}`} legacyBehavior>
            <a className="headerMenu__menu__item-a">{item.a}</a>
          </Link>
          <style jsx>{`
            @media (min-width: 960px) {
              .headerMenu__menu__item-a {
                font-size: 18px; //Рукавичка
                font-weight: 600; //товщина
                // font-family: ${theme.fontFamily.serif};
                font-family: ${theme.fontFamily.sansSerif};
                text-decoration: none;
                color: ${theme.colors.headMenuText};
              }
              .headerMenu__menu__item--goriz {
                margin: 0;
                padding: 0; //Щоб зробити заокруглення
                padding: 5px 1vw; //Щоб зробити заокруглення
                list-style-type: none; /**Отменяет маркеры для списка. */
                background: ${theme.colors.headBackground};
              }
              .headerMenu__menu__item--goriz:hover {
                border-bottom: 4px solid ${theme.colors.headMenuBackgroundHoverGoriz}; // Параметры линии внизу
              }
            }
          `}</style>
        </li>
      )
    })
  }

  return (
    <div className="headerMenu">
      {/* Меню для десктопа */}
      <ul className="headerMenu__menu">{renderMenu()}</ul>
      {/* ==================================================================== */}
      <style jsx>{`
        .headerMenu {
          display: none; /*не показує */
        }

        @media (min-width: 960px) {
          .headerMenu {
            display: flex;
            margin: 0;
            padding: 0;
            // height: 64px;
            align-items: center; /* Вирівнювання елементів по перетину осі(y) центр*/
          }
          .headerMenu__menu {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: flex-end; /* Вирівнювання елементів по головній осі(x) вправо */
            align-items: center; /* Вирівнювання елементів по перетину осі(y) центр*/
          }
        }
      `}</style>
    </div>
  )
}

export default HeaderMenu
