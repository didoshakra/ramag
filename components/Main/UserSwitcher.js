//userSwitcher.js //
//Іконка мови окремо (випадаючий список викликається)

import { useState, useContext, useRef, useEffect } from "react"
import { ComponentContext } from "../../context/ComponentContext"
import NotAuthenticated from "../ui/svg/head/IconUser_border"

const userSwitcher = () => {
  const { state, dispatch, profile } = useContext(ComponentContext)
  const { theme } = state
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [iconHover, setIconHover] = useState(false) //Для тоого щоб працював hover
  const iconSize = "25"

  //Для тоого щоб працював hover
  const toggleHover = () => {
    // setIconHover(!iconHover);
    setIconHover(true)
  }
  const toggleNotHover = () => {
    setIconHover(false)
  }

  //***Для клацання поза обєктом
  const wRef_userSwitcher = useRef(null) //Для клацання поза обєктом

  //https://qna.habr.com/q/855061
  useEffect(() => {
    const onClick = (e) =>
      wRef_userSwitcher.current.contains(e.target) ||
      (setUserMenuOpen(false)
    //   ,console.log("userSwitcher: клік поза компонентом")
      )
    document.addEventListener("click", onClick, true)
    document.addEventListener("scroll", onClick, true)
    // document.addEventListener("mousedown", onClick) // віджали кнопку миші на елементі.
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("scroll", onClick, true)
    }
  }, [])

//   useOutsideAlerter(wRef) //Для клацання поза обєктом
//   function useOutsideAlerter(ref) {
//     //*** Для клацання поза елементом Решение с React ^ 16.8 с использованием хуков
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         //Якщо поза елементом
//         // alert("Ти клацнув поза мною!");
//         // userMenuToggle(); //Погано-спрацьвує від іншого обєкту
//         if (userMenuOpen) {
//           setUserMenuOpen(false) //Закриваєм меню
//         }
//       }
//     }
//     useEffect(() => {
//       // Прив’яжіть прослуховувач події
//       // document.addEventListener("mousedown", handleClickOutside);//натиснули / віджали кнопку миші на елементі.
//       document.addEventListener("scroll", handleClickOutside) //Для скролу
//       document.addEventListener("click", handleClickOutside, false) //Кликнули на елемент лівою кнопкою миші (на пристроях з сенсорними екранами воно відбувається при торканні).
//       return () => {
//         // Від’єднайте слухача події під час очищення
//         // document.removeEventListener("mousedown", handleClickOutside);
//         document.removeEventListener("scroll", handleClickOutside)
//         document.removeEventListener("click", handleClickOutside, false)
//       }
//     })
//   }

  //   console.log("profile=", profile);
  const userMenuOpenToggle = () => {
    setUserMenuOpen(!userMenuOpen)
    let newUser = "admin"
    if (profile === "admin") {
      newUser = "user"
    }
    // console.log("userSwitcher.js/newUser=", newUser)
    console.log("profile=", profile)
    dispatch({ type: "PROFILE", payload: newUser }) //Змінюємо state.user
  }

  return (
    <div ref={wRef_userSwitcher} className="userSwitcher">
      {/* іконка зміни користувача */}
      <div
        className="userSwitcher__iconWraper"
        // title={t("headerMenu_iconTitleTheme")}
        onClick={userMenuOpenToggle}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleNotHover}
      >
        {profile === "admin" ? (
          <img className="userSwitcher__avatar" />
        ) : (
          <NotAuthenticated
            width={iconSize}
            height={iconSize}
            colorFill={iconHover ? theme.colors.headIconHover : theme.colors.headIcon}
          />
        )}
      </div>
      {/* Випадаюче меню */}
      {/* <userSwitcherDroop userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} /> */}
      {/* <userSwitcherDroop userMenuOpen={userMenuOpen} /> */}
      <style jsx>{`
        .userSwitcher {
          position: relative;
          //margin: 0;
          //padding: 0;
          list-style-type: none; //маркери для списка.
        }
        .userSwitcher__iconWraper {
          display: flex;
          align-items: center;
          margin: 0;
          margin-right: 5px; //Відступ від кожного елемента зліва
          justify-content: center;
          color: ${theme.colors.headIcon};
          background: ${theme.colors.headBackground};
          //border: 2px solid ${theme.colors.headIcon};
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          border-radius: 36px;
          width: 36px;
          height: 36px;
        }
        .userSwitcher__iconWraper:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }

        .userSwitcher__iconWraper {
          margin-right: 5px; //Відступ від кожного елемента зліва
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: ${theme.colors.headIconBorderWidht} ${theme.colors.headIconBorderStyle} ${theme.colors.headIcon};
          border-radius: 36px;
          color: ${theme.colors.headIcon};
          //   background-image: url("/avatar/2.jpg");
        }
        .userSwitcher__iconWraper:hover {
          color: ${theme.colors.headIconHover};
          background: ${theme.colors.headIconBackgroundHover};
          cursor: pointer;
        }
        .userSwitcher__avatar {
          //width: 100%;
          //height: 100%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          //background-size: contain;
          background-size: cover;
          background-image: url("/avatar/2.jpg");
        }
      `}</style>
    </div>
  )
}

export default userSwitcher
