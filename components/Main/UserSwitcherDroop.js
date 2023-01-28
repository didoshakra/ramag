//UserSwitcherDroop.js
//Саме випадаюче меню мови

import { useContext, useRef, useEffect } from "react"
import { ComponentContext } from "../../context/ComponentContext"
// import { useSession, signIn, signOut } from "next-auth"

const UserSwitcherDroop = (props) => {
  const { state } = useContext(ComponentContext)
  const { theme } = state
//    const [session] = useSession()

  const loginToggle = (e) => {
    // setLangMenuOpen(!langMenuOpen)
      e.preventDefault()
      signIn()
  }
  const registrationToggle = (e) => {
    // setLangMenuOpen(!langMenuOpen)
     e.preventDefault()
    //  signOut()
  }
  return (
    <div className="userSwitcherDroop">
      <ul className="userSwitcherDroop__menu">
        {/* <li className="userSwitcherDroop__dropdown__item">
          {session && (
            <a href="#" onClick={loginToggle} className="btn-signin">
              Sign out/Вийти
            </a>
          )}
          {!session && (
            <a href="#" onClick={handleSignin} className="btn-signin">
              Sign in/Вхід
            </a>
          )}
          <a href="#" onClick={handleSignin} className="userSwitcherDroop__dropdown__item-p">
            Sing in / Вхід
          </a>
        </li> */}
        <li className="userSwitcherDroop__dropdown__item" onClick={registrationToggle}>
          <a className="userSwitcherDroop__dropdown__item-p">Registration</a>
        </li>
      </ul>
      <style jsx global>{`
        .userSwitcherDroop__dropdown__item {
          display: flex;
          //position: relative;
          margin: 0;
          padding: 5px 10px;
          font-size: 18px;
          font-weight: 100;
          font-family: ${theme.fontFamily.serif};
          list-style-type: none;
          align-items: center;
          text-decoration: none;
          color: ${theme.colors.headText};
          background: ${theme.colors.headMenuBackground};
        }
        .userSwitcherDroop__dropdown__item:hover {
          color: ${theme.colors.headMenuTextHover};
          background: ${theme.colors.headMenuBackgroundHover};
          cursor: pointer;
        }

        //при userSwitcherDroop__menu__item:hover спрацьовує <a><.userSwitcherDroop__dropdown__item-p>
        // .userSwitcherDroop__dropdown__item:hover a {
        .userSwitcherDroop__dropdown__item:hover .userSwitcherDroop__dropdown__item-p {
          color: ${theme.colors.headMenuTextHover};
          background: ${theme.colors.headMenuTextBackgroundHover};
        }

        .userSwitcherDroop__dropdown__item-p {
          margin-left: 10px;
          padding: 0;
          display: flex;
          align-items: center; //Y Вирівнювання
          color: ${theme.colors.headMenuText};
          background: ${theme.colors.headMenuTextBackground};
        }
        .userSwitcherDroop__dropdown__item-p:hover {
          color: ${theme.colors.headMenuTextHover};
          background: ${theme.colors.headMenuTextBackgroundHover};
        }
      `}</style>
      <style jsx>{`
        .userSwitcherDroop {
          position: relative;
          margin: 0;
          padding: 0;
        }
        .userSwitcherDroop__menu {
          //плавно проявляється (opacity 0.5s)
          position: absolute; //Щоб працювали(top,bottom,left,right) материнський блок обовязково = position: relative;
          display: inline-block; //-(сам)Блок по ширині контенту
          //display: block; //+(з float: left;) Блок по ширині контенту
          //float: left; //+(з display: block)Блок по ширині контенту
          padding: 0;
          margin: 0;
          min-width: 180px; //якщо не працює display: inline-block(переносить слова)
          //bottom: -220px; //Від нижнього краю обох об'єктів()((+)вверх,(-)вниз)
          top: -0px; //Від верхнього краю обох об'єктів((+)вниз,(-)вверх)
          right: 0px;
          border-radius: 5px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        //   opacity: ${props.userMenuOpen ? "1" : "0"};
        //   z-index: ${props.userMenuOpen ? "1" : "-2"};
          transition: z-index 0.5s, opacity 0.5s linear;
          background: ${theme.colors.headMenuBackground};
        }
      `}</style>
    </div>
  )
}

export default UserSwitcherDroop
