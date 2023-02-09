//ComponentContext.js
//Працювало в rob20200201_next-with-context-api-app-fajka-languages
//Зроблено на базі nexst_context_app + два блоги нижче
//https://codeguida.com/post/1818
//https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
//Тільки 2-і теми(themeTypeLight)

import { createContext, useReducer, useEffect } from "react"
import { useRouter } from "next/router"

import { themeDark, themeLith } from "../styles/theme"
// import { themeDark1, themeLith1 } from "../styles/DynamicAppTheme";

// console.log("ComponentContext.js/themeDark1", themeDark1);
// console.log("ComponentContext.js/themeLith1", themeLith1);

const reducer = (state, action) => {
  switch (action.type) {
    case "PROGRES":
      // console.log("***store/reducer/action=", action);
      return { ...state, progres: action.payload }
    case "PROFILE":
      // console.log("***store/reducer/action=", action);
      return { ...state, profile: action.payload }
    case "THEME":
      if (action.payload === "light") {
        return { ...state, theme: themeLith, themeTypeLight: true }
      } else if (action.payload === "dark") {
        return { ...state, theme: themeDark, themeTypeLight: false }
        // } else {
        //   return { ...state, theme: themeOther, themeType: "other" };
      }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

const initialState = {
  theme: themeLith,
  themeTypeLight: true,
  profile: "admin",
  progres: 0,
//   profile: "user",
}

export const ComponentContext = createContext(initialState)

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  //************************* */
  return <ComponentContext.Provider value={{ state, dispatch }}>{children}</ComponentContext.Provider>
}
