//users_form.js / без схеми/ schema = yup
import { useEffect, useState, useContext } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form" //Vers 7.0.X:<input {...register('test', { required: true })} />
import IconCancel from "../../../ui/svg/head/IconCancel"
import IconRefresh from "../../../ui/svg/table/IconRefresh"
import DCategory from "../../../../pages/shop/references/d_category"
// import DBrand from "../../../../pages/shop/references/d_brand"
import DBrand from "../../../../pages/shop/references/d_brand"
import DOv from "../../../../pages/shop/references/d_ov"
import { ComponentContext } from "../../../../context/ComponentContext"

export default function ProductForm({ onCloseForm, toFormData }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state

  const [dovActive, setDovActive] = useState("") //Назва довідника, який буде викликатись в формі

  const defaultData = {
    name: "",
    category_id: "1",
    category: "Всі товари ",
    brand_id: "1",
    brand: "Не визначено",
    ov_id: "1",
    ov: "шт",
    img: "",
    skod: "",
    uktzed: "",
    price: 0,
    pdv: 0,
    akcuz: 0,
  }

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm({
    defaultValues: toFormData ? toFormData : defaultData,
  })
  //   console.log("ProductForm/register,=", register("category").onChange)

  const onSubmit = (data) => {
    // console.log("***********UsersForm/onSubmit/data=", data)
    // alert(JSON.stringify(data))
    onCloseForm(data) //з закриттям форми передаємо дані у батьківський компонент
  }
  const onCancel = () => {
    onCloseForm(null) //Передаємо дані у батьківський компонент
  }

  const onCategory = () => {
    // console.log("ProductForm.js/on.Category/setValue=", setValue)
    setDovActive("category") //Відкрити форму
    // console.log("ProductForm.js/onCategory/selectID=", ((selectId = " selectName="), selectName))
  }
  const onBrand = () => {
    setDovActive("brand") //Відкрити форму
    // console.log("ProductForm.js/onBrand/selectID=", ((selectId = " selectName="), selectName))
  }
  const onOv = () => {
    setDovActive("ov") //Відкрити форму
    // console.log("ProductForm.js/onOv/selectID=", ((selectId = " selectName="), selectName))
  }

  useEffect(() => {
    setTimeout(() => {
      setFocus("name", { shouldSelect: true })
    }, 300)
  }, [setFocus])

  return (
    <div className="modal-overley">
      <form className="dataForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-nav">
          <button className="head-nav-button" type="button" onClick={() => reset()} title="Оновити ввід">
            <IconRefresh width={theme.size.formIcon} height={theme.size.formIcon} colorFill={theme.colors.formIcon} />
          </button>
          <input className="inputSubmit" type="submit" />
          <button className="head-nav-button" type="button" onClick={onCancel} title="Вийти без збереження">
            <IconCancel width={theme.size.formIcon} height={theme.size.formIcon} colorFill={theme.colors.formIcon} />
          </button>
        </div>
        {/*---- */}
        <div className="formBody">
          <div className="inputBody" style={{ width: 450, margin: "0 1px" }}>
            <label className="label">Назва товару</label>
            <input className="input" {...register("name", { maxLength: 60 })} required />
            <div className="errorMsg">{errors.name?.type === "maxLength" && "Задовге значення >60симв."}</div>
          </div>

          <div className="inputBody" style={{ width: 130, margin: "0 1px" }}>
            <div className="inputImgContainer">
              <Image width={15} height={15} src="/icons/png/Book24_24.png" alt="book" />
              <label className="label">Категорія</label>
            </div>
            <input onClick={onCategory} className="input" {...register("category")} />
          </div>
          <div className="inputBody" style={{ width: 150, margin: "0 1px" }}>
            <div className="inputImgContainer">
              <Image width={15} height={15} src="/icons/png/Book24_24.png" alt="book" />
              <label className="label">Бренд</label>
            </div>
            <input onClick={onBrand} className="input" {...register("brand")} />
          </div>
          <div className="inputBody" style={{ width: 80, margin: "0 1px" }}>
            <div className="inputImgContainer">
              <Image width={15} height={15} src="/icons/png/Book24_24.png" alt="book" />
              <label className="label">Од.виміру</label>
            </div>
            <input onClick={onOv} className="input" {...register("ov")} />
          </div>
          <div className="inputBody" style={{ width: 150, margin: "0 1px" }}>
            <label className="label">ЗображенняURL</label>
            <input className="input" {...register("img", { maxLength: 100 })} />
            <div className="errorMsg">{errors.img?.type === "maxLength" && "Задовге значення >100симв."}</div>
          </div>
          <div className="inputBody" style={{ width: 120, margin: "0 1px" }}>
            <label className="label">ШтрихКод</label>
            <input className="input" {...register("skod", { Length: 14 })} />
            <div className="errorMsg"> {errors.skod?.type === "Length" && "Має = 14 симв."}</div>
          </div>
          <div className="inputBody" style={{ width: 85, margin: "0 1px" }}>
            <label className="label">УКТЗЕД</label>
            <input className="input" {...register("uktzed", { Length: 10 })} />
            <div className="errorMsg"> {errors.uktzed?.type === "Length" && "Має = 10 симв."}</div>
          </div>
          {/* <div className="inputBody" style={{ width: 95, margin: "0 1px" }}>
            <label className="label">Ціна(грн)</label>
            <input className="input" type="number" {...register("price", { min: 0, max: 1000000 })} />
            <div className="errorMsg">
              {errors.price?.type === "min" && "від 0 до 1000000"}
              {errors.price?.type === "max" && "від 0 до 1000000"}
            </div>
          </div> */}
          <div className="inputBody" style={{ width: "90px", margin: "0 1px" }}>
            <div className="inputImgContainer">
              <label className="label">Ціна(грн)</label>
            </div>
            <input
              className="input"
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
          </div>
          {/* <div className="inputBody" style={{ width: 70, margin: "0 1px" }}>
            <label className="label">ПДВ(%)</label>
            <input className="input" type="number" {...register("pdv", { min: 0, max: 100 })} />
            <div className="errorMsg">
              {errors.pdv?.type === "min" && "від 0 до 100"}
              {errors.pdv?.type === "max" && "від 0 до 100"}
            </div>
          </div> */}
          <div className="inputBody" style={{ width: "60px", margin: "0 1px" }}>
            <label className="label">ПДВ(%)</label>
            <input
              className="input"
              type="text"
              {...register("pdv", {
                pattern: {
                  value: /^\d*\.?\d{0,2}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                },
                max: 100,
              })}
            />
            <div className="errorMsg">
              {errors.pdv?.type === "pattern" && "Не: .XX"}
              {errors.pdv?.type === "max" && "до 100"}
            </div>
          </div>
          {/* <div className="inputBody" style={{ width: 70, margin: "0 1px" }}>
            <label className="label">Акциз(%)</label>
            <input className="input" type="number" {...register("akcuz", { min: 0, max: 100 })} />
            <div className="errorMsg">
              {errors.akcuz?.type === "min" && "від 0 до 100"}
              {errors.akcuz?.type === "max" && "від 0 до 100"}
            </div>
          </div> */}
          <div className="inputBody" style={{ width: "60px", margin: "0 1px" }}>
            <label className="label">Акциз(%)</label>
            <input
              className="input"
              type="text"
              {...register("akcuz", {
                pattern: {
                  value: /^\d*\.?\d{0,2}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                },
                max: 100,
              })}
            />
            <div className="errorMsg">
              {errors.akcuz?.type === "pattern" && "Не: .XX"}
              {errors.akcuz?.type === "max" && "до 100"}
            </div>
          </div>
        </div>
      </form>
      {dovActive == "category" && (
        <DCategory
          isDovidnuk={true}
          setDovActive={setDovActive} //Активація довідника
          setValue={setValue}
        />
      )}
      {dovActive == "brand" && (
        <DBrand
          isDovidnuk={true}
          setDovActive={setDovActive} //Активація довідника
          setValue={setValue}
        />
      )}
      {dovActive == "ov" && (
        <DOv
          isDovidnuk={true}
          setDovActive={setDovActive} //Активація довідника
          setValue={setValue}
        />
      )}
      {/* --- */}
      <style jsx>{`
        // накладання слоїв-затемнення екрану
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

        //-- з *Form.module.css //
        .dataForm {
          max-width: 100%;
          max-height: 80%;
          position: absolute;
          bottom: 10px;
          padding: 0.12rem;
          border: 2px solid ${theme.colors.formBorder};
          background-color: ${theme.colors.formBackground};
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
