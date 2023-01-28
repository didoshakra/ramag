//ClientDialog.js/input-not react-hook-form

import { useEffect, useState, useContext, useRef } from "react"
import { ComponentContext } from "../../../context/ComponentContext"
import { useForm } from "react-hook-form" //Vers 7.0.X:<input {...register('test', { required: true })} />
import IconCancel from "../../ui/svg/head/IconCancel"
import { dbHost } from "../../../config/dbHost"

export default function ClientDialog({ isClientDialog, setIsClientDialog, setClientData }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [valN, setValN] = useState("")
  const [value, setValue] = useState({
    // id,name,last_name,skod,discont_proc
    id: "0",
    name: "11",
    last_name: "22",
    skod: "",
    diccont_proc: "",
  })

  //   const [inputRef, setInputFocus] = useFocus() //https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

  //Визначення клієнта
  const onClientSkod = (e) => {
      alert("onClientSkod")
    setValue({ name: "wwwwwwwwwww" })
    setValN("wwwwwwwwwww")
    if (e.key === "Enter") {
      //   alert("onCesh/Enter")
      // console.log("ClientDialig.js/onClientSkod/e.target.value=", e.target.value)
      console.log("ClientDialig.js/onClientSkod/e.target=", e.target)
      e.preventDefault() //Повертаємся назад в поле
      const clientSkod = e.target.value //Значення останньогог поля
      selParam(clientSkod) //Запит по Ш-коду
    }
  }
  //--- Вибір з БД/d_product по полю SKod
  const selParam = async (values) => {
    console.log("ClientDialig.js/selParam/values=", values)
    const urlAPI = "/api/shop/references/d_client/" // Для useSWR/getServerSideProp i...
    const url = `${dbHost}${urlAPI}/select-params` //
    const options = {
      method: "POST",
      body: JSON.stringify(values), //Для запитів до серверів використовувати формат JSON
      headers: {
        "Content-Type": "application/json", //Вказує на тип контенту
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const resRow = await response.json() //повертає тіло відповіді json
        console.log("ClientDialig.js/selParam/resRow=", resRow)
      if (resRow.length > 0) {
        console.log("ClientDialig.js/selParam/resRow**[0]=", resRow[0].skod)
        setValue({id: resRow[0].id})
        setValue({name: resRow[0].name})
        setValue({last_name: resRow[0].last_name})
        setValue({skod: resRow[0].skod})
        setValue({discont_proc: resRow[0].discont_proc})
        // setFocus("quantity", { shouldSelect: true })
        document.querySelector("#enter")?.focus() //Передати фокус в Отримано від покупця
      } else {
        // setValue("id", "")
        // setValue("name", "* Клієнта НЕ ЗНАЙДЕНО *")
        // setValue("last_name", resRow[0].last_name)
        // setValue("skod", resRow[0].skod)
        // setValue("discont_proc", resRow[0].discont_proc)
      }
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Помилка запиту! ${err.message} / ${err.stack}`)
      //   console.log(`Product.js/rowAdd/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
    }
  }

  //Вихід з діалогу без оплати
  const onCancel = () => {
    //   alert("onCancel")
    setIsClientDialog(false)
  }

  //Кнопка Ввести(підтвердження вводу даних)
  const onButtonEnter = () => {
    //   alert("onCancel")
    setIsClientDialog(false)
  }

//   const onKeyDown = (e) => {
//     // https://react-hook-form.com/api/useform/getvalues
//     if (e.key === "Enter") {
//       //   console.log("ClientDialig.js/onKeyDown/e=", e)
//       e.preventDefault() //Повертаємся назад в поле
//       const singleValue = getValues("skod") // Одна змінна
//       selParam(singleValue) //Запит по Ш-коду
//     }
//   }

  useEffect(() => {
    if (isClientDialog) {
      setTimeout(() => {
        document.querySelector("#client")?.focus() //Передати фокус в швидкий фільтер
      }, 300)
    }
  }, [isClientDialog])

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
              <IconCancel className="icon" width="15" height="15" colorFill={theme.colors.formIcon} />
            </button>
          </div>
          <input className="input" onKeyDown={(e) => onClientSkod(e)} id="client" type="text" />
          <div className="flexRow-sBetween" style={{ marginTop: "20px" }}>
            <label className="label1">Клієнт: </label>
            <p className="sum1">
              {/* {value.name} {value.last_name} */}
              {valN} {value.last_name}
            </p>
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
          top: calc((100vh - 380px) / 2);
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
          font-size: 5px;
          line-height: 130%; //Прижати текст вниз залеж
          // letter-spacing: 0.2rem; //Проміжок між символами
          color: ${theme.colors.dialogSum1};
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
          align-items: center;
          padding: 0.12rem;
          margin: 5px;
        }
        .button {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 30px;
          border-radius: 5px;
          border: 2px solid ${theme.colors.dialogButtonBorder};
          color: ${theme.colors.dialogSubmit};
          background-color: ${theme.colors.dialogBackground};
        }
        .button:hover {
          cursor: pointer;
          color: ${theme.colors.dialogSubmitHover};
        }
      `}</style>
    </div>
  )
}
