//CarouselRa.js  на основі //CarouselAn.js //https://habr.com/ru/post/467079/

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" //fontawesome
import { faQuoteLeft, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import IconArrowRight from "../svg/IconArrowRight"
import IconArrowLeft from "../svg/IconArrowLeft"

const listSlides = [
  {
    // src: "/minishop/images/gallery-1.jpg",
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img0.jpg",
    p: "Опис 1",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img1.jpg",
    // src: "/minishop/images/gallery-2.jpg",
    p: "Опис 2",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img2.jpg",
    // src: "/minishop/images/gallery-3.jpg",
    p: "Опис 3",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img3.jpg",
    // src: "/minishop/images/gallery-4.jpg",
    p: "Опис 4",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img4.jpg",
    // src: "/minishop/images/gallery-5.jpg",
    p: "Опис 5",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img5.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 6",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img6.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 7",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img7.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 8",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img8.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 9",
  },
  {
    src: "http://pvbk.spb.ru/inc/carousel/imgs/img9.jpg",
    // src: "/minishop/images/gallery-6.jpg",
    p: "Опис 10",
  },
]
//******************************************************************************* */
const CarouselRa = (props) => {
  //!!! Прокрутка дотиком і перетягуванням : Завжди включена
  const parListSlides = props.ListSlides || listSlides // Кількість відображуваних елементів в каруселі
  const parVisibleElementsMobi = props.VisibleElementsMobi || "1" // Кількість відображуваних елементів в каруселі
  const parVisibleElements = props.VisibleElements || "5" // Кількість відображуваних елементів в каруселі
  const parHeight = props.Height || "270px" // Висота зображення
  const parAuto = props.Auto || false // Автоматична прокрутка
  const parInterval = props.Interval || "3000" // Для автопрокрутки:Інтервал між прокруткою елементів (мс)
  const parSpeed = props.Speed || "0.75" // Швидкість анімації(переміщення) (с)
  const parArrows = props.Arrows || false // Показувати стрілки прокрутки
  const parArrowsMobi = props.ArrowsMobi || false // Показувати стрілки прокрутки (мобілки)
  const parDotsIn = props.DotsIn || false // Індикатори всередині
  const parDotsInMobi = props.DotsInMobi || false // Індикатори всередині(мобілки)
  const parDots = props.Dots || false // Індикатори ззовні
  const parDotsMobi = props.DotsMobi || false // Індикатори ззовні(мобілки)
  const parDotsActiveColor = props.DotsActiveColor || "#000" // Індикатори на мобі
  const parDotsBackgroundColor = props.DotsBackgroundColor || "#BBB" // Індикатори на мобі
  // const parDotsActiveColor = props.DotsActiveColor ||"rgba(219,50,17,1)"; // Індикатори на мобі
  // const parDotsBackgroundColor = props.DotsBackgroundColor ||"rgba(219,50,17,0.2)"; // Індикатори на мобі

  //Визначення ширини вікна браузера //https://dev.to/3sanket3/usewindowsize-react-hook-to-handle-responsiveness-in-javascript-3dcl
  const isWindowClient = typeof window === "object"
  const [windowSize, setWindowSize] = useState(isWindowClient ? window.innerWidth : undefined)
  const elemAll = parListSlides.length //Величина масиву слайдів(даних)
  //*Змінні з параметрів
  const [parametrs, setParametrs] = useState({
    visiElement: windowSize < 600 ? parVisibleElementsMobi : Math.min(parVisibleElements, elemAll),
    parDots: windowSize < 600 ? parDotsMobi : parDots,
    parDotsIn: windowSize < 600 ? parDotsInMobi : parDotsIn,
    parArrows: windowSize < 600 ? parArrowsMobi : parArrows,
  })

  //*робочий масив(збільшений на visiElement)
  const listSlidesRob = parListSlides.concat(
    parListSlides.slice(0, parametrs.visiElement) //масив даних
  )

  //*робочі змінні
  const [workVares, setWorkVares] = useState({
    first: true, //Щоб при вході не перекидало на 1 позицію
    actElement: 0,
    transitionCss: `transform ${parSpeed} sease`,
    cursor: "default",
  })

  //*змінні для Точ Екранів (x,y)//https://www.linkedin.com/pulse/touch-detection-react-daniel-paschal/
  const [touchStartLocation, setTouchStartLocation] = useState({
    x: 0,
    y: 0,
  })
  //*змінні для перетягування https://habr.com/ru/post/463463/
  const [dragPozocion, setDragPozocion] = useState({
    startX: 0,
    startY: 0,
    // deltaXpx: "0px",
    // deltaYpx: "0px",
  })

  const renderList = () => {
    var urlz = ""
    return listSlidesRob.map((item) => {
      urlz = `url('${item.src}') center no-repeat`
      return (
        <li
          className="ra-carousel_element-wraper"
          // style={{
          //   background: urlz, //:"url('/minishop/images/gallery-1.jpg')",
          //   backgroundSize: "cover",
          // }}
        >
          {/* <p className="ra-carousel_element_p">{item.p}</p> */}
          {/* -- testimony -- */}
          <div className="testimony-item__wrap">
            <div
              className="testimony-item__img"
              style={{
                background: urlz,
                backgroundSize: "cover",
              }}
            >
              <span className="testimony-item__guote">
                <i className="testimony-item__guote-icon">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </i>
              </span>
            </div>
            <div className="testimony-item__user">
              <p className="testimony-item__user-text">
                {/* Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. */}
                {item.userText}
              </p>
              <p className="testimony-item__user-name">
                {/* Garreth Smith */}
                {item.userName}
              </p>
              <span className="testimony-item__user-position">
                {/* Marketing Manager */}
                {item.userPosition}
              </span>
            </div>
          </div>
        </li>
      )
    })
  }

  const renderDots = () => {
    return parListSlides.map((item, index) => {
      // console.log("renderDots/workVares.actElement=", workVares.actElement);
      return (
        <span
          data-index={index} //data-ХХ->Для передачі даних в e.currentTarget.dataset.XX
          className="ra-dot"
          style={{
            backgroundColor:
              index == workVares.actElement || (index == 0 && workVares.actElement == elemAll)
                ? parDotsActiveColor
                : parDotsBackgroundColor,
            cursor: index == 0 ? "default" : "pointer",
            // ,
          }}
          onClick={onDots}
        ></span>
      )
    })
  }

  const arrowRight = () => {
    if (workVares.actElement >= elemAll) {
      setWorkVares({
        first: false,
        actElement: 0,
        transitionCss: "none",
      })
    } else {
      setWorkVares({
        first: false,
        actElement: workVares.actElement + 1,
        transitionCss: `transform ${parSpeed} sease`,
      })
    }
  }
  const arrowLeft = () => {
    if (workVares.actElement <= 0) {
      setWorkVares({
        first: true,
        actElement: elemAll - 1,
        transitionCss: "none",
      })
    } else {
      setWorkVares({
        first: true,
        actElement: workVares.actElement - 1,
        transitionCss: `transform ${parSpeed} sease`,
      })
    }
  }

  const onDots = (e) => {
    const i = e.currentTarget.dataset.index
    let newActElement = Number(i)
    setWorkVares({ first: true, actElement: newActElement })
    renderDots() //Пересвітка ативності Dots
  }

  useEffect(() => {
    // обробник, який буде викликаний при зміні розміру екрана
    function setSize() {
      setWindowSize(window.innerWidth) //👈
      // Зміна кількості видимих слайдів в залежності від розміру вікна
      if (window.innerWidth < 600) {
        setParametrs({
          visiElement: parVisibleElementsMobi,
          parDots: parDotsMobi,
          parDotsIn: parDotsInMobi,
          parArrows: parArrowsMobi,
        })
      } else {
        setParametrs({
          visiElement: Math.min(parVisibleElements, elemAll),
          parDots: parDots,
          parDotsIn: parDotsIn,
          parArrows: parArrows,
        })
      }
    }
    if (isWindowClient) {
      //Реєстрація слухача розміру вікна
      window.addEventListener("resize", setSize)

      //Розреєстрація слухача розміру вікна
      return () => window.removeEventListener("resize", setSize)
    }
  }, [isWindowClient, setWindowSize])

  useEffect(() => {
    //Запуск таймера автоматичної прокрутки слайдів
    if (parAuto) {
      const timer = setTimeout(() => {
        arrowRight()
      }, parInterval)
      return () => clearTimeout(timer) //Для того щоб таймер не запускався при кожному arrowRight
    }
  }, [arrowRight])

  useEffect(() => {
    //Для зациклювання прокрутки вправо
    if (workVares.actElement == 0 && !workVares.first && !parAuto) {
      setWorkVares({
        first: true,
        actElement: workVares.actElement + 1,
        transitionCss: `transform ${parSpeed} sease`,
      })
    }
  }, [workVares.actElement])

  // useEffect(() => {
  //   //Рух пальцем по екрані прослуховування подій
  //   !!! Працює але краще <div onTouchStart і onTouchEnd>
  //
  //   //***Перехватуємо події дотиків до екрану
  //   document.addEventListener("touchstart", handleTouchStart);
  //   document.addEventListener("touchend", handleTouchEnd);
  //   return () => {
  //     // Відміна перехвату подій дотиків до екрану
  //     document.removeEventListener("touchstart", handleTouchStart);
  //     document.removeEventListener("touchcancel", handleTouchEnd);
  //   };
  // });

  //Рух пальцем по екрані
  //https://www.linkedin.com/pulse/touch-detection-react-daniel-paschal/
  const handleTouchStart = (e) => {
    // console.log(
    //   "handleTouchStart/x:",
    //   e.touches[0].clientX + " /y:" + e.touches[0].clientY
    // );
    setTouchStartLocation({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }
  const handleTouchEnd = (e) => {
    // console.log(
    //   "handleTouchEnd/x:",
    //   e.changedTouches[0].clientX + " /y:" + e.changedTouches[0].clientY
    // );
    const deltaX = e.changedTouches[0].clientX - touchStartLocation.x
    const deltaY = e.changedTouches[0].clientY - touchStartLocation.x
    // console.log("handleTouchEnd/deltaX:", deltaX + " /deltaY:" + deltaY);
    if (deltaX !== 0) {
      if (deltaX > 0) {
        arrowRight()
      } else {
        arrowLeft()
      }
    }
  }
  // Перетягування мишкою  https://habr.com/ru/post/463463/
  const handleDragStart = (e) => {
    // console.log("handleDraghStart/x:", e.pageX + " /y:" + e.pageY)
    setDragPozocion({
      startX: e.pageX,
      startY: e.pageY,
    })
  }
  const handleDragEnd = (e) => {
    // console.log("handleDragEnd/x:", e.pageX + " /y:" + e.pageY);
    let newDeltaX = dragPozocion.startX + e.pageX
    // let newDeltaXpx = `${newDeltaX}px`;
    let newDeltaY = dragPozocion.startY + e.pageY
    // let newDeltaYpx = `${newDeltaY}px`;
    // console.log(
    //   "handleTouchEnd/newDeltaX:",
    //   newDeltaX + " /newDeltaY" + newDeltaY
    // );
    if (newDeltaX !== 0) {
      if (newDeltaX > 0) {
        arrowRight()
      } else {
        arrowLeft()
      }
    }
  }

  return (
    <div className="ra-carousel">
      <ul
        className="ra-carousel_ul"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        draggable="true" //Для перетягування https://habr.com/ru/post/463463/
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {renderList()}
      </ul>
      <div className="ra-carousel_arrow-left" onClick={arrowLeft}>
        {parametrs.parArrows ? <IconArrowLeft width={"32"} color={"red"} /> : ""}
      </div>
      <div className="ra-carousel_arrow-right" onClick={arrowRight}>
        {parametrs.parArrows ? <IconArrowRight width={"32"} color={"red"} /> : ""}
      </div>
      <div className="ra-carousel_dots-in">{parametrs.parDotsIn ? renderDots() : ""}</div>
      {/* </div> */}
      <div div className="ra-carousel_dots">
        {parametrs.parDots ? renderDots() : ""}
      </div>
      <style jsx global>{`
        ///Зовнішній блок????
        .testimony-item__wrap {
          padding-bottom: 3rem; //pb-5
          padding: 1.5rem; //p-4
          display: block;
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(0, 0, 0, 0.8);
        }
        .testimony-item__img {
          margin: 0 auto;
          margin-bottom: 3rem; //mb-5
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: relative;
          //margin-top: -75px;
        }
        .testimony-item__guote {
          //d-flex align-items-center justify-content-center
          display: flex;
          align-items: center;
          justify-content: center;
          //
          position: absolute;
          bottom: -10px;
          right: 0;
          width: 40px;
          height: 40px;
          background: #fff;
          //-webkit-border-radius: 50%;
          //-moz-border-radius: 50%;
          //-ms-border-radius: 50%;
          border-radius: 50%;
          color: #82ae46;
        }
        .testimony-item__guote-icon {
          position: absolute;
          bottom: -10px;
          right: 0;
          width: 40px;
          height: 40px;
          background: #fff;
        }

        .testimony-item__user-name {
          font-weight: 400;
          font-size: 18px;
          margin-bottom: 0;
          color: #000000;
        }
        .testimony-item__user-position {
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .testimony-item__wrap .line {
          position: relative;
          border-left: 1px solid #e6e6e6;
        }
        .testimony-item__wrap .line:after {
          position: absolute;
          top: 50%;
          left: -2px;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          content: "";
          width: 3px;
          height: 30px;
          background: #82ae46;
        }
        /////
        .ra-carousel_element-wraper {
          position: relative;
          padding: 0 0.1vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 0 0 auto;
          //height: auto;
          width: calc(100% / ${parametrs.visiElement});
          text-align: center;
          //border: 2px solid #6e46ae;
        }
        .ra-carousel_element_p {
          color: red;
          font-size: 20px;
          font-weight: 800;
        }
        .ra-dot {
          width: 10px;
          width: 10px;
          height: 10px;
          height: 10px;
          margin: 0 0.5vw;
          padding: 0;
          display: inline-block;
          border-radius: 5px;
          border: 1px solid ${parDotsActiveColor};
          background-color: ${parDotsBackgroundColor};
          //background-color: #bbb;
          //background-color: rgba(219, 50, 17, 1);
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .ra-carousel {
          margin: 0;
          padding: 0;
          width: 100%;
          //display: block;
          overflow: hidden;
          padding-top: 0;
          // border: 1px solid #ccd;
          background-color: white;
          //border: 2px solid rgba(135, 12, 86, 1);
        }
        .ra-carousel_ul {
          position: relative;
          width: 100%;
          height: ${parHeight};
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          justify-content: flex-start;
          //border: 2px solid #82ae46;
          transform: translateX(calc(100% / ${parametrs.visiElement}* ${workVares.actElement}*-1));
          transition: ${workVares.transitionCss};
          cursor: grab;
        }
        .ra-carousel_arrow-left,
        .ra-carousel_arrow-right {
          top: 0;
          width: 4vw;
          height: 100%;
          position: absolute;
          cursor: pointer;
          display: flex;
          align-items: center;
        //   z-index: 100;
        }
        .ra-carousel_arrow-icon {
          height: 4vw;
        }
        .ra-carousel_arrow-left {
          left: 0;
          //background: url("/svg/pnp/arrow-left-32.png") no-repeat center left;
          //border: 1px solid #2b11bd;
        }

        .ra-carousel_arrow-right {
          justify-content: flex-end; //треба коли icon
          right: 0;
          //background: url("/svg/pnp/arrow-right-32.png") no-repeat center right;
          //border: 1px solid #2b11bd;
        }

        .ra-carousel_dots {
          //width: 100%;
          text-align: center;
          padding: 0.1vw;
          //bottom: 0.1vw
        }
        .ra-carousel_dots-in {
          width: 100%; //при position: absolute- треба бо зїде вправо
          position: absolute;
          text-align: center;
          bottom: 0.1vw;
        //   z-index: 10;
        }
      `}</style>
    </div>
  )
}
export default CarouselRa
