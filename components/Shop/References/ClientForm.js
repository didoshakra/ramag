//users_form.js / без схеми/ schema = yup
import { useContext } from "react"
import { useForm } from "react-hook-form" //Vers 7.0.X:<input {...register('test', { required: true })} />
import IconCancel from "../../ui/svg/head/IconCancel"
import IconRefresh from "../../ui/svg/table/IconRefresh"
import { ComponentContext } from "../../../context/ComponentContext"

export default function ClientForm({ onCloseForm, toFormData }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state

  const defaultData = {
    name: "",
    last_name: "",
    email: "",
    // total: 0,
    skod: "",
    discount_proc: "0",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: toFormData ? toFormData : defaultData,
    // defaultValues: toFormData,
  })

  const onSubmit = (data) => {
    // console.log("UsersForm/onSubmit/data=", data)
    // alert(JSON.stringify(data))
    onCloseForm(data) //з закриттям форми передаємо дані у батьківський компонент
  }
  const onCancel = () => {
    onCloseForm(null) //Передаємо дані у батьківський компонент
  }
  return (
    <div className="modal-overley">
      {/* <div className="form-container"> */}
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
          <div className="inputBody" style={{ weight: "50px", margin: "0 1px" }}>
            <label className="label">Імя</label>
            <input className="input" {...register("name", { maxLength: 30 })} required />
            <div className="errorMsg">{errors.name?.type === "maxLength" && "Ім'я >30симв."}</div>
          </div>
          <div className="inputBody" style={{ weight: "50px", margin: "0 1px" }}>
            <label className="label">Прізвище</label>
            <input className="input" {...register("last_name", { maxLength: 30 })} required />
            <div className="errorMsg">{errors.last_name?.type === "maxLength" && "Прізвище >30симв."}</div>
          </div>
          {/*  */}
          <div className="inputBody" style={{ weight: "50px", margin: "0 1px" }}>
            {" "}
            <label className="label">email</label>
            <input
              className="input"
              type="email"
              {...register("email", {
                maxLength: 30,
                // pattern: {
                //   value: /^(.+)@(.+)\.(.+)$/,
                //   //   value: /\S+@\S+\.\S+/,
                // },
              })}
            />
            {/* <div className="errorMsg">
              {errors.email?.type === "pattern" && "Не формат email"}
              {errors.email?.type === "maxLength" && " email > 30симв."}
            </div> */}
          </div>
          {/*  */}
          <div className="inputBody" style={{ width: 120, margin: "0 1px" }}>
            <label className="label">ШтрихКод</label>
            <input className="input" {...register("skod", { Length: 14 })} />
            <div className="errorMsg"> {errors.skod?.type === "Length" && "Має = 14 симв."}</div>
          </div>
          {/*  */}
          <div className="inputBody" style={{ width: "60px", margin: "0 1px" }}>
            <label className="label">Знижка(%)</label>
            <input
              className="input"
              type="text"
              {...register("discount_proc", {
                pattern: {
                  value: /^\d*\.?\d{0,2}$/g, //(.) 2-а знаки після коми\ Не виводить повідомлення
                },
                max: 100,
              })}
            />
            <div className="errorMsg">
              {errors.discount_proc?.type === "pattern" && "Не: .XX"}
              {errors.discount_proc?.type === "max" && "до 100"}
            </div>
          </div>
        </div>
      </form>
      {/*  */}

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
      `}</style>
    </div>
  )
}
