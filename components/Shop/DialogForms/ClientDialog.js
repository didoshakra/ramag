//ClientDialog.js/input*not react-hook-form

import { useEffect, useState, useContext, useRef } from "react"
import { ComponentContext } from "../../../context/ComponentContext"
import IconCancel from "../../ui/svg/head/IconCancel"

export default function ClientDialog({ setIsClientDialog, discountRecalc }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [rezSelect, setRezSelect] = useState({
    id: "0",
    name: "",
    last_name: "",
    skod: "",
    discount_proc: 0,
  })

  //   const [inputRef, setInputFocus] = useFocus() //https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

  //Визначення клієнта
  const onClientSkod = (e) => {
    if (e.key === "Enter") {
      // alert("onCesh/Enter")
      // console.log("ClientDialig.js/onClientSkod/e.target.value=", e.target.value)
      //   console.log("ClientDialig.js/onClientSkod/e.target=", e.target)
      e.preventDefault() //Повертаємся назад в поле
      const clientSkod = e.target.value //Значення останньогог поля
      selParam(clientSkod) //Запит по Ш-коду
    }
  }
  //--- Вибір з БД/d_product по полю SKod
  const selParam = async (param) => {
    // console.log("ClientDialig.js/selParam/param=", param)
    const urlAPI = "/api/shop/references/d_client/" // Для useSWR/getServerSideProp i...
    const url = `${urlAPI}/select-params` //
    const options = {
      method: "POST",
      body: JSON.stringify(param), //Для запитів до серверів використовувати формат JSON
      headers: {
        "Content-Type": "application/json", //Вказує на тип контенту
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const resRow = await response.json() //повертає тіло відповіді json
      //   console.log("Client/Dialig.js/selParam/resRow=", resRow)
      if (resRow.length > 0) {
        //--- Обновлення значення полів масиву об'єктів
        setRezSelect((state) => ({ ...state, id: resRow[0].id }))
        setRezSelect((state) => ({ ...state, name: resRow[0].name }))
        setRezSelect((state) => ({ ...state, last_name: resRow[0].last_name }))
        setRezSelect((state) => ({ ...state, skod: resRow[0].skod }))
        setRezSelect((state) => ({ ...state, discount_proc: resRow[0].discount_proc }))
      } else {
        // console.log("Client/Dialig.js/selParam/resRow=", resRow)
        setRezSelect((state) => ({ ...state, id: 0 }))
        setRezSelect((state) => ({ ...state, name: "* Клієнта не знайдено!" }))
        setRezSelect((state) => ({ ...state, last_name: "" }))
        setRezSelect((state) => ({ ...state, skod: "" }))
        setRezSelect((state) => ({ ...state, discount_proc: 0 }))
      }
      document.querySelector("#enter")?.focus() //Передати фокус в Отримано від покупця
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка запиту! ${err.message} / ${err.stack}`)
      //   console.log(`ClientDialog.js/rowAdd/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
    }
  }

  //Вихід з діалогу без оплати
  const onCancel = () => {
    //   alert("onCancel")
    setIsClientDialog(false)
  }

  //Кнопка Ввести(підтвердження вводу даних)
  const onButtonEnter = () => {
    // console.log("ClientDialog.js/onButtonEnter/rezSelect=", rezSelect)
    discountRecalc(rezSelect)
    setIsClientDialog(false)
  }

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#client")?.focus() //Передати фокус в швидкий фільтер
    }, 300)
  }, [])

  return (
    <div className="modal-overley">
      <div className="dialog-section">
        {/* <form className="formBody" onSubmit={handleSubmit}> */}
        <form className="formBody">
          {/*  */}
          <div className="form-nav">
            <label className="title">Карточка клієнта</label>
            <button
              className="head-nav-button"
              // style={{ width:"30px",height:"30px" }}
              type="button"
              onClick={onCancel}
              title="Вийти"
            >
              <IconCancel
                className="icon"
                width={theme.size.tableIcon}
                height={theme.size.tableIcon}
                colorFill={theme.colors.formIcon}
              />
            </button>
          </div>
          <input className="input" id="client" type="text" onKeyDown={(e) => onClientSkod(e)} />
          <div className="flexRow-sBetween" style={{ marginTop: "20px" }}>
            <label className="label1">Клієнт: </label>
            <p className="sum1">
              {rezSelect.name} {rezSelect.last_name}
            </p>
          </div>
          <div className="flexRow-sBetween" style={{ marginTop: "20px" }}>
            <label className="label2">Знижка(%): </label>
            <p className="sum2">{rezSelect.discount_proc}</p>
          </div>
          <button id="enter" className="button" onClick={onButtonEnter}>
            Ввести
          </button>
        </form>
        {/*  */}
      </div>
      <style jsx>{`
        .modal-overley {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: ${theme.colors.backgroundEclipse}; //Затемнення екрану
          z-index: 2;
        }
        .dialog-section {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 380px;
          top: calc((100vh - 400px) / 2);
          left: calc((100vw - 380px) / 2);
          // padding: 0.12rem;
          border-radius: 20px;
          border: 2px solid ${theme.colors.dialogBorder};
          background-color: ${theme.colors.dialogBackground};
          z-index: 2;
        }
        .formBody {
          width: 90%;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          // align-items: flex-start;
          align-items: center;
          margin: 0;
        }
        .form-nav {
          width: 100%;
          display: flex;
          justify-content: space-between; //по краях
          align-items: center;
          padding: 0.12rem;
          // margin: 5px;
        }
        .title {
          font-weight: 300;
          font-size: 25px;
          color: ${theme.colors.dialogTitle};
        }
        .input {
          width: 100%;
          border-radius: 5px;
          padding: 5px 5px;
          // margin-bottom: 3px;
          font-size: 20px;
          color: ${theme.colors.dialogInputText};
          border: 2px solid ${theme.colors.dialogBorder};
          background-color: ${theme.colors.dialogInputBackground}; //Затемнення екрану
        }
        .label1 {
          font-weight: 300;
          font-size: 20px;
          color: ${theme.colors.dialogLabel1};
        }
        .sum1 {
          font-weight: 500;
          font-size: 25px;
          line-height: 130%; //Прижати текст вниз залеж
          // letter-spacing: 0.2rem; //Проміжок між символами
          color: ${theme.colors.dialogSum1};
        }
        .label2 {
          font-weight: 300;
          font-size: 15px;
          color: ${theme.colors.dialogLabel2};
        }
        .sum2 {
          font-weight: 500;
          font-size: 25px;
          line-height: 130%; //Прижати текст вниз залеж
          // letter-spacing: 0.2rem; //Проміжок між символами
          color: ${theme.colors.dialogSum2};
        }
        .icon {
          align-items: center;
        }
        .head-nav-button {
          display: flex;
          align-items: center;
          width: ${theme.size.dialogIconBorder};
          height: ${theme.size.dialogIconBorder};
          border-radius: ${theme.size.dialogIconBorder};
          border: 2px solid ${theme.colors.dialogBackground};
          color: ${theme.colors.tableIcon};
          background-color: ${theme.colors.dialogBackground};
        }
        .head-nav-button:hover {
          cursor: pointer;
          background-color: ${theme.colors.dialogIconBackgroundHover};
        }

        .flexRow-sBetween {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          padding: 0.12rem;
          margin: 5px;
        }
        .button {
          font-weight: 600;
          margin: 20px 0;
          font-size: 30px;
          border-radius: 5px;
          border: 2px solid ${theme.colors.dialogButtonBorder};
          color: ${theme.colors.dialogSubmit};
          background-color: ${theme.colors.dialogBackground};
        }
        .button:focus {
          cursor: pointer;
          color: ${theme.colors.dialogButtonHover};
          background-color: ${theme.colors.dialogButtonBackgroundHover};
        }
        .button:hover {
          cursor: pointer;
          color: ${theme.colors.dialogButtonHover};
          background-color: ${theme.colors.dialogIconBackgroundHover};
        }
      `}</style>
    </div>
  )
}
