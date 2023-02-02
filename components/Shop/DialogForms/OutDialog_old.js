//OutDialog.js/ Діалог виходу з документу(/залишитисьз збереженнням/без збереження)

export default function OutDialog() {
  return (
        <div className="outDialog-section">
          {/* <form>
              <input className="outDialog-out" type="text" name="cancel" value="Отмена" />
              <input className="outDialog-button" type="text" name="cancel" value="Отмена" />
              <input className="outDialog-button" type="text" name="cancel" value="Отмена" />
            </form> */}
          <button className="outDialog-out" onClick={onSaveData}>
            Зберегти і вийти
          </button>
          <div className="outDialog-buttonBody">
            <button className="outDialog-button" onClick={onExit}>
              Вийти без збереження
            </button>
            <button className="outDialog-button" onClick={onCancelDialog}>
              Залишитись в формі
            </button>
          </div>
          <style jsx>{`
            // outDialog
            .outDialog-section {
              position: absolute;
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 380px;
              // top: 200px;
              // top: 40%;
              top: calc((100vh - 200px) / 2);
              // top: 40%;
              // left: 30%;
              left: calc((100vw - 380px) / 2);
              padding: 0.12rem;
              border: 2px solid ${theme.colors.formBorder};
              background-color: ${theme.colors.formBackground};
              z-index: 2;
            }
            .outDialog-buttonBody {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              padding: 0.12rem;
              margin: 5px;
            }
            .outDialog-out {
              padding: 0.5rem;
              margin: 0.5rem;
              font-size: 15px;
              font-weight: bold;
              border-radius: 4px;
              color: ${theme.colors.formLabel};
              border: 2px solid ${theme.colors.formBorder};
              // border: 2px solid ${theme.colors.formButtonBorder};
              background-color: ${theme.colors.formBackground};
            }
            .outDialog-button {
              padding: 0.5rem;
              border-radius: 4px;
              margin-bottom: 3px;
              font-size: 13px;
              font-weight: bold;
              color: ${theme.colors.formTitle};
              border: 2px solid ${theme.colors.formBorder};
              background-color: ${theme.colors.formInputBackground}; //Затемнення екрану
            }
          `}</style>
        </div>
  )
}
