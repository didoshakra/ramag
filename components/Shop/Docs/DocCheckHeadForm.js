//DocCheckHeadForm.js / без схеми/ schema = yup
import { useState, useContext } from "react"
import { useForm } from "react-hook-form" //Vers 7.0.X:<input {...register('test', { required: true })} />
import IconCancel from "../../ui/svg/head/IconCancel"
import IconRefresh from "../../ui/svg/table/IconRefresh"
import DClient from "../../../pages/shop/references/d_client"
import { ComponentContext } from "../../../context/ComponentContext"

export default function DocCheckHeadForm({ onCloseForm, formData }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state
  const [dovActive, setDovActive] = useState("") //Значення з довідника категорій

  const defaultData = {
    departament_id: "1",
    place: "1",
    user_id: "1",
    client_id: "1",
    client: "Клієнт",
    total: "",
    discount: "",
  }

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData ? formData : defaultData,
  })
  //   console.log("DocCheckHeadForm/register,=", register("category").onChange)

  const onSubmit = (data) => {
    // console.log("***********UsersForm/onSubmit/data=", data)
    // alert(JSON.stringify(data))
    onCloseForm(data) //з закриттям форми передаємо дані у батьківський компонент
  }
  const onCancel = () => {
    onCloseForm(null) //Передаємо дані у батьківський компонент
  }

  const onClient = () => {
    // console.log("DocCheckHeadForm.js/on.Category/setValue=", setValue)
    setDovActive("client") //Відкрити форму
    // console.log("DocCheckHeadForm.js/onClient/selectID=", ((selectId = " selectName="), selectName))
  }

  return (
    <div className="modal-overley">
      <form className="dataForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-nav">
          <button className="head-nav-button" type="button" onClick={() => reset()} title="Оновити ввід">
            <IconRefresh width="12" height="12" colorFill={theme.colors.formIcon} />
          </button>
          <input className="inputSubmit" type="submit" />
          <button className="head-nav-button" type="button" onClick={onCancel} title="Вийти без збереження">
            <IconCancel width="12" height="12" colorFill={theme.colors.formIcon} />
          </button>
        </div>
        {/*---- */}
        <div className="formBody">
          <div className="inputBody" style={{ width: 150, margin: "0 1px" }}>
            <div className="inputImgContainer">
              <img style={{ width: 15, height: 15 }} src="/icons/png/Book24_24.png" />
              <label className="label">Клієнт</label>
            </div>
            <input onClick={onClient} className="input" {...register("client")} />
          </div>
          {/*  */}
          <div style={{ weight: "50px", margin: "0 1px" }}>
            <div className="inputImgContainer">
              <label className="label">Сума(грн)</label>
            </div>
            <input
              className="input"
              type="text"
              {...register("total", {
                pattern: {
                  value: /^\d*\.?\d{0,2}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                },
                max: 1000000000,
              })}
            />
            <div className="errorMsg">
              {errors.total?.type === "pattern" && "Не формат: 999999999.99"}
              {errors.total?.type === "max" && "від 0 до 999999999.99"}
            </div>
          </div>
          <div style={{ weight: "50px", margin: "0 1px" }}>
            <div className="inputImgContainer">
              <label className="label">Знижка(%)</label>
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
            <div className="errorMsg">
              {errors.total?.type === "pattern" && "Не формат: 999999999.99"}
              {errors.total?.type === "max" && "від 0 до 999999999.99"}
            </div>
          </div>
        </div>
      </form>

      {dovActive == "client" && (
        <DClient
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
          color: ${theme.colors.formSubmit};
          font-weight: bold;
          border: 2px solid ${theme.colors.formButtonBorder};
          background-color: ${theme.colors.formBackground};
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
