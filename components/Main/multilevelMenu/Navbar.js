import MenuItems from "./MenuItems"
const Navbar = ({multilevelMenu}) => {
    // console.log("Navbar/multilevelMenu", multilevelMenu)
  return (
    <nav>
      <ul className="menus">
        {multilevelMenu.map((items, index) => {
          const depthLevel = 0
          return <MenuItems items={items} key={index} depthLevel={depthLevel} />
        })}
      </ul>
      <style jsx>{`
        .menus {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
