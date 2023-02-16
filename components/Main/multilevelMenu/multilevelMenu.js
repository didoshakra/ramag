export const menuAdmin = [
  {
    title: "Меню адміністратора",
    submenu: [ 
      {
        title: "Довідники",
        submenu: [
          {
            title: "Товари",
            url: "/shop/references/d_product",
          },
          {
            title: "Бренди",
            url: "/shop/references/d_brand",
          },
          {
            title: "Категорії товарів",
            url: "/shop/references/d_category",
          },
          {
            title: "Клієнти",
            url: "/shop/references/d_client",
          },
          {
            title: "Підрозділи",
            url: "/shop/references/d_department",
          },
          {
            title: "Одиниці вимірювання",
            url: "/shop/references/d_ov",
          },
          {
            title: "Користувачі",
            url: "/shop/references/d_user",
          },
        ],
      },
    ],
  },
]
export const menuDocuments = [
  {
    title: "Документи",
    submenu: [
      {
        title: "Продажі",
        submenu: [
          {
            title: "Товарні чеки (doc_check_head)",
            url: "/shop/docs/doc_check_head",
          },
          //   {
          //     title: "Товарний чек/товари(doc_check_products))",
          //     url: "/shop/docs/doc_check_products",
          //   },
        ],
      },
    ],
  },
]
