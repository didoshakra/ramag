//Products.js
import { useContext } from "react"
import Image from "next/image"
import IconMenu from "../ui/svg/head/IconMenu"
import IconCart_с8 from "../ui/svg/IconCart_c8"
import IconHeart_с2 from "../ui/svg/IconHeart_c2"
import { ComponentContext } from "../../context/ComponentContext"
import rImage from "../../public/images/products/GLAMOUR/_GLAMOUR-DN3003_PM__7524.jpg"

const Products = () => {
  const { state } = useContext(ComponentContext)
  const theme = state.theme
  const products = [
    {
      id: 1,
      name: "GLAMOUR-DN3003_PM__7524",
      image: "/images/products/GLAMOUR/_GLAMOUR-DN3003_PM__7524.jpg",
      price: 20.0,
      discontProc: 0,
    },
    {
      id: 2,
      name: "GLAMOUR-DN3004_PM__7343",
      image: "/images/products/GLAMOUR/GLAMOUR-DN3004_PM__7343.jpg",
      price: 128.0,
      discontProc: 30,
    },
    {
      id: 3,
      name: "GLAMOUR-DN3005_PM__7212",
      image: "/images/products/GLAMOUR/GLAMOUR-DN3005_PM__7212.jpg",
      price: 120.0,
      discontProc: 0,
    },
    {
      id: 4,
      name: "GLAMOUR-DN3006_PM__7272",
      image: "/images/products/GLAMOUR/GLAMOUR-DN3006_PM__7272.jpg",
      price: 20.0,
      discontProc: 0,
    },
    {
      id: 5,
      name: "GLAMOUR-DN3007_PM__7161",
      image: "/images/products/GLAMOUR/GLAMOUR-DN3007_PM__7161.jpg",
      price: 20.0,
      discontProc: 30,
    },
    {
      id: 6,
      name: "GLAMOUR-DN3008_PM__7113",
      image: "/images/products/GLAMOUR/GLAMOUR-DN3008_PM__7113.jpg",
      price: 20.0,
      discontProc: 0,
    },
    {
      id: 7,
      name: "GLAMOUR-DN3009_PM__7080",
      image: "/images/products/GLAMOUR/GLAMOUR-DN3009_PM__7080.jpg",
      price: 20.0,
      discontProc: 0,
    },
  ]

  return (
    <section className="products-section">
      <div className="products-header-row">
        <div className="products-header-column">
          <span className="products-header-column__subheading">
            Рекомендовані товари
            {/* Featured Products */}
          </span>
          <h2 className="mb-4">
            Наші продукти
            {/* Our Products */}
          </h2>
          <p>GLAMOUR</p>
        </div>
      </div>
      <div className="products-gallery">
        {/* {products.map((products, idx) => { */}
        {products.map((products) => {
          return (
            <div className="products-container" key={products.id}>
              {products.discontProc > 0 ? (
                <div className="products-container__discount-proc">{products.discontProc}%</div>
              ) : (
                ""
              )}
              <img className="products__img" src={products.image} alt="img" />
              {/* Розмита(blur) загорузка картинки */}
              {/* <Image className="products__img" src={rImage} width={400} height={350} alt="img" placeholder="blur" /> */}
              <h3>
                <div>{products.name}</div>
              </h3>
              <div>
                <div className="products-container_icons-container">
                  <div className="products-container_icon">
                    <IconMenu
                      width="15"
                      height="15"
                      colorFill="#fff"
                      colorFill1="#fff"
                      colorFill2="#fff"
                      colorStroke="#fff"
                      colorStroke1="#fff"
                      colorStroke2="#fff"
                    />
                  </div>
                  <div className="products-container_icon">
                    <IconCart_с8
                      width="15"
                      height="15"
                      colorFill="#fff"
                      colorFill1="#fff"
                      colorFill2="#fff"
                      colorFill3="#fff"
                      colorStroke="#fff"
                      colorStroke1="#fff"
                      colorStroke2="#fff"
                      colorStroke3="#fff"
                      colorStroke4="#fff"
                    />
                  </div>
                  <div className="products-container_icon">
                    <IconHeart_с2 width="15" height="15" colorFill="#fff" colorStroke="#fff" />
                  </div>
                </div>
              </div>
              <div className="products-container__price-container">
                {products.discontProc > 0 ? (
                  <p className="products-container__discount">
                    {/* ToFixed () форматує число, використовуючи запис з фіксованою комою. */}
                    {(products.price - (products.price * products.discontProc) / 100).toFixed(2)}
                  </p>
                ) : (
                  ""
                )}
                <p className="products-container__price">₴{products.price.toFixed(2)}</p>
              </div>
            </div>
          )
        })}
      </div>
      <style jsx>{`
        .products-section {
          padding: 6rem 2vw; //rem-шрифт кореневого
          position: relative;
          //border: 2px solid #82ae46;
        }
        .products-header-row {
          margin-bottom: 3rem; //mb-5
          padding: 0 5vw 1rem; //Відступи всередині контейнера row
          display: flex; //row
          flex-wrap: wrap; //row
          justify-content: center; //justify-content-center
          align-productss: center;
          //border: 1px solid rgba(63, 93, 35, 1);
        }

        .products-header-column {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-productss: center;
          text-align: center;
          //border: 1px solid #82ae46;
        }

        .products-header-column__subheading {
          font-size: 18px;
          display: block;
          margin-bottom: 10px;
          font-family: ${theme.fontFamily.serif};
          font-style: italic;
          color: #82ae46;
          font-weight: 500;
        }

        .products-header-column h2 {
          margin-bottom: 1.5rem;
          position: relative;
          font-size: 28px;
          font-weight: 600;
          color: #000000;
        }
        .products-header-column p {
          margin-top: 0;
          margin-bottom: 1rem;
          color: gray;
        }

        @media (min-width: 768px) {
          //h2
          .products-header-row {
            padding: 0 15vw 1rem; //Відступи всередині контейнера row
          }
          .products-header-column h2 {
            font-size: 40px;
          }
        }
        //
        .products-gallery {
          display: flex;
          flex: 0 1 auto;
          flex-wrap: wrap;
          //justify-content: stretch; //'авто-розмір'
          justify-content: space-between;
          //margin: 0 auto;
        }
        .products-container {
          position: relative;
          box-sizing: border-box; //Width і height включають в себе значення полів і кордонів
          //width: 375px;
          width: calc(100%-2vw);
          //height: 420px;
          border: 1px solid #c21d252d;
          //
          display: flex;
          flex: 0 1 auto;
          flex-direction: column; //в стовбець;
          justify-content: flex-start; //Тут по Y
          align-productss: center; //по X
          text-align: center;
          flex: 1 1 auto;
          margin: 0 0 30px;
          overflow: hidden; //Не показує все за межами блоку
        }
        .products-container:hover .products-container_icons-container {
          //cursor: pointer; //рука
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }
        .products-container:hover .products-container__price-container {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }
        .products-container:hover .products__img {
          //filter: blur(2px);//розмите зображення
          transform: scale(1.1);
          transition: scale 3s ease-out;
        }

        .products-container__discount-proc {
          position: absolute;
          left: 0;
          //bottom: 0;
          top: 0;
          font-size: 15px;
          //font-weight: bold;
          color: #fff;
          background-color: #82ae46;
          /* //text-transform: uppercase;//великі літери */
          text-decoration: none;
          //   z-index: 1;
        }
        .products-container_icons-container {
          position: absolute;
          bottom: 1rem;
          left: 0; //Привязка для absolute;/ Для вирівнювання по центру X
          width: 100%; //Для вирівнювання по центру X
          display: flex;
          flex-direction: row;
          justify-content: center; //X
          align-items: center; //Y
          opacity: 0;
        }

        .products-container_icon {
          display: flex;
          justify-content: center; //X
          align-items: center; //Y
          width: 40px; //
          height: 40px;
          border-radius: 50%;
          border: 1px solid #fff; /* Параметры границы */
          background: #82ae46;
        }
        .products__img {
          padding: 2vw 0;
          width: 100%;
          //height: 270px;//Висота вирахлвуються при маштабуванні картинки(для cover треба 2-а розміри)
          //object-fit: contain; //вся картинка з попорціями/контейнер не заповнений
          //object-fit: cover; //вся картинка з попорціями/контейнер не заповнений
        }

        .products-container h3 {
          margin: 0 0 15px;
        }
        .products-container a {
          font-size: 14px;
          text-transform: uppercase; //великі літери
          font-weight: normal;
        }
        .products-container__price-container {
          margin: 0 1rem 1rem;
          display: flex;
          flex-direction: row;
          text-align: center;
          justify-content: center; //Тут по Y //R-щоб рівняло по верху
          align-productss: center; //Y але тут по X
        }
        .products-container__discount {
          margin: 0 10px;
          text-decoration: line-through;
          font-size: 15px;
          color: #83ae46e8;
        }
        .products-container__price {
          color: #82ae46;
          font-size: 15px;
          font-weight: bold;
        }

        @media (min-width: 600px) {
          .products-section {
            padding: 40px 5vw;
          }
          .products-container {
            margin: 10px;
            width: calc((100% - 40px - 10vw) / 2); //Щирина при 2-х колонках
            //width: calc((100% - 240px- 20vw) / 2); //Щирина при 2-х колонках
            //width: 700px; //Щирина при 2-х колонках
          }
        }
        @media (min-width: 960px) {
          .products-container {
            //height: 300px;
            width: calc((100% - 80px - 10vw) / 4); //Щирина при 2-х колонках
          }
        }
        //Mobi
      `}</style>
    </section>
  )
}

export default Products
