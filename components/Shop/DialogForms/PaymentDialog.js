//PaymentDialog.js //Діалог оплати
import { useEffect, useState, useContext, useRef } from "react"
import { ComponentContext } from "../../../context/ComponentContext"
import IconCancel from "../../ui/svg/head/IconCancel"

export default function PaymentDialog({ setIsPaymentDialog, dialogAction ,total}) {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [sumRest, setSumRest] = useState(0) //Решта

  //   const [inputRef, setInputFocus] = useFocus() //https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

  //Визначення решти
  const onCesh = (e) => {
    if (e.key === "Enter") {
      //   console.log("doc_check_products.js/onCesh//e.target.value=", e.target.value)
      const sumClient = e.target.value //Значення останньогог поля
      setSumRest(sumClient - total)
      e.preventDefault() //Повертаємся назад в поле
      document.querySelector("#enter")?.focus() //Передати фокус в Отримано від покупця
    }
  }

  //Вихід з діалогу  без виходу з документу
  const onCancel = () => {
    //   alert("onCancel")
    // dialogAction(0)
    setIsPaymentDialog(false)
  }

  //Вихід з діалогу і вихід з документу із збереженням даних
  const onButtonOplata = () => {
    //   alert("onButtonOplata")
    dialogAction(1)
    setIsPaymentDialog(false)
  }

  //   const inputRef1 = useRef()
  //   useEffect(() => {
  //       setTimeout(() => {
  //         inputRef1.current.select()
  //         // inputRef.current.focus()// or inputRef.current.focus(); in your case
  //       }, 300)
  //   }, [])

  //Фокус в Отримано від покупця
  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#cesh")?.focus() //Передати фокус в Отримано від покупця
    }, 300)
  }, [])

  return (
    <div className="modal-overley">
      <div className="dialog-section">
        {/* <form className="form-body" onSubmit={handleSubmit}> */}
        <form className="form-body">
          {/*  */}
          <div className="form-head">
            <label className="title">Отримано від покупця</label>
            <button
              className="form-head_button-icon"
              // style={{ width:"30px",height:"30px" }}
              type="button"
              onClick={onCancel}
              title="Вийти"
            >
              <IconCancel className="icon" width="15" height="15" colorFill={theme.colors.formIcon} />
            </button>
          </div>
          {/* <input className="input" onKeyDown={(e) => onCesh(e)} type="text" id="cesh" /> */}
          <input
            //   ref={inputRef}
            id="cesh"
            className="input"
            onKeyDown={(e) => onCesh(e)}
            type="number"
            // placeholder="1.00"
            placeholder={total}
            // value={total}
            step="0.01"
            min="0.00"
            max="10000000"
          />
          {/*  */}
          <div className="flexRow-sBetween" style={{ marginTop: "20px" }}>
            <label className="label1">До оплати(грн): </label>
            {/* <p className="sum1">{sumPayment} грн</p> */}
            <p className="sum1">{total}</p>
          </div>
          <hr width="100%" />
          <div className="flexRow-sBetween" style={{ marginTop: "10px" }}>
            <label className="label2">Решта: </label>
            <p className="sum2">{sumRest} грн</p>
          </div>
          {/* <input className="submit" type="submit" value="Оплатити" /> */}

          <button id="enter" className="button" onClick={onButtonOplata}>
            Оплатити
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
          top: calc((100vh - 450px) / 2);
          left: calc((100vw - 380px) / 2);
          // padding: 0.12rem;
          border-radius: 20px;
          border: 2px solid ${theme.colors.dialogBorder};
          background-color: ${theme.colors.dialogBackground};
          z-index: 2;
        }
        .form-body {
          width: 90%;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          // align-items: flex-start;
          align-items: center;
          margin: 0;
        }
        .form-head {
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
          font-size: 40px;
          color: ${theme.colors.dialogInputText};
          border: 2px solid ${theme.colors.dialogBorder};
          background-color: ${theme.colors.dialogInputBackground}; //Затемнення екрану
        }
        .label1 {
          font-weight: 300;
          font-size: 20px;
          color: ${theme.colors.dialogLabel1};
        }
        .label2 {
          font-weight: 300;
          font-size: 20px;
          color: ${theme.colors.dialogLabel2};
        }
        .sum1 {
          font-weight: 500;
          font-size: 45px;
          line-height: 130%; //Прижати текст вниз залеж
          // letter-spacing: 0.2rem; //Проміжок між символами
          color: ${theme.colors.dialogSum1};
        }
        .sum2 {
          font-weight: 500;
          font-size: 30px;
          color: ${theme.colors.dialogSum2};
        }
        .icon {
          align-items: center;
        }
        .form-head_button-icon {
          display: flex;
          align-items: center;
          width: ${theme.size.dialogIconBorder};
          height: ${theme.size.dialogIconBorder};
          border-radius: ${theme.size.dialogIconBorder};
          border: 2px solid ${theme.colors.dialogBackground};
          color: ${theme.colors.tableIcon};
          background-color: ${theme.colors.dialogBackground};
        }
        .form-head_button-icon:hover {
          cursor: pointer;
          background-color: ${theme.colors.dialogIconBackgroundHover};
        }

        .flexRow-sBetween {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.12rem;
          // margin: 5px;
        }
        .button {
          font-weight: 600;
          margin-bottom: 10px;
          //   margin: 20px 0;
          font-size: 40px;
          border-radius: 5px;
          border: 2px solid ${theme.colors.dialogButtonBorder};
          color: ${theme.colors.dialogButton};
          background-color: ${theme.colors.dialogButtonBackground};
        }
        .button:focus {
          cursor: pointer;
          color: ${theme.colors.dialogButtonHover};
          background-color: ${theme.colors.dialogButtonBackgroundHover};
        }
        .button:hover {
          cursor: pointer;
          color: ${theme.colors.dialogButtonHover};
          background-color: ${theme.colors.dialogButtonBackgroundHover};
        }
      `}</style>
    </div>
  )
}
