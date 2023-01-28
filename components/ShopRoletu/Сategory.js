//Сategory.js
//Добавлено animat
import  { useContext } from "react";
import { ComponentContext } from "../../context/ComponentContext";

const Сategory = () => {
  const { state } = useContext(ComponentContext);
  const theme = state.theme;
  return (
    // {/* Щоб зробити грід  */}
    <section className="category-section">
      {/*Грід з привязкою grid-area:fruits/картинка і позиціонувння кнопки */}
      {/* Картинка може бути як background: url, так і <img> */}
      <div className="category__fruits-container">
        <a href="#" className="category-bottom-text">
          ORGANZA
        </a>
      </div>
      {/* juices */}
      <div className="category__juices-container">
        <a href="#" className="category-bottom-text">
          GLAMOUR
        </a>
      </div>
      {/*  */}
      <div className="category__vegetables-container">
        <a href="#" className="category-bottom-text">
          PASSION
        </a>
      </div>
      {/*  */}
      <div className="category__drued-container">
        <a href="#" className="category-bottom-text">
          SECRET IMPRESS
        </a>
      </div>
      <div className="category__tittle-container">
        <h2>Колекція</h2>
        <p>Ми пропонуємо широкий вибір продукції та її багату палітру</p>
        <p>
          <a href="#" className="category__tittle-button">
            Здійснити покупку
            {/* Shop now */}
          </a>
        </p>
      </div>
      <style jsx>{`
        .category-section {
          padding: 5rem 2vw;
          display: grid;
          grid-template-areas: "tittle" "fruits" "juices" "vegetables" "drued";
          grid-gap: 2vw;
          grid-template-rows: 300px repeat(4, 250px);
        }
        @media (min-width: 600px) {
          .category-section {
            display: grid;
            grid-template-areas: "fruits tittle juices" "vegetables tittle drued";
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 250px);
          }
        }

        .category__fruits-container {
          grid-area: fruits;
          /* Щоб кнопку позиціонувати absolute */
          position: relative;
          background: url("/images/products/ORGANZA/_ORGANZA-DN1012.jpg") 100% 100% no-repeat;
          background-size: cover;
          background-position-x: 50%;
        }

        .category__juices-container {
          grid-area: juices;
          position: relative;
          background: url("/images/products/GLAMOUR/_GLAMOUR-DN3003_PM__7524.jpg") 100% 100% no-repeat;
          background-size: cover;
          background-position-x: 50%;
        }

        .category__vegetables-container {
          grid-area: vegetables;
          position: relative;
          background: url("/images/products/PASSION/_PASSION-DN902_IMG_5922.jpg") 100% 100% no-repeat;
          background-size: cover;
          background-position-x: 50%;
        }

        .category__drued-container {
          grid-area: drued;
          position: relative;
          background: url("/images/products/SECRET IMPRESS/_SECRET IMPRESS-DN 12.jpg") 100% 100% no-repeat;
          background-size: cover;
          background-position-x: 50%;
        }

        .category__tittle-container {
          grid-area: tittle;
          //   background: url("/vegefoods/images/category.jpg") 100% 100% no-repeat;
          background: url("/images/home/rol8.jpg") 100% 100% no-repeat;
          background-position-x: 50%;
          background-size: cover;
          display: flex;
          flex-direction: column;
          /* justify-content: center; */
          text-align: center;
          text-decoration: none;
        }

        .category__tittle-container h2 {
          font-size: 24px;
          font-family: ${theme.fontFamily.serif};
          color: #8db557;
          margin: 0 0 8px;
        }

        .category__tittle-container p {
          font-size: 15px;
          font-family: ${theme.fontFamily.sansSerif};
          color: #8b8b8b;
          margin: 0 0 8px;
        }

        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-bottom-text {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          background-color: #82ae46;
          text-decoration: none;
        }

        .category__tittle-button {
          display: fllex-line;
          position: relative;
          padding: 6px 12px;
          background: #82ae46;
          height: "40зч";
          color: #fff;
          border: 2px solid #82ae46;
          border-radius: 20px;
          font-family: ${theme.fontFamily.sansSerif};
          font-size: 16px;
          text-decoration: none;
        }

        .category__tittle-button:hover {
          background-color: rgba(132, 177, 71, 0);
          border: 1px solid #82ae46;
          color: #82ae46;
        }
      `}</style>
    </section>
  )
};
export default Сategory;
