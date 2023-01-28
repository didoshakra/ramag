//HeaderSeting  /Верхнє меню

import { useContext } from "react"
import { ComponentContext } from "../../context/ComponentContext"
import HeaderSetingDroop from "./HeaderSetingDroop"
import ThemeSwitcher from "./ThemeSwitcher"
import UserSwitcher from "./UserSwitcher"

const HeaderSeting = () => {
  const { state } = useContext(ComponentContext)
  const theme = state.theme

  return (
    <div className="headerSeting">
      {/* Іконки головного меню Seting */}
      <div className="headerSeting_larg">
        {/* User */}
        <UserSwitcher />
        {/* тема */}
        <ThemeSwitcher />
      </div>

      {/* Випадаюче меню Seting(мобільне) */}
      <div className="headerSeting__mobile">
        <HeaderSetingDroop />
      </div>

      <style jsx>
        {`
          .headerSeting {
            /*padding: 10px; /*Поля*/
            // height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background: ${theme.colors.headMobileBackground};
            background: ${theme.colors.headBackground};
          }
          .headerSeting_larg {
            display: none;
          }
          .headerSeting__mobile {
            display: flex;
          }
          @media (min-width: 960px) {
            .headerSeting_larg {
              display: flex;
            }
            .headerSeting__mobile {
              display: none;
            }
            .headerSeting {
              background: ${theme.colors.headBackground};
            }
          }
        `}
      </style>
    </div>
  )
}

export default HeaderSeting
