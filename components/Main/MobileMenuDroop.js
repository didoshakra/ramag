//MobileMenuDroop.js //https://coursehunter.net/course/reactjs-s-nulya-do-profi
//Випадаюче меню(Мобіле)
import { useContext, useRef, useEffect } from "react"
import Link from "next/link"
import { ComponentContext } from "../../context/ComponentContext"

const MobileMenuDroop = (props) => {
  const { state } = useContext(ComponentContext)
  const theme = state.theme

  //*** Для клацання поза обєктом ***/
  //Добавити в контрольований об'єкт-(ref={wRef})- (<ul ref={wRef}... )
  const wRef_MobileMenuDroop = useRef(null) //Для клацання поза обєктом
  //https://qna.habr.com/q/855061
  useEffect(() => {
    const onClick = (e) => wRef_MobileMenuDroop.current.contains(e.target) || props.mobileMenuToggle(false)
    //, console.log("MobileMenuDroop: клік поза компонентом"))
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
//       // Посилання  на вказаний елемент іконки  (ClassName="mobileMenuIcon" з модуля MobileMenuIcon.js) який треба виключити
//       const iconBlock = document.getElementsByClassName(
//         // "mobileMenu__droop__icon"
//         "mobileMenuIcon"
//       )[0]
//       //!e.path.includes(iconBlock)-чи є в списку батьківських або дочінрних елементів      вищезгаданий елемент
//       //Проверяем, есть ли в списке родительских или дочерних элементов, вышеуказанный компонент
//       // console.log("MobileMenuDroop.js/mobileMenu__droop__icon=", iconBlock);
//       if (ref.current && !ref.current.contains(event.target) && !event.path.includes(iconBlock)) {
//         //Якщо поза елементом
//         // alert("Ти клацнув поза мною!")
//         if (props.mobileMenuOpen) {
//           props.mobileMenuToggle(false) //Закриваєм меню
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
//   //end/*** Для клацання поза обєктом ***/

  const renderMenu = () => {
    return props.menu.map((item, index) => {
      return (
        <li className="mobileMenuDroop__dropdown__item" key={index}>
          <Link href={`${item.link}`} >
            {item.a}
          </Link>
        </li>
      )
    })
  }

  return (
    //  Мобільна навігація
    <div className="MobileMenuDroop">
      {/* <ul ref={wRef}>{props.renderMenu()}</ul> */}
      <ul className="mobileMenuDroop__dropdown" ref={wRef_MobileMenuDroop}>
        {renderMenu()}
      </ul>

      <style jsx global>{`
        .mobileMenuDroop__dropdown__item {
          margin: 0;
          padding: 0; //Щоб зробити заокруглення
          padding: 5px 10px; //Щоб зробити заокруглення
          text-decoration: none;
        }

        .mobileMenuDroop__dropdown__item span:hover {
          color: ${theme.colors.headMobileTextHover};
          background: ${theme.colors.headMobileTextBackgroundHover};
          cursor: pointer;
        }
        .mobileMenuDroop__dropdown__item:hover {
          color: ${theme.colors.headMobileTextHover};
          background: ${theme.colors.headMobileTextBackgroundHover};
          cursor: pointer;
        }
        //Щоб мінявся і <a> пр наведенні на mobileMenuDroop__dropdown__item
        .mobileMenuDroop__dropdown__item:hover span {
          color: ${theme.colors.headMobileTextHover};
          background: ${theme.colors.headMobileTextBackgroundHover};
          cursor: pointer;
        }
        .mobileMenuDroop__dropdown__item span {
          font-size: 15px; //Рукавичка
          font-weight: 100; //грубина
          font-family: ${theme.fontFamily.serif};
          color: ${theme.colors.headMobileText};
          //   background: ${theme.colors.headMobileBackground};
          background: ${theme.colors.headBackground};
        }
      `}</style>

      <style jsx>{`
        .MobileMenuDroop {
          position: relative;
          top: 0px;
          left: 0px;
          display: ${props.mobileMenuOpen ? "block" : "none"};
          height: 100%;
          height: 200px;
          //   background: ${theme.colors.headMobileBackground};
          background: ${theme.colors.headBackground};
          transition: display 0.4s ease-in;
        }

        .mobileMenuDroop__dropdown {
          padding: 0; //треба
          margin: 0; //треба
        }
      `}</style>
    </div>
  )
}

export default MobileMenuDroop
