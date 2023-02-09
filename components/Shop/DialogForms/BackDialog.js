//ExitDialog.js/react-hook-form

import { useEffect, useState, useContext, useRef } from "react"
import { ComponentContext } from "../../../context/ComponentContext"

export default function ExitDialog({ setIsExitDialog, exitBackDialog }) {
  const { state } = useContext(ComponentContext)
  const { theme } = state

  //відмінити вихід
  const onCancelDialog = () => {
    setIsExitDialog(false)
  }

  //1-вихід із збереженням
  const onEnterSave = () => {
    // alert("onEnterSave")
    setIsExitDialog(false)
    exitBackDialog(1)
  }

  //1-вихід без збереження
  const onWithoutSave = () => {
    // alert("onWithoutSave")
    setIsExitDialog(false)
    exitBackDialog(0)
  }

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#cancel")?.focus() //Передати фокус в швидкий фільтер
    }, 300)
  }, [])

  return (
    <div className="modal-overley">
      <div className="dialog-section">
        {/* <div className="flexColumn-center"> */}
        <label className="title"> Вихід </label>
        <div className="flexRow-sBetween" style={{ marginTop: "20px" }}>
          <button id="cancel" className="button" onClick={onCancelDialog}>
            Відмінити
          </button>
          <button className="button" onClick={onWithoutSave}>
            Без збереженням
          </button>
          <button className="button" onClick={onEnterSave}>
            Із збереженням
          </button>
        </div>
        {/* </div> */}
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
          display: flex;
          justify-content: center; //по X
          align-items: center; //по Y
        }
        .dialog-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 680px;
          max-width: 100vmin;
          // top: calc((100vh - 400px) / 2);
          //   left: calc((100vw - 380px) / 2);
          // padding: 0.12rem;
          border-radius: 20px;
          border: 2px solid ${theme.colors.dialogBorder};
          background-color: ${theme.colors.dialogBackground};
          z-index: 2;
        }

        .title {
          font-weight: 300;
          font-size: 25px;
          color: ${theme.colors.dialogTitle};
        }
        .button {
          font-weight: 600;
          margin: 20px 10px;
          font-size: 25px;
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
