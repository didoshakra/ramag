//Drawer.js
//Для кожного APP інший

import { useState, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { ComponentContext } from "../../context/ComponentContext"
import IconCancel from "../ui/svg/head/IconCancel" //хрестик
import Navbar from "./multilevelMenu/Navbar"
import { menuAdmin, menuDocuments } from "./multilevelMenu/multilevelMenu"

//***************************************************************** */
export default function DrawerDroop({ drawerOpen, setDrawerOpen }) {
  //   console.log("***DrawerDroop/drawerOpen=", drawerOpen)
  //   if (!drawerOpen) return null

  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [iconHover, setIconHover] = useState(false) //Для тоого щоб працював hover
  const iconSize = "15"
  //   const driwerLeft = "-370px"
  const driwerWidht = "80vw"
  const driwerHeight = "80vh"
  const driwerMaxWidht = "700px"
  const driwerMaxHeight = "800px"

  //Для тоого щоб працював hover
  //Повинні бути і toggleHover і toggleNotHover бо інакше iconHover Буде мінятись через раз
  const toggleHover = () => {
    setIconHover(true)
  }
  const toggleNotHover = () => {
    setIconHover(false)
  }
  //********************************************************* */

  const menu1 = [
    {
      a: "home",
      link: "/begin/home",
      img: "/icons/png/Book24_24.png",
    },
    {
      a: "shop",
      link: "/begin/shop",
      img: "/icons/png/Book24_24.png",
    },
    {
      a: "about",
      title: "про мене",
      link: "/begin/about",
      img: "/icons/png/Book24_24.png",
    },
    {
      a: "blog",
      link: "/begin/blog",
      img: "/icons/png/Book24_24.png",
    },
    {
      a: "contact",
      link: "/begin/contacts",
      img: "/icons/png/Book24_24.png",
    },
  ]
  const footerList = [
    {
      url: "https://github.com/didoshakra",
      img: "/icons/social/github-retina.png",
      a: "github",
    },
    {
      url: "https://twitter.com/DidoshakR",
      img: "/icons/social/twitter-retina.png",
      a: "twitter",
    },
    {
      url: "https://www.facebook.com/profile.php?id=100004339204236",
      img: "/icons/social/facebook-f-64-grow.png",
      a: "facebook",
    },
  ]

  //********************************************************************** */
//   const RenderMenu = ({ menu, title = "" }) => (
//     <ul className="DrawerDroop-itemWraper">
//       <p className="DrawerDroop-itemTitle">{title}</p>
//       {menu.map((item, index) => {
//         return (
//           <li className="DrawerDroop-item" key={index}>
//             <img src={item.img} alert="logo" top="5" height="20" />
//             {item.link ? (
//             //   <Link href={`${item.link}`}>
//             //     <a title={item.title ? item.title : item.a}>{item.a}</a>
//             //   </Link>
//               <Link href={`${item.link}`}>
//                 <a title={item.title ? item.title : item.a}>{item.a}</a>
//               </Link>
//             ) : (
//               <a title={item.a} href={`${item.url}`}>
//                 {item.a}
//               </a>
//             )}
//           </li>
//         )
//       })}
//       <style jsx>
//         {`
//           //*** item ******************************
//           .DrawerDroop-itemWraper {
//             padding: 0;
//             margin: 0;
//             // width: 150px;
//             background: ${theme.colors.headMenuBackground};
//           }
//           .DrawerDroop-itemTitle {
//             font-size: 14px;
//             font-weight: 400;
//           }

//           .DrawerDroop-item {
//             //position: relative;
//             display: flex;
//             margin: 0;
//             padding: 5px 10px;
//             font-size: 18px;
//             font-weight: 100;
//             font-family: ${theme.fontFamily.serif};
//             list-style-type: none;
//             align-items: center;
//             text-decoration: none;
//             color: ${theme.colors.headText};
//             background: ${theme.colors.headMenuBackground};
//             // background: ${theme.colors.headBackground};
//           }
//           .DrawerDroop-item:hover {
//             //   color: ${theme.colors.headIconHover};
//             background: ${theme.colors.headMenuBackgroundHover};
//             cursor: pointer;
//           }

//           //DrawerDroop-item:hover:hover спрацьовує дочірне <a>
//           .DrawerDroop-item:hover a {
//             color: ${theme.colors.headMenuTextHover};
//             background: ${theme.colors.headMenuBackgroundHover};
//           }

//           .DrawerDroop-item a {
//             margin-left: 10px;
//             padding: 0;
//             display: flex;
//             align-items: center; //Y Вирівнювання
//             color: ${theme.colors.headMobileText};
//             //   background: ${theme.colors.headMobileBackground};
//             background: ${theme.colors.headBackground};
//           }
//         `}
//       </style>
//     </ul>
//   )
  //********************************************************************** */
  return (
    <div className="DrawerDroop">
      <div className="DrawerDroop-header">
        <div className="DrawerDroop-header_logo">
          <Link href="/">
            <Image title="ramag" width={80} height={80} src="/images/head/sun_man_mount-380.png" alt="logo" />
          </Link>
          <Link href="/" legacyBehavior>
            <a className="DrawerDroop-header_text" title="RAMAG">
              RAMAG
            </a>
          </Link>
        </div>

        <div
          onClick={(e) => setDrawerOpen(false)}
          className="drawerSwitcher__icon"
          onMouseEnter={toggleHover}
          onMouseLeave={toggleNotHover}
        >
          <IconCancel
            width={iconSize}
            height={iconSize}
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
          />
        </div>
      </div>
      {/* --- Список меню ----------------------------------------- */}
      <hr width="100%" color="red" />
      <Navbar multilevelMenu={menuAdmin} />
      {/* ----------------------------------------------------------- */}
      <hr width="100%" color="red" />
      <Navbar multilevelMenu={menuDocuments} />
      {/* ----------------------------------------------------------- */}
      {/* Divider/Роздільник */}
      <hr width="100%" color="red" />
      {/* <RenderMenu title={"external/зовнішні"} menu={footerList} /> */}
      <hr width="100%" color="red" />
      <style jsx>
        {`
          .DrawerDroop {
            position: fixed;
            // position: absolute;
            max-width: ${driwerMaxWidht};
            max-height: ${driwerMaxHeight};
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
            overflow-y: scroll; //Дає прокрутку по висоті
            // overflow-y: auto; //Дає прокрутку по висоті
            overflow-x: hidden; //Обрізаєм все, що не влізає в область */
            border: 0 0 5px 5px;
            // border-radius: 0 0 5px 5px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 5;
            color: ${theme.colors.headDroopMenuText};
            // background: ${theme.colors.headBackground};
            // background: url("/images/head/sun_man_mount-380.png") 100% 100% no-repeat;
            background: ${theme.colors.headBackground};

            //*** Збільшується (зліва/Зміна width)
            width: ${drawerOpen ? driwerWidht : "0px"};
            height: ${driwerHeight};

            //*** Збільшується (Зміна height/width(зверху зліва-> вниз вправо)
            // width: ${drawerOpen ? driwerWidht : "0px"};
            // height: ${drawerOpen ? driwerHeight : "0px"};

            //*** Збільшується (зверху/Зміна height)
            // width: ${driwerWidht};
            // height: ${drawerOpen ? driwerHeight : "0px"};

            // *** Весь розмір/ виїжджає (width/height\transform: "translate(100%,0))
            // left: calc(-${driwerWidht});
            // width: ${driwerWidht};
            // height: ${driwerHeight};
            // transform: ${drawerOpen ? "translate(100%,0)" : "translate(0,0)"}; //Виїжджає зліва/transform

            //*** Весь розмір/ проявляеться не діє transition(display: "block" : "none")
            // width: ${driwerWidht};
            // height: ${driwerHeight};
            // display: ${drawerOpen ? "block" : "none"}; //проявляеться display: "block" : "none"}

            // Для плавного показу (анімація) (width 1s, height 1s;)
            transition: all 0.5s ease-in-out;
            // transition: all 0.22s ease-in;
            // transition: transform 0.22s ease-in;
          }
          .DrawerDroop-item {
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
          .DrawerDroop-item:hover {
            color: ${theme.colors.headDroopMenuTextHover};
            background: ${theme.colors.headDroopMenuBackgroundHover};
            cursor: pointer;
          }
          .DrawerDroop-header {
            height: 80px;
            padding: 0 10px;
            // margin: 5px 10px;

            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #3b6a3d;
          }

          .DrawerDroop-header_logo {
            padding: 0 1vw;
            display: flex;
            align-items: center;
            // background-color: red;
            background-color: #3b6a3d;
            // background: ${theme.colors.headBackground};
          }
          .DrawerDroop-header_text {
            padding: 0 1vw;
            font-family: ${theme.fontFamily.sansSerif};
            font-size: 20px;
            font-weight: 800;
            color: #3bff3d;
            color: ${theme.colors.headLogoText};
            background-color: #3b6a3d;
            // background: ${theme.colors.headBackground};
          }
          .DrawerDroop-header_text:hover {
            color: ${theme.colors.headLogoTextHover};
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
          .draweSwitcher__iconWraper:hover {
            color: ${theme.colors.headIconHover};
            background: ${theme.colors.headIconBackgroundHover};
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}
