//https://reacttricks.com/learn-react-by-building-websites-with-next
//Layout.js
// динамічнИЙ імпорт <Header /> і <Footer /> для вибраного APP

import  { useContext } from "react"
import Head from "next/head"
import Header from "./Header"
import HeaderTape from "./HeaderTape"
// import Footer from "./Main/Footer";
import { ComponentContext } from "../../context/ComponentContext"

// const Header = dynamic(import("./Header"));//Тут теж працює

const Layout = ({ children, PageTitle, PageDescription }) => {
  const { state } = useContext(ComponentContext)
  const { theme } = state

  return (
    <div className="site-wrapper">
      <Head>
        <title>RAMAG | {PageTitle ? {PageTitle} : ""}</title>
        {PageDescription ? <meta name="description" content={PageDescription} /> : null}
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> */}
      </Head>
      {/* Самий верхній рядок Header/ телефон-соціалка*/}
      <HeaderTape />
      {/* <p>Для відступу</p>. */}
      {/* 2-й рядок Header/Логотип-рядок меню-конка мобільного меню-Налаштування(Теми,Мови) */}
      <Header />
      <div className="loyout__content-wrapper">{children}</div>
      {/* <Footer /> */}
      {/* ========================================================================== */}
      <style jsx global>{`
        //global Next.js
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        body {
          width: 100%;
          height: 100%;
          //
          margin: 0;
          font-size: 20px;
          line-height: 1.7;
          font-weight: 400;
          text-rendering: optimizeLegibility;
        }

        h1,
        h2,
        h3 {
          margin: 40px 0 30px;
        }

        h1 {
          font-size: 42px;
        }

        h2 {
          font-size: 36px;
        }

        p {
          // margin: 0 0 10px;
          margin: 0;
          padding: 0;
        }

        img {
          max-width: 100%;
        }
      `}</style>
      <style jsx global>{`
        //Для динамічних стилів окремо
        body {
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: ${theme.fontFamily.sansSerif};
        }
      `}</style>
      <style jsx>{`
        /* Layout */
        // Весь сайт
        site-wrapper {
          //   100% Браузера
          width: 100vw;
          height: 100vh;
        }

        // Нова сторінка
        .loyout__content-wrapper {
          min-height: 600px;
          //   position: relative;
          //   top: 0px;
          //   text-align: center;
        }
        @media (min-width: 960px) {
          .loyout__content-wrapper {
            margin-top: 50px; /*Щоб контент не заїжджав під шапку при плаваючій голові*/
          }
        }
      `}</style>
    </div>
  )
}

export default Layout
