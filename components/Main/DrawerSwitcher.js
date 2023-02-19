//drawerSwitcher.js //
//Іконка мови окремо (випадаючий список викликається)

import { useState, useContext, useRef, useEffect } from "react"
import { ComponentContext } from "../../context/ComponentContext"
import DrawerDroop from "./DrawerDroop"
import Backdrop from "./Backdrop"
import IconMenu from "../ui/svg/head/IconMenu" //рисочки

export default function DrawerSwitcher() {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [iconHover, setIconHover] = useState(false) //Для тоого щоб працював hover
  const iconSize = "25"

  //Для тоого щоб працював hover
  //Повинні бути і toggleHover і toggleNotHover бо інакше iconHover Буде мінятись через раз
  const toggleHover = () => {
    setIconHover(true)
  }
  const toggleNotHover = () => {
    setIconHover(false)
  }

  //***Для клацання поза обєктом
  const wRef_drawerSwitcher = useRef(null) //Для клацання поза обєктом
  //https://qna.habr.com/q/855061   \\https://qna.habr.com/q/852169
  useEffect(() => {
    const onClick = (e) => {
      if (!wRef_drawerSwitcher.current.contains(e.target)) {
        setDrawerOpen(false) //Закриваємо
        // console.log("drawerSwitcher: клік поза компонентом")
      }
    }
    //************************************** */
    // const onClick = (e) => wRef_drawerSwitcher.current.contains(e.target) || setDrawerOpen(false) //Закриваємо
    // , console.log("drawerSwitcher: клік поза компонентом"))
    //*********************************************************** */
    document.addEventListener("click", onClick, true)
    // document.addEventListener("scroll", onClick,true)
    // document.addEventListener("mousedown", onClick,true) // віджали кнопку миші на елементі.
    return () => {
      document.removeEventListener("click", onClick, true)
      //   document.removeEventListener("scroll", onClick, true)
    }
  }, [])

  const drawerOpenToggle = () => {
    setDrawerOpen(!drawerOpen)
    // console.log("drawerSwitcher/drawerOpen:", drawerOpen)
  }

  return (
    <div ref={wRef_drawerSwitcher} className="drawerSwitcher">
      {/* іконка */}
      <div
        className="drawerSwitcher__iconWraper"
        onClick={drawerOpenToggle}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleNotHover}
      >
        <IconMenu
          width={theme.size.headIcon}
          height={theme.size.headIcon}
          onMouseEnter={toggleHover}
          colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
        />
        {/* )} */}
        {/* <IconGlobe
          width={iconSize}
          height={iconSize}
          colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
        /> */}
      </div>
      {/* Випадаюче меню */}
      {drawerOpen ? <Backdrop setDrawerOpen={setDrawerOpen} /> : null}
      <DrawerDroop drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      {/* ============================================================================ */}
      <style jsx>{`
        .drawerSwitcher {
          position: relative;
          //   z-index: 2;
          //   list-style-type: none; //маркери для списка.
        }
        .drawerSwitcher__iconWraper {
          margin: 0;
          margin-right: 5px; //Відступ від кожного елемента зліва
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colors.headIcon};
          background: ${theme.colors.headBackground};
          //border: 2px solid ${theme.colors.headIcon};
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          border-radius: 36px;
          width: 36px;
          height: 36px;
        }
        .drawerSwitcher__iconWraper:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
