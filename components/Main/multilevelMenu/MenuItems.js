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
            type="button"
            aria-haspopup="menu" //тип інтерактивного спливаючого елемента
            aria-expanded={dropdown ? "true" : "false"} //елемент розгорнутий чи згорнутий
            onClick={() => setDropdown((prev) => !prev)}
          >
            {depthLevel === 0 ? (
              items.title
            ) : (
              <Link href={`${items.url}`} >
                <a>{items.title}</a>
              </Link>
            )}

            {/* &raquo=">>", className="arrow"=стрілка вниз */}
            {depthLevel > 0 ? <span className="submenu">&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu" //тип інтерактивного спливаючого елемента
            aria-expanded={dropdown ? "true" : "false"} //елемент розгорнутий чи згорнутий
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}
            {depthLevel > 0 ? <span className="submenu">&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        <Link href={`${items.url}`}>
          <a>{items.title}</a>
        </Link>
      )}
      <style jsx>{`
        .menu-items {
          position: relative;
          font-size: 16px;
        }

        .menu-items a {
          display: block;
          font-size: inherit;
          color: inherit;
          text-decoration: none;
          width: 100%;
        }

        .menu-items button {
          display: flex;
          //   align-items: center;
          //inherit-успадкувати
          color: inherit;
          font-size: inherit;
          //
          border: none;
          background-color: transparent;
          cursor: pointer;
          width: 100%;
        }

        button span {
          margin-left: 3px;
        }

        .menu-items > a,
        .menu-items button {
          text-align: left;
          padding: 0.5rem 1rem;
          height: 30px;
        }

        .menu-items a:hover,
        .menu-items button:hover {
          text-decoration: underline;
          color: ${theme.colors.headMenuBackgroundActive};
          //   color: ${theme.colors.headMenuTextHover};
          //   background: ${theme.colors.headMenuBackgroundHover};
          //   background-color: #f2f2f2;
        }
        .arrow::after {
          content: "";
          display: inline-block;
          margin-left: 0.28em;
          vertical-align: 0.09em;
          border-top: 0.42em solid;
          border-right: 0.32em solid transparent;
          border-left: 0.32em solid transparent;
          color: blue;
          //   color: ${theme.colors.headMenuTextHover};
        }
        .submenu {
          color: blue;
        }
      `}</style>
    </li>
  )
}

export default MenuItems
