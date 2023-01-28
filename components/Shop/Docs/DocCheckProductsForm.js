//DocCheckProductsForm.js / без схеми/ schema = yup
import { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form" //Vers 7.0.X:<input {...register('test', { required: true })} />
import IconCancel from "../../ui/svg/head/IconCancel"
import IconRefresh from "../../ui/svg/table/IconRefresh"
import DProduct from "../../../pages/shop/references/d_product"
import { dbHost } from "../../../config/dbHost"

import { ComponentContext } from "../../../context/ComponentContext"

export default function DocCheckProductsForm({ onCloseForm, formData }) {
  const urlAPI = "/api/shop/references/d_product/" // Для useSWR/getServerSideProp i...
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [dovActive, setDovActive] = useState("") //Значення з довідника категорій
  const [useAdmin, setUseAdmin] = useState(true) //Для адміністратора
  const defaultData = {
    skod: "",
    check_id: "0",
    product_id: "1",
    name: "",
    quantity: "",
    ov_id: "1",
    ov: "",
    price: "",
    discount: "",
  }

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setFocus,
  } = useForm({
    defaultValues: formData ? formData : defaultData,
  })
  //   console.log("DocCheckProductsForm/register,=", register("category").onChange)

  const onSubmit = (data) => {
    // console.log("***********UsersForm/onSubmit/data=", data)
    // alert(JSON.stringify(data))
    onCloseForm(data) //з закриттям форми передаємо дані у батьківський компонент
  }
  const onCancel = () => {
    onCloseForm(null) //Передаємо дані у батьківський компонент
  }

  //При вводі Enter в полі SKod для сканера
  const onKeyDown = (e) => {
    // https://react-hook-form.com/api/useform/getvalues
    // const values = getValues() // { test: "test-input", test1: "test1-input" }//Всі змінні
    // const singleValue = getValues("skod") // Одна змінна
    // const multipleValues = getValues(["skod", "product_id"])
    // console.log("DocCheckProductsForm.js/onKeyDown/values.skod=", values.skod)
    // console.log("DocCheckProductsForm.js/onKeyDown/singleValue=", singleValue)
    // console.log("DocCheckProductsForm.js/onKeyDown/multipleValues['skod']", multipleValues["skod"])
    // onProduct()
    if (e.key === "Enter") {
      //   console.log("DocCheckProductsForm.js/onKeyDown/e=", e)
      e.preventDefault() //Повертаємся назад в поле
      const singleValue = getValues("skod") // Одна змінна
      selParam(singleValue) //Запит по Ш-коду
    }
  }
  //Вихід (При натисканні клавіші в останньому полі)
  const onOutput = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)()
      //   e.preventDefault() //Повертаємся назад в поле
      //   alert("Вихід")
    }
  }

  //При Click на полі  товар,або перехід з поля s
  const onProduct = () => {
    // console.log("DocCheckProductsForm.js/onProduct/dovParame.skod=", dovParam.skod)
    setDovActive("product") //Відкрити форму
    // setFocus("quantity", { shouldSelect: true })
  }

  //--- Вибір з БД/d_product по полю SKod
  const selParam = async (values) => {
    console.log("DocCheckProductsForm.js/selParam/values=", values.skod)
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
      //   console.log("DocCheckProductsForm.js/selParam/resRow=", resRow)
      //   console.log("DocCheckProductsForm.js/selParam/resRow[0]=", resRow[0])
      if (resRow.length > 0) {
        // setValue("skod", resRow[0].skod)
        setValue("product_id", resRow[0].id)
        setValue("name", resRow[0].name)
        setValue("ov_id", resRow[0].ov_id)
        setValue("ov", resRow[0].ov)
        setValue("price", resRow[0].price)
        setValue("quantity", "")
        setFocus("quantity", { shouldSelect: true })
      } else {
        setValue("product_id", "")
        setValue("name", "*** ТОВАР НЕ ЗНАЙДЕНО ***")
        setValue("ov_id", "")
        setValue("ov", "")
        setValue("price", "")
        setValue("quantity", "")
        onProduct()
      }
      //   onProduct()
    } else {
      const err = await response.json() //повертає тіло відповіді json
      alert(`Дані не знайдено! ${err.message} / ${err.stack}`)
      //   console.log(`Product.js/rowAdd/try/else/\ Помилка при добавленні запису\ ${err.message} / ${err.stack} `)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setFocus("skod", { shouldSelect: true })
    }, 300)
  }, [])

  return (
    <div className="modal-overley">
      <form className="dataForm" onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => onKeyDown(e)}>
        <div className="form-nav">
          <button className="head-nav-button" type="button" onClick={() => reset()} title="Оновити ввід">
            <IconRefresh width="12" height="12" colorFill={theme.colors.formIcon} />
          </button>
          <input className="inputSubmit" type="submit" onKeyDown={(e) => onKeyDown(e)} />
          <button className="head-nav-button" type="button" onClick={onCancel} title="Вийти без збереження">
            <IconCancel width="12" height="12" colorFill={theme.colors.formIcon} />
          </button>
        </div>
        {/*---- */}
        <div className="formBody">
          <div className="inputBody" style={{ width: 115, margin: "0 1px" }}>
            <label className="label">Штрихкод</label>
            <input className="input" {...register("skod", { maxLength: 14 })} required />
            <div className="errorMsg">{errors.skod?.type === "maxLength" && ">14симв."}</div>
          </div>
          {/*  */}
          <div className="inputBody" style={{ width: "90px", margin: "0 1px" }}>
            <div className="inputImgContainer">
              <label className="label">Ціна(грн)</label>
            </div>
            {/* Дозволити зміну ціни з правами адміністратора */}
            {!useAdmin ? (
              <input className="input" {...register("price", { disabled: true })} />
            ) : (
              <>
                <input
                  className="input"
                //   readonly
                  type="text"
                  {...register("price", {
                    pattern: {
                      value: /^\d*\.?\d{0,2}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                    },
                    max: 99999999.99,
                  })}
                />
                <div className="errorMsg">
                  {errors.price?.type === "pattern" && "Не: .XX"}
                  {errors.price?.type === "max" && "до 99999999.99"}
                </div>
              </>
            )}
          </div>
          {/*  */}
          <div className="inputBody" style={{ width: "100px", margin: "0 1px" }}>
            <div className="inputImgContainer">
              <label className="label">К-кість</label>
            </div>
            <input
              onKeyDown={(e) => onOutput(e)}
              className="input"
              //   type="text"
              type="number"
              step="1"
              min="0"
              max="99999999.99"
              {...register("quantity", {
                pattern: {
                  value: /^\d*\.?\d{0,3}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                },
                max: 99999999.99,
              })}
            />
            <div className="errorMsg">
              {errors.quantity?.type === "pattern" && "Не: .XX"}
              {errors.quantity?.type === "max" && "до 99999999.99"}
            </div>
          </div>
          {/*  */}
          {/* <div className="inputBody" style={{ width: 110, margin: "0 1px" }}>
            <label className="label">Код</label>
            <input className="input" type="number" {...register("kod")} required />
          </div> */}

          {/*  */}
          <div className="inputBody" style={{ width: 50, margin: "0 1px" }}>
            <label className="label">Од.вим</label>
            {/* //відключено ввід */}
            {/* //Не передає значення */}
            {/* <input className="input" {...register("ov", { disabled: true })} /> */}
            <input className="input" {...register("ov")} />
          </div>
          {/*  */}
          <div className="inputBody" style={{ width: 380, margin: "0 1px" }}>
            <div className="inputImgContainer">
              <img style={{ width: 15, height: 15 }} src="/icons/png/Book24_24.png" />
              <label className="label">Назва товару</label>
            </div>
            <input className="input" onClick={onProduct} {...register("name")} />
          </div>
          {/*  */}
          {/* className="inputBody" <div style={{ weight: "50px", margin: "0 1px" }}>
            <div className="inputImgContainer">
              <label className="label">Знижка(Грн)</label>
            </div>
            <input
              className="input"
              type="text"
              {...register("discount", {
                pattern: {
                  value: /^\d*\.?\d{0,2}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                },
                max: 100000000,
              })}
            />
            <div cclassName="errorMsg">
              {errors.discount?.type === "pattern" && "Не формат: 99999999.99"}
              {errors.discount?.type === "max" && "від 0 до 99999999.99"}
            </div>
          </div> */}
          {/*  */}
        </div>
      </form>

      {dovActive == "product" && (
        <DProduct
          isDovidnuk={true}
          setDovActive={setDovActive} //Активація довідника
          setValue={setValue}
          setFocus={setFocus}
        />
      )}
      {/* --- */}
      <style jsx>{`
        //накладання слоїв-затемнення екрану
        .modal-overley {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: ${theme.colors.backgroundEclipse}; //Затемнення екрану
        }
        // Кнопки навігації
        .form-nav {
          display: flex;
          justify-content: space-between;
          padding: 0.2rem;
        }
        .head-nav-button {
          display: flex;
          align-items: center;
          width: ${theme.size.formIconBorder};
          height: ${theme.size.formIconBorder};
          border-radius: ${theme.size.formIconBorder};
          border: 2px solid ${theme.colors.formButtonBorder};
          background-color: ${theme.colors.formBackground};
        }
        .head-nav-button:hover {
          cursor: pointer;
          background-color: ${theme.colors.formIconBackgroundHover};
        }

        .dataForm {
          max-width: 100%;
          max-height: 80%;
          position: absolute;
          bottom: 10px;
          padding: 0.12rem;
          border: 2px solid ${theme.colors.formBorder};
          background-color: ${theme.colors.formBackground};
          z-index: 2;
        }

        .formBody {
          display: flex;
          flex-wrap: wrap;
          padding: 0.12rem;
          margin: 5px;
          border: 2px solid ${theme.colors.formBorder};
        }
        .inputSubmit {
          font-weight: bold;
          border: 2px solid ${theme.colors.formButtonBorder};
          color: ${theme.colors.formSubmit};
          background-color: ${theme.colors.formBackground};
        }
        .inputSubmit:hover {
          cursor: pointer;
          color: ${theme.colors.formSubmitHover};
        }
        .inputBody {
          display: flex;
          flex-direction: column;
          margin: 0 1px;
          padding: 0px;
        }
        .inputImgContainer {
          display: flex;
          align-items: center;
        }

        .input {
          //   width: 100%;
          border-radius: 4px;
          padding: 5px 5px;
          margin-bottom: 3px;
          font-size: 13px;
          color: ${theme.colors.formInputText};
          border: 2px solid ${theme.colors.formBorder};
          background-color: ${theme.colors.formInputBackground}; //Затемнення екрану
        }

        .label {
          font-weight: bold;
          font-size: 13px;
          color: ${theme.colors.formLabel};
        }
        .errorMsg {
          text-align: left;
          max-width: 350px;
          font-size: 12px;
          font-weight: 300;
          color: ${theme.colors.errorMsg};
        }
        .inputImgContainer {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
