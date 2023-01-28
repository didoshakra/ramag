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
      {
        title: "Load data from file",
        submenu: [
          {
            title: "json_apiSWR",
            url: "/shop/loaddata_fromfile/json_apiswr_obj",
          },
          {
            title: "json_importFile_arrey_table",
            url: "/shop/loaddata_fromfile/json_importfile_arrey_table",
          },
          {
            title: "json_apiSWR_arrey_li_table",
            url: "/shop/loaddata_fromfile/json_apiswr_arrey_li_table",
          },
          {
            title: "json_getStaticProps_posts",
            url: "/shop/loaddata_fromfile/json_staticprops_posts",
          },
          {
            title: "csv_papaparse",
            url: "/shop/loaddata_fromfile/csv_papaparse",
          },
          {
            title: "csv_papaparse_win1251-NR",
            url: "/shop/loaddata_fromfile/csv_papaparse_win1251",
          },
          {
            title: "csv_fastcsv_getstaticprops-NR",
            url: "/shop/loaddata_fromfile/csv_fastcsv_getstaticprops",
          },
          {
            title: "exell_eventfile_table",
            url: "/shop/loaddata_fromfile/exell_eventfile_table",
          },
        ],
      },
      {
        title: "Список документів",
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
    ],
  },
]
export const menuExamples = [
  {
    title: "Приклади",
    submenu: [
      {
        title: "Різні",
        submenu: [
          {
            title: "Лічильники",
            url: "/examples/counter/counters",
          },
        ],
      },
      {
        title: "Лічильник(re-render)",
        submenu: [
          {
            title: "Лічильник добавлення записів/counter_insert",
            url: "/examples/counter/counter_insert",
          },
        ],
      },
    ],
  },
]
