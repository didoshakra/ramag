import MenuItems from "./MenuItems"
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1 //Глибина рівнів входження
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : ""
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
      <style jsx>{`
        .dropdown {
          //   position: absolute;
          //   right: 0;
          //   left: auto;
          //Зміщення субменю
          margin-left: 10px;
          //   margin: calc($depthLevel * 30px);
          //   left: 50px;
          //   box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08), 0 4px 6px -2px rgba(71, 63, 79, 0.16);
          font-size: 0.9rem;
          z-index: 9999;
          min-width: 10rem;
          padding: 0;
          //   padding: 0.5rem 0;
          list-style: none;
          background-color: transparent; //прозорий
          // background-color: #fff;
          //   background-color: red;
          //   border-radius: 0.5rem;
          display: none;
        }

        .dropdown.show {
          display: block;
        }

        // .dropdown .dropdown-submenu {
        //     position: absolute;
        //     top: -7px;
        //     left: 100%;
        //   left: 30px;
        //   padding-left: 10px;
        // }
      `}</style>
    </ul>
  )
}

export default Dropdown
