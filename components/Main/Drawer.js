//Drawer.js
//Для кожного APP інший

import { useState, useContext, useRef, useEffect } from "react"
import Link from "next/link"
import { ComponentContext } from "../../context/ComponentContext"
import IconCancel from "../ui/svg/head/IconCancel" //рисочки (грубі)
import IconMenu from "../ui/svg/head/IconMenu" //рисочки

// //*** Хук для клік поза елементом *//https://www.youtube.com/watch?v=pE4bwPykUF4&ab_channel=AyubBegimkulov
// function useOutsideClick(outRef,element, onOpened) {
//   useEffect(() => {
//     const handleClick = (e) => {
//         console.log("****outRef=", outRef, "element=", element, " e.target=", e.target)
//       //   if (!outRef.current) return //Чи відрендерений елемент на якиім стоїть ref={outRef}
//       // contains="true"якщо сам елемент і всі вкладені елементи
//       if (!outRef.current.contains(e.target)) {
//         console.log("+++++outRef=", outRef, "element=", element, " e.target=", e.target)
//         //   if (!outRef.current.contains(e.target) && e.target.element != element) {
//         onOpened()
//       }
//     }
//     document.addEventListener("click", handleClick)
//     return () => {
//       document.removeEventListener("click", handleClick)
//     }
//   }, [outRef, element, onOpened])
// }
//***************************************************************** */
function Drawer({ drawerOpen, onOpened }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  //   console.log("***Drawer/drawerOpen=", drawerOpen)
  if (!drawerOpen) return null

  const menu = [
    {
      a: "drawer",
      link: "/begin/home",
    },
    {
      a: "headerMenu_home",
      link: "/begin/home",
    },
    {
      a: "headerMenu_shop",
      link: "/shop",
    },
    {
      a: "headerMenu_about",
      link: "/begin/about",
    },
    {
      a: "headerMenu_blog",
      link: "/begin/blog",
    },
    {
      a: "headerMenu_contact",
      link: "/begin/contacts",
    },
  ]

  return (
    // <ul ref={drawerRef} className="drawer">
    <ul className="drawer">
      {menu.map((item, index) => {
        return (
          <li className="drawer_item" key={index}>
            <Link href={`${item.link}`} >
              <span>{item.a}</span>
            </Link>
          </li>
        )
      })}
      <style jsx>
        {`
          .drawer {
            position: absolute;
            overflow: auto; //Дає прокрутку по висоті
            overflow: hidden; //Обрізаєм все, що не влізає в область */
            border: 0 0 5px 5px;
            border-radius: 0 0 5px 5px;
            padding: 0;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            // z-index: 10;
            color: ${theme.colors.headDroopMenuText};
            background: ${theme.colors.headDroopMenuBackground};
            margin: 0;
            left: -20px;
            top: 50px;
            //Ззбільшується //Зміна height/width(зверху зліва-> вниз вправо)
            //   width: ${drawerOpen ? "250px" : "0px"};
            //   height: ${drawerOpen ? "250px" : "0px"};
            //Виїжджає зліва/Зміна width
            // width: ${drawerOpen ? "250px" : "0px"};
            // height: ${drawerOpen ? "250px" : "280px"};
            //Виїжджає зверху/Зміна height
            //   width: ${drawerOpen ? "250px" : "250px"};
            //   height: ${drawerOpen ? "250px" : "0px"};
            //   transition: width 1s, height 1s; // Для плавного показу (анімація)
            //Виїжджає зліва/transform
            left: -270px;
            width: 250px;
            height: 250px;
            transform: ${drawerOpen ? "translate(100%,0)" : "translate(0,0)"};
            //** Для плавного показу (анімація)
            transition: all 1s ease-in-out; // Для плавного показу (анімація)
            //***Різко появляеться display: "block" : "none"}
            //   width: 250px;
            //   height: 250px;
            //   display: ${drawerOpen ? "block" : "none"};
          }

          //RA-Глобальні стилі для елементів headerMenu
          .drawer_item {
            margin: 10;
            padding: 5px 20px; //Щоб зробити заокруглення
            font-size: 18px; //Рукавичка
            font-weight: 600; //грубина
            font-family: ${theme.fontFamily.serif};
            list-style-type: none; /**Отменяет маркеры для списка. */
            text-decoration: none;
            color: ${theme.colors.headDroopMenuText};
            background: ${theme.colors.headDroopMenuBackground};
          }
          .drawer_item:hover {
            color: ${theme.colors.headDroopMenuTextHover};
            background: ${theme.colors.headDroopMenuBackgroundHover};
            cursor: pointer;
          }
        `}
      </style>
      <style jsx>{``}</style>
    </ul>
  )
}

