//Header.js// Викликає всі меню/Саме меню
//20200416-добавляю 2-а діва (для верхньої стрічки-HeaderTape і нажнього випадаючого на весь екран MobileMenu)
import { useState, useContext, useEffect } from "react"
import { ComponentContext } from "../../context/ComponentContext"
import DrawerSwitche from "./DrawerSwitcher"
import HeaderLogo from "./HeaderLogo"
import HeaderMenu from "./HeaderMenu"
import HeaderSeting from "./HeaderSeting"
import MobileMenuIcon from "./MobileMenuIcon"
import MobileMenuDroop from "./MobileMenuDroop"
//

var lastScrollTop = 0
var scrolUP = false

const Header = () => {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const heightHeaderTape = "24px" //Висота header0
  const heightHeader = "50px" //Висота header0
  const headerNone = "-80px" //Сховати
  const [headerTop, setHeaderTop] = useState(heightHeaderTape) //відступ зверху/щоб ховалась/появлялась Head при скролі
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(true)

  const mobileMenuToggle = (arg) => {
    setMobileMenuOpen(arg)
    // console.log("Header.js/mobileMenuOpen2/arg =", arg)
  }

  //*** щоб ховалась/появлялась Head при скролі
  function mouseMove() {
    // alert("Ти порухав мишкою!/mousemove");
    // console.log("Header.js/скрол=", pageYOffset);
    // console.log("Header.js/Y=", event.pageY);
    var st = scrollY
    // console.log("Header.js/st=", st + "/lastScrollTop=", lastScrollTop);
    if (st > 10) {
      if (st - lastScrollTop > 0 || (st - lastScrollTop == 0 && !scrolUP)) {
        // console.log("Скрол вниз!");
        scrolUP = false
        // alert("Скрол вниз!");
        if (st > 200) {
          setHeaderTop("0px")
        } else {
          setHeaderTop(headerNone)
          // downscroll code
        }
      } else {
        if (st > 32) {
          setHeaderTop("0px")
        } else {
          setHeaderTop(heightHeaderTape)
        }
        scrolUP = true
        // console.log("Скрол вверх!");
      }
    } else {
      setHeaderTop(heightHeaderTape)
    }
    lastScrollTop = st
  }

  useEffect(() => {
    // Прив’яжіть прослуховувач події
    document.addEventListener("scroll", mouseMove, true) //Для скролу
    // document.addEventListener("mousemove", mouseMove);//для переміщення мишки (координати)
    return () => {
      // Від’єднайте слухача події під час очищення
      document.removeEventListener("scroll", mouseMove, true)
      // document.removeEventListener("mousemove", mouseMove);
    }
  })
  //End/*** щоб ховалась.../

  const menu = [
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
    // {
    //   a: "icon.js",
    //   link: "/ui/icons_svg",
    // },
    // {
    //   a: "flex_center",
    //   link: "/examples_style/flex_center",
    // },
    // {
    //   a: "flexbox",
    //   link: "/examples_style/flexbox",
    // },
    // {
    //   a: "grid",
    //   link: "/examples_style/grid",
    // },
    // {
    //   a: "fonts_module_css",
    //   link: "/examples_style/fonts/fonts_module_css",
    // },
    // {
    //   a: "fonts",
    //   link: "/examples_style/fonts/fonts_jss",
    // },
  ]

  return (
    // div className="header-section"-Для того щоб плавно сховати шапку
    <div className="header-section">
      <div className="header-conteiner">
        <div className="header-conteiner__menu-begin">
          {/* Ліве випадаюче меню */}
          <DrawerSwitche />
          {/* Логотип */}
          <HeaderLogo />
        </div>
        <div className="header-conteiner__menu-center">
          {/* Середній рядок меню */}
          <HeaderMenu menu={menu} />
        </div>
        <div className="header-conteiner__menu-end">
          {/* іконка мобільного меню/faList/ */}
          <MobileMenuIcon mobileMenuOpen={mobileMenuOpen} mobileMenuToggle={mobileMenuToggle} />
          {/* Налаштування(Теми,Мови)*/}
          <HeaderSeting />
        </div>
      </div>
      {/* Список мобильного меню */}
      <MobileMenuDroop menu={menu} mobileMenuOpen={mobileMenuOpen} mobileMenuToggle={mobileMenuToggle} />
      {/* ============================================================================================= */}
      <style jsx>{`
        .header-section {
          position: relative;
          width: 100vw;
          height: ${heightHeader};
          background: ${theme.colors.headBackground};
        }
        .header-conteiner {
          margin: 0;
          //   padding: 0 0.5vw;
          //   position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          //   flex-basis: 400px;300px;200px;//Розміри елементів в рядку
          //   color: ${theme.colors.headIcon};
          //   background: ${theme.colors.headBackground};
        }
        .header-conteiner__menu-begin {
          padding: 0 5px;
          width: 250px;
          min-width: 250px;
          display: flex;
          justify-content: space-begin;
          align-items: center;
          //   border: 2px solid green;
        }
        .header-conteiner__menu-center {
          padding: 0 5px;
          max-width: calc(100% - 350px);
          align-items: center;
        }
        .header-conteiner__menu-end {
          flex-shrink: 0;
          width: 50px;
          flex-basis: 100px;
          min-width: 100px;
          display: flex;
          justify-content: space-end;
          align-items: center;
          //   border: 2px solid blue;
        }

        @media (min-width: 960px) {
          .header-section {
            // Для того щоб плавно сховати шапку
            margin: 0;
            padding: 0;
            position: fixed;
            top: ${headerTop};
            height: ${heightHeader};
            // width: 100%;
            width: 100vw;
            transition: top 0.4s ease-in;
            z-index: 100;
          }
        }
      `}</style>
    </div>
  )
}

export default Header
