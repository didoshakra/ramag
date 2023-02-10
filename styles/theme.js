//*** */
//20080425-добавлені шрифти //Amatic SC,Poppins,Lora-https://fonts.googleapis.com/ з шаблону
// _do
export const themes = ["light", "dark", "other"]

export const themesNames = {
  light: "Світла",
  dark: "Темна",
  other: "Інша",
}

//Для тем будемо міняти тільки кольори(theme.colors.)
export const themeLith = {
  fontFamily: {
    sansSerif: "Poppins-Regular,Arial,sans-serif", //звичайні шрифти без засічок
    serif: "Lora-Regular,Georgia, serif", //звичайні шрифти з засічками
    mimicHand: "AmaticSC-Regular, cursive", //шрифти, що імітують почерк
    fixedWidth: "MajorMonoDisplay-Regular, monospace", //Всі гліфи мають однакову фіксовану ширину
    decorative: "Trattatello,fantasy", //декоративні шрифти, для назв
  },
  size: {
    tableIcon: "20px",
    tableIconBorder: "30px",
    //
    formIcon: "20px",
    formIconBorder: "30px",
    //
    dialogIcon: "20px",
    dialogIconBorder: "30px",
  },
  colors: {
    text: "#060214",
    background: "#fff", //білий/
    errorMsg: "#f21e08",
    backgroundEclipse: "rgba(0, 0, 0, 0.4)", //Затемнення екрану
    //----------------------------------------------
    headTapeText: "#fff",
    headTapeBackground: "#6B8E23", //1 "#82AE46",
    headTapeTextHover: "red",
    headTapeTextBackgroundHover: "#82AE46",
    //----------------------------------------------
    headText: "#6B8E23", //1 "#82AE46",
    headBackground: "#E7F4E0", // "#F4F4EB", "#fff", //білий
    headTextHover: "#fff",
    headBackgroundHover: "#82AE46",
    //----------------------------------------------
    headLogoText: "#6B8E23", //1 "#82AE46",
    headLogoTextHover: "red",
    //----------------------------------------------
    headMobileText: "#82AE46",
    headMobileTextHover: "red",
    headMobileBackground: "rgba(65,69,69,1)",
    headMobiletBackgroundHover: "#fff", //білий
    headMobileIcon: "red",
    //----------------------------------------------
    headIcon: "#6B8E23", //1 "#82AE46", "rgba(23,25,25,1)",
    headIconHover: "red",
    headIconBackground: "rgba(65,69,69,1)",
    headIconBackgroundHover: "#82AE46",
    headIconBorderWidht: "0px",
    headIconBorderStyle: "dotted",
    //----------------------------------------------
    headMenuText: "#6B8E23", //1  "#82AE46",
    headMenuTextHover: "#fff",
    headMenuBackground: "#E7F4E0",
    headMenuBackgroundHover: "#82AE46",
    headMenuActive: "#fff",
    headMenuBackgroundActive: "red",
    headMenuBackgroundHoverGoriz: "#f64532",
    //----------------------------------------------
    headDroopMenuText: "#82AE46",
    headDroopMenuTextHover: "#fff",
    headDroopMenuBackground: "#F4F4EB", //"#DCDCDC","#fff",
    headDroopMenuBackgroundHover: "#A5E189",
    headDroopMenuBackgroundActive: "red",
    //----------------------------------------------
    docHeadTitle: "#6B8E23", //1 "#fff",
    docHeadLable: "#f64532", //"#6B8E23", //1"#fff",
    docHeadBackground: "#f8f8f8;", //agGrid-шапка
    // docHeadBackground: "#82AE46",    //headTapeBackground
    // docHeadBackground: "#6B8E23",
    // docHeadBackground: "#9ACD32",
    // docHeadBackground: "rgba(154, 205, 50, 0.8)",
    // docHeadBackground: "hsla(120,100%,50%,0.6)",
    //----------------------------------------------
    tableHeadTitle: "#6B8E23", //1 "#82AE46",
    tableHeadText: "#000",
    tableHeadBorder: "#babfc7", //ag_Grid border(шапка)
    tableRowsBorder: "#dde2eb", //ag_Grid border-secondery)(між рядками)
    tableHeadLable: "#f64532",
    tableHeadBackground: "#f8f8f8;", //agGrid-шапка
    // tableHeadBackground: "#E7F4E0",
    // tableHeadBackground: "#82AE46",  //headTapeBackground/3
    // tableHeadBackground: "#6B8E23",  //1
    // tableHeadBackground: "#9ACD32",  //4
    // tableHeadBackground: "#fff",     //білий
    // tableHeadBackground: "#dde2eb;", //agGrid
    tableIcon: "#f64532",
    // tableIconHover: "#6B8E23",   //Поки не використав
    tableIconBorder: "#E7F4E0", // "#f64532",
    tableIconBackgroundHover: "#E7F4E0",
    tableIcon1: "black",
    tableIcon2: "#f64532",
    //-----------------------------------------------
    formTitle: "green", //"#6B8E23", //1"#82AE46",
    formLabel: "#f64532",
    formBorder: "green",
    formBackground: "#fff", //білий
    formSubmit: "#6B8E23", //"green",
    formSubmitHover: "#f64532",
    // formButton: "#f64532",           //Поки не використав
    formButtonBorder: "#E7F4E0", //"#fff", //білий
    formInputText: "#060214",
    formInputBackground: "#fff", //білий,
    formIcon: "#f64532",
    // formIconHover: "#6B8E23",
    formIconBackgroundHover: "#E7F4E0",
    formIcon1: "black",
    formIcon2: "#f64532",
    //-----------------------------------------------
    dialogTitle: "#f64532", //"#6B8E23", //"#82AE46",
    dialogLabel1: "#6B8E23",
    dialogLabel2: "grey",
    dialogSum1: "#f64532", //"#0092ff","blue",
    dialogSum2: "grey",
    dialogBorder: "#6B8E23",
    dialogBackground: "#fff", //білий
    dialogSubmit: "#6B8E23", //"green",
    dialogSubmitHover: "#f64532",
    dialogButton: "#6B8E23",
    dialogButtonHover: "#f64532",
    dialogButtonBackground: "#fff", //білий
    dialogButtonBackgroundHover: "#E7F4E0", //"#9ACD32",
    dialogButtonBorder: "#6B8E23",
    dialogInputText: "#060214",
    dialogInputBackground: "#fff", //білий,
    dialogIcon: "#f64532",
    // dialogIconHover: "#6B8E23",  //Поки не використав
    dialogIconBackgroundHover: "#E7F4E0",
    // dialogIconBackgroundHover: "#9ACD32",
    dialogIcon1: "black",
    dialogIcon2: "#f64532",
    // -----------------------------------------------
    paperBackground: "rgb(223, 222, 222)",
    paperBoxShadow: "2px 2px 2px rgba(0, 0, 0, 0.6)",
    paperHeadBackground: "rgba(187,190,190,1)",
    paperHeadBoxShadow: "2px 2px 2px rgba(0, 0, 0, 0.6)",
    //----------------------------------------------------
    cardBackground: "rgba(187,190,190,0.5)",
    cardBoxShadow: "2px 2px 2px rgba(0, 0, 0, 0.6)",
  },
}

