//Footer.js ff
//Добавлено animat
import { useContext } from "react"
import { ComponentContext } from "../../context/ComponentContext"
import IconHeart_c2 from "../ui/svg/IconHeart_c2"
import IconMapMarker_c4 from "../../components/ui/svg/IconMapMarker_c4"
import IconPhone from "../../components/ui/svg/social/IconPhone"
import IconMail_с2 from "../../components/ui/svg/social/IconMail_c2"
import IconFacebook from "../../components/ui/svg/social/IconFacebook"
import IconTwitter from "../../components/ui/svg/social/IconTwitter"
// import IconInstagram_с2 from "../../components/ui/svg/social/IconInstagram_c2"
import IconShevronUp from "../ui/svg/IconShevronUp" //^Стрілка вверх

const Footer = () => {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  //   const dataTime = typeof window !== "undefined" && new Date().toString()
//   const dataTime = typeof window !== "undefined" ? new Date().toString() : ""
  return (
    <section className="footer-section">
      {/* <div className="footer-arrow-up-row"> */}
      <div className="footer-mouse">
        <a href="#" className="footer-mouse-icon">
          <div className="footer-mouse-wheel">
            <span className="ion-ios-arrow-up">
              <IconShevronUp width={theme.size.headIcon} height={theme.size.headIcon} />
            </span>
          </div>
        </a>
      </div>
      {/* </div> */}
      <div className="footer-context-row">
        <div className="footer-context-item-col">
          <h2 className="item__vegefoods-heading">RAMAG</h2>
          <p>
            Сонце - це життя, гори - це свобода, а сонце і гори - це вільне життя!
            Гори – це сходинки в небо. Піднімаючись по них, я йду до нового життя …
          </p>
          <ul className="footer-social">
            <li>
              <a href="https://twitter.com/DidoshakR">
                <span className="icon-social">
                  <IconTwitter width={theme.size.headIcon} height={theme.size.headIcon} />
                </span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/profile.php?id=100004339204236">
                <span className="icon-social">
                  <IconFacebook width={theme.size.headIcon} height={theme.size.headIcon} />
                </span>
              </a>
            </li>
          </ul>
          {/* </div> */}
        </div>
        <div className="footer-context-item-col">
          <h2 className="ftco-heading-2">Меню</h2>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="py-2 d-block">
                Магазин
                {/* Shop */}
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Про нас
                {/* About */}
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Журнал
                {/* Journal */}
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Звяжіться з нами
                {/* Contact Us */}
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-context-item-col">
          <h2 className="ftco-heading-2">
            Довідка
            {/* Help */}
          </h2>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="py-2 d-block">
                Інформація Доставка
                {/* Shipping Information */}
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Повернення &amp; Обмін
                {/* Returns &amp; Exchange */}
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Умови
                {/* Terms &amp; Conditions */}
              </a>
            </li>
            {/* <li>
              <a href="#" className="py-2 d-block">
                Privacy Policy
              </a>
            </li> */}
          </ul>
          <ul className="list-unstyled">
            <li>
              <a href="#" className="py-2 d-block">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="py-2 d-block">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-context-item-col">
          <h2 className="ftco-heading-2">Є запитання?</h2>
          <ul className="list-unstyled">
            <li>
              <span className="item-questions__icon">
                <IconMapMarker_c4
                  width={theme.size.tableIcon}
                  height={theme.size.tableIcon}
                  colorFill="#000"
                  colorStroke="#000"
                />
              </span>
              <span className="text"> вул.Паркова , Калуш, Україна</span>
            </li>
            <li>
              <a href="#">
                <span className="item-questions__icon">
                  <IconPhone width={theme.size.tableIcon} height={theme.size.tableIcon} />
                </span>
                <span className="text">+ 38(067) 777-77-77</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="item-questions__icon">
                  <IconMail_с2 width={theme.size.tableIcon} height={theme.size.tableIcon} />
                </span>
                <span className="text">info@roma.com</span>
              </a>
            </li>
          </ul>
          {/* </div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="footer-copyright-row">
            <p>
              {/* Copyright © {new Date().getFullYear()} */}
              Copyright © {new Date().toDateString()}
              {/* Copyright © {new Date().toString()} */}
              <IconHeart_c2
                width={theme.size.tableIcon}
                height={theme.size.tableIcon}
                colorFill="#000"
                colorStroke="#000"
              />{" "}
              {/* <a href="https://colorlib.com" target="_blank">
                Colorlib
              </a> */}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-section {
          //display: block// по замовчуванню (для section)
          padding: 5rem 1vw; //rem-шрифт кореневого
          position: relative;
          font-size: 14px;
          color: #000000;
          //border: 2px solid #82ae46;
        }

        .footer-arrow-up-row {
          margin-bottom: 3rem; //mb-5
          padding: 1rem 5vw; //Відступи всередині контейнера row
          display: flex; //row
          flex-wrap: wrap; //row
          justify-content: center; //justify-content-center
          align-items: center;
          //border: 1px solid rgba(63, 93, 35, 1);
        }
        .footer-context-row {
          padding: 1rem 5vw; //Відступи всередині контейнера row
          display: flex; //row
          flex-direction: column;
          //border: 1px solid rgba(63, 93, 35, 1);
          flex: 0 1 auto;
          justify-content: space-between; //Крайні елементи притискаються до країв
          align-items: flex-start; //Y-вертикально //R-щоб рівняло по верху
        }
        .footer-context-item-col {
          padding: 0 0.5vw;
          position: relative; //col-md
          width: 100%; //col-md
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start; //Y-вертикально //R-щоб рівняло по верху
          text-align: left;
          //border: 1px solid rgb(57, 57, 214);
        }

        //

        .footer-item {
          position: relative;
          width: 100%;
        }
        list-unstyled {
          list-style-type: none; /**Отменяет маркеры для списка. */
        }
        @media (min-width: 600px) {
          .footer-section {
            padding: 6rem 2vw; //rem-шрифт кореневого
          }
          .footer-container {
            flex-direction: row; //row-по замовчуванню
          }
          .footer-context-row {
            flex-direction: row; //row-по замовчуванню
            justify-content: center;
          }
        }

        .ftco-footer-logo {
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .footer-context-item-col h2 {
          margin-bottom: 1.5rem;
        }
        .footer-context-item-col h2 {
          font-weight: normal;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 500;
        }
        .footer-context-item-col ul li {
          font-size: 14px;
          margin-bottom: 0px;
        }
        .footer-context-item-col ul li a {
          color: #000000;
        }
        .footer-context-item-col .btn-primary {
          border: 2px solid #fff !important;
        }
        .footer-context-item-col .btn-primary:hover {
          border: 2px solid #fff !important;
        }

        .footer-social {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-social li {
          list-style: none;
          margin: 0 10px 0 0;
          display: inline-block;
        }
        .footer-social li a {
          height: 50px;
          width: 50px;
          display: block;
          float: left;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 50%;
          position: relative;
        }
        .footer-social li a span {
          position: absolute;
          font-size: 26px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #000000;
        }
        .footer-social li a:hover {
          color: #000000;
        }
        .footer-copyright-row {
          display: flex;
          justify-content: center;
          text-align: center;
        }
        ///
        .footer-mouse {
          position: absolute;
          left: 0;
          right: 0;
          top: -30px;
          //   z-index: 99;
        }

        .footer-mouse-icon {
          width: 60px;
          height: 60px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          -ms-border-radius: 50%;
          border-radius: 50%;
          background: #82ae46;
          cursor: pointer;
          position: relative;
          text-align: center;
          margin: 0 auto;
          display: block;
        }

        .footer-mouse-wheel {
          height: 30px;
          margin: 2px auto 0;
          display: block;
          width: 30px;
          background: transparent;
          border-radius: 50%;
          animation: 1.6s ease infinite wheel-up-down;
          color: #fff;
          font-size: 20px;
        }
        @keyframes wheel-up-down {
          100% {
            margin-top: 2px;
            opacity: 1;
          }
          30% {
            opacity: 1;
          }
          0% {
            margin-top: 20px;
            opacity: 0;
          }
        }
        .item-questions__icon {
          margin-right: 1rem;
        }
      `}</style>
    </section>
  )
}
export default Footer