export default function Drawer() {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [iconHover, setIconHover] = useState(false) //Для тоого щоб працював hover
  const iconSize = "25"

  //Для тоого щоб працював hover
  //Повинні бути і toggleHover і toggleNotHover бо інакше iconHover уде мінятись через раз
  const toggleHover = () => {
    setIconHover(true)
  }
  const toggleNotHover = () => {
    setIconHover(false)
  }
  //*** Закрити Drawer ***************** */
  const onOpened = () => {
    setDrawerOpen(!drawerOpen)
    // console.log("Drawer/onOpened/drawerOpen=", drawerOpen)
  }
  //***Для клацання поза обєктом
  const drawerRef = useRef(null) //Для клацання поза обєктом
  //https://qna.habr.com/q/855061   \\https://qna.habr.com/q/852169
  useEffect(() => {
    // const onClick = (e) => drawerRef.current.contains(e.target) || setDrawerOpen(false) //Закриваємо
    const onClick = (e) => drawerRef.current.contains(e.target)  //Закриваємо
    document.addEventListener("click", onClick,true)
    document.addEventListener("scroll", onClick, true)
    // document.addEventListener("mousedown", onClick) // віджали кнопку миші на елементі.
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("scroll", onClick, true)
    }
  }, [])
  return (
    <div ref={drawerRef} className="drawer">
      {/* <div className="drawer"> */}
      <div
        // ref={drawerRef}
        className="drawer_icon"
        title={t("headerMenu_iconTitleDrawer")}
        onClick={onOpened}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleNotHover}
      >
        {/* іконка мобільного меню */}
        {drawerOpen ? (
          <IconCancel
            // width={iconSize}
            // height={iconSize}
            width="20"
            height="20"
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
          />
        ) : (
          <IconMenu
            width={iconSize}
            height={iconSize}
            onMouseEnter={toggleHover}
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
          />
        )}
      </div>
      <Drawer drawerOpen={drawerOpen} onOpened={onOpened} />
      {/* ============================================================================ */}
      <style jsx>{`
        .drawer {
          margin: 0;
          padding: 0;
          //display: flex;
          //justify-content: flex-end; /* Вирівнювання елементів по головній осі(x) вправо */
          align-items: center; /* Вирівнювання елементів по перетину осі(y) центр */
          list-style-type: none; /**Отменяет маркеры для списка. */
          //
          position: relative;
          display: inline-block;
        }
        .drawer_icon {
          margin: 0;
          margin-left: 10px; //Відступ від кожного елемента зліва
          display: flex;
          align-items: center; /* Вирівнювання елементів по перетину осі(y) центр */
          justify-content: center; /* Вирівнювання елементів по головній осі(x) вправо */
          color: ${theme.colors.headIcon};
          background: ${theme.colors.headBackground};
          //border: 2px solid ${theme.colors.headIcon}; /* Параметры границы */
          //border-radius: 45px; /* Радіус*/
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon}; /* Параметры границы */
          border-radius: 36px; /* Радіус*/
          width: 36px;
          height: 36px;
        }
        .drawer_icon:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