export const themeDark = {
  fontFamily: {
    //agGrid-Poppins",Arial,sans-serif
    sansSerif: "Poppins-Regular,Arial,sans-serif", //звичайні шрифти без засічок
    serif: "Lora-Regular,Georgia, serif", //звичайні шрифти з засічками
    mimicHand: "AmaticSC-Regular, cursive", //шрифти, що імітують почерк
    fixedWidth: "MajorMonoDisplay-Regular, monospace", //Всі гліфи мають однакову фіксовану ширину
    decorative: "Trattatello,fantasy", //декоративні шрифти, для назв
  },
  size: {
    tableIcon: "20px",
    tableIconBorder: "30",
    //
    formIcon: "20px",
    formIconBorder: "30px",
    //
    dialogIcon: "20px",
    dialogIconBorder: "30px",
  },
  colors: {
    text: "#fff",
    background: "rgba(65,69,69,1)",
    errorMsg: "#f21e08",
    backgroundEclipse: "rgba(0, 0, 0, 0.4)", //Затемнення екрану
    //----------------------------------------------
    headTapeText: "#6B8E23", //1"#82AE46",
    headTapeBackground: "#000", //"rgba(65,69,69,1)",
    headTapeTextHover: "red",
    headTapeTextBackgroundHover: "rgba(65,69,69,1)",
    //----------------------------------------------
    headText: "#fff", //білий
    headBackground: "rgba(23,25,25,1)",
    // headBackground: "rgba(65,69,69,1)",
    // headBackground: "rgba(0, 0, 0, 0.5)",
    headTextHover: "rgba(23,25,25,1)",
    headTextBackgroundHover: "#fff", //білий
    //----------------------------------------------
    // headLogoText: "#82AE46",
    headLogoText: "#6B8E23", //1
    headLogoTextHover: "red",
    //----------------------------------------------
    headMobileText: "#82AE46", //білий
    headMobileTextHover: "red",
    headMobileBackground: "rgba(65,69,69,1)",
    headMobileBackgroundHover: "#fff", //білий
    headMobileIcon: "red", //білий,
    //----------------------------------------------
    headIcon: "#6B8E23", //1""#82AE46","#fff", //білий
    headIconHover: "red",
    headIconBackgroun: "rgba(65,69,69,1)", //білий
    headIconBackgroundHover: "#82AE46",
    headIconBorderWidht: "0px",
    headIconBorderStyle: "dotted",
    //----------------------------------------------
    headMenuText: "#6B8E23", //1"#82AE46",
    headMenuTextHover: "#fff",
    // headMenuBackground: "rgba(65,69,69,1)", //білий
    headMenuBackground: "rgba(23,25,25,1)",
    headMenuBackgroundHover: "#82AE46",
    headMenuActive: "#fff",
    headMenuBackgroundActive: "red",
    headMenuBackgroundHoverGoriz: "#f64532",
    //----------------------------------------------
    headDroopMenuText: "#82AE46",
    headDroopMenuTextHover: "#fff",
    headDroopMenuBackground: "rgba(65,69,69,1)",
    headDroopMenuBackgroundHover: "#82AE46",
    headDroopMenuBackgroundActive: "red",
    //----------------------------------------------
    // docHeadTitle: "#fff",
    docHeadTitle: "#6B8E23", //1
    docHeadLable: "#f64532",
    // docHeadLable: "#6B8E23", //1
    // docHeadBackground: "#000",
    docHeadBackground: "#222628", //agGrid head
    //----------------------------------------------
    tableHeadTitle: "#6B8E23", //1 "#82AE46",
    tableHeadText: "#FFFF",
    tableHeadBorder: "#babfc7", //ag_Grid border(шапка)
    tableRowsBorder: "#dde2eb", //ag_Grid border-secondery)(між рядками)
    tableHeadLable: "#FFFF", //"#f64532",
    tableHeadBackground: "#222628", //agGrid head "rgba(23,25,25,1)","#68686e",
    tableIcon: "#f64532",
    // tableIconHover: "#6B8E23",   //Поки не використав
    tableIconBorder: "rgba(23,25,25,1)",
    tableIconBackgroundHover: "#E7F4E0",
    tableIcon1: "gray",
    tableIcon2: "#f64532",
    //----------------------------------------------
    // formTitle: "#82AE46",
    formTitle: "#6B8E23", //1
    // formLabel: "#f64532",
    formLabel: "#6B8E23", //1
    formBorder: "green",
    formBackground: "#000",
    formSubmit: "#6B8E23", //"green",
    formSubmitHover: "#f64532",
    // formButton: "#f64532",   //Поки не використав
    formButtonBorder: "#222628", //"#babfc7", //ag_Grid border(шапка)
    formInputText: "#fff", //білий
    formInputBackground: "#181d1f",
    formIcon: "#f64532",
    // formIconHover: "#E7F4E0",//Поки не використав
    formIconBackgroundHover: "#6B8E23",
    formIcon1: "black",
    formIcon2: "#f64532",
    //----------------------------------------------
    dialogTitle: "#f64532", //"#6B8E23",  "#82AE46",
    dialogLabel1: "#6B8E23",
    dialogLabel2: "grey",
    dialogSum1: "#f64532", //"#0092ff","blue",
    dialogSum2: "grey",
    dialogBorder: "#6B8E23",
    dialogBackground: "rgba(65,69,69,1)",
    dialogSubmitHover: "#f64532",
    dialogButton: "#6B8E23",
    dialogButtonHover: "#f64532",
    dialogButtonBackground: "rgba(65,69,69,1)",
    dialogButtonBackgroundHover: "#E7F4E0", //"#9ACD32",
    dialogButtonBorder: "#6B8E23",
    dialogInputText: "#060214",
    dialogInputBackground: "#fff", //білий,
    dialogIcon: "#f64532",
    // dialogIconHover: "#6B8E23", //Поки не використав
    dialogIconBackgroundHover: "#E7F4E0", //"#9ACD32",
    dialogIcon1: "black",
    dialogIcon2: "#f64532",
    // -----------------------------------------------paperBackground: "rgba(65,69,69,1)",
    paperBoxShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
    paperHeadBackground: "rgba(0, 0, 0, 0.5)", //"rgba(64,61,51,1)",
    paperHeadBoxShadow: "2px 2px 2px rgba(23,25,25,0.9)",
    //------------------------------------------------
    cardBackground: "rgba(64,61,51,0.6)",
    cardBoxShadow: "2px 2px 2px rgba(23,25,25,0.9)",
  },
}
