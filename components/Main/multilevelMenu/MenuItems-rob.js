import { useState, useContext, useEffect, useRef } from "react"
import Dropdown from "./Dropdown"
import Link from "next/link"
import { ComponentContext } from "../../../context/ComponentContext"

const MenuItems = ({ items, depthLevel }) => {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [dropdown, setDropdown] = useState(false)

  let ref = useRef()
  useEffect(() => {
    const handler = (event) => {
      //чи відкритий спадний список,чи вузол DOM, який клацаємо, знаходиться за межами спадного списку,
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        // alert("Клік поза елементом")
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // Очистити слухач подій
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  //   const onMouseEnter = () => {
  //     setDropdown(true)
  //   }

  //   const onMouseLeave = () => {
  //     setDropdown(false)
  //   }

  //   const closeDropdown = () => {
  //     //новий синтаксис if(dropdown) setDropdown(false)
  //     dropdown && setDropdown(false)
  //   }
  const onClick = () => {
    //новий синтаксис if(dropdown) setDropdown(false)
    setDropdown(true)
  }

  return (
    <li
      className="menu-items"
      ref={ref}
      //   onMouseEnter={onMouseEnter}//Наведення на елемент
      // onMouseLeave={onMouseLeave}//Виведення з елемента
      // onClick={closeDropdown}
      onClick={onClick}
      //   onClick={onMouseEnter}
    >
      {items.url && items.submenu ? (
        <>
          <button
            className="menu-items-button"
            type="button"
            aria-haspopup="menu" //тип інтерактивного спливаючого елемента
            aria-expanded={dropdown ? "true" : "false"} //елемент розгорнутий чи згорнутий
            onClick={() => setDropdown((prev) => !prev)}
          >
            {depthLevel === 0 ? (
              items.title
            ) : (
              <Link href={`${items.url}`} legacyBehavior>
                <a className="menu-items-a">{items.title}</a>
              </Link>
            )}

            {/* &raquo=">>", className="arrow"=стрілка вниз */}
            {depthLevel > 0 ? <span className="submenu-chevron">&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            className="menu-items-button1"
            type="button"
            aria-haspopup="menu" //тип інтерактивного спливаючого елемента
            aria-expanded={dropdown ? "true" : "false"} //елемент розгорнутий чи згорнутий
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}
            {depthLevel > 0 ? <span className="submenu-chevron">&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        <Link href={`${items.url}`} legacyBehavior>
          <a className="menu-items-a">{items.title}</a>
        </Link>
      )}
      <style jsx>{`
        .menu-items {
          position: relative;
          font-size: 16px;
        }

        //
        .menu-items-a,
        .menu-items-button,
        .menu-items-button1 {
          text-align: left;
          padding: 0.05rem 1rem;
          text-decoration: none;
          height: 30px;
          width: 100%;
        }
        // Пункти випадаючого меню/нижній рівень
        .menu-items a {
          display: block;
          color: ${theme.colors.drawerDropdownMenuItem};
        }

        //Підменю
        .menu-items-button,
        .menu-items-button1 {
          display: flex;
          font-size: 18px;
        //   font-size: inherit; //Успадкований font-size
          border: none;
            background-color: transparent; //прозорий фон
        //   background-color: ${theme.colors.drawerDropdownMenuBackground};
        }

        .menu-items-button {
          color: grey;
        }

        //submenu+верхнє меню зі стрілкою
        .menu-items-button1 {
          color: ${theme.colors.drawerDropdownMenuSubmenu};
        }

        button span {
          margin-left: 3px;
        }

        .menu-items button:hover,
        .menu-items-a:hover {
          //   text-decoration: underline;//підкреслення
          color: ${theme.colors.drawerDropdownMenuItemHover};
          // cursor: pointer;
        }

        // Стрілка верхньогоменю
        .arrow::after {
          content: "";
          display: inline-block;
          margin-left: 0.28em;
          vertical-align: 0.09em;
          border-top: 0.42em solid;
          border-right: 0.32em solid transparent;
          border-left: 0.32em solid transparent;
          //   color: dropdownMenuArrow;
          color: ${theme.colors.drawerDropdownMenuArrow};
        }
        //Субменю/подвійна стрілка-шеврон
        .submenu-chevron {
          color: ${theme.colors.drawerDropdownMenuSubmenuChevron};
        }
      `}</style>
    </li>
  )
}

export default MenuItems
