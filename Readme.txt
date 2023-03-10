// ??? - була помилка next.js versi-n12-3-1
// Зараз версія "next": "^13.1.6",- мусів міняти без <a>// <Link href={`${items.url}`} legacyBehavior>
// <a className="menu-items-a">{items.title}</a>


//На базі rob20221025_raui-agrid //Повний курс/https://www.youtube.com/watch?v=_EOrSmjdOZQ&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD
        Запуск yarn dev -p 3000  //PasgresSql на http://localhost:3000/
//===================================================================================================
Добавив:
    pages/404.js- для помилок/ з поверненнням на HOME по часу
    ??(---)conponents/Heading.js-для стандартизації заголовків/ ЛИШНІЙ
    не добавив активне меню (28хв)
    компонент Img-не вирівнює по висоті
//***********************************************************************
*** getServerSideProps SSR(Server-Side Rendering)-Для динамічних сторінок.
        !!! не працє як імпортованийкомпонент сторінки/тільки як ф-ція на відтворюваній сторінці!!!
        використовувати,якщо вам потрібно відобразити сторінку, дані якої мають бути отримані під час запиту.
*** getStaticPaths SSG(Static Site Generation)-для генерації ЗАДАНОЇ к-сті статичних сторінок
        працює тільки при (yarn build)/не викликається під час виконання.
        на сервері генерується певна к-сть статичних сторінок (в проекті є в .next/server/pages/posts/*.html)
*** getStaticProps (Static Site Generation)(Статична генерація сайту)-для генерації однієї статичної сторінки.
        працює тільки при (yarn build)/не викликається під час виконання.

//*************************************************************************

2022.12.13 - Завантажити дані з файлу в Next.js//https://vercel.com/guides/loading-static-file-nextjs-api-route
 ---
2022.12.30 - Індикатор загрузки //https://www.npmjs.com/package/nextjs-progressbar
    npm i nextjs-progressbar

2022.12.31 - Лічильникb//https://codesandbox.io/s/1x81b?file=/package.json:223-233
    npm i react-countup

////////////////////////////////////////////////////////////////////////
//=== 2023.01.03 // Проба створення проограми СКЛАД. Стек: PostgresSQL, Next.js. React.js

// Робота з таблицями на основі agGrid

2023.01.04 /Створення довідників:
    d_product.js- товарів
    d_category.js- категорій товарів
    d_brand.js- брендів
    d_client.js- клієнтів
    d_department- підрозділів
    d_ov.js- одиниць виміру
    d_user.js- користувачів

2023.01.15 /Створення списків документів і контексту документів:
    doc_check_head- список чеків (пряме добавлення в БД)
    doc_check_products- товари в чеках(пряме добавлення в БД)

2023.01.20 / doc_check_products- товари в чеках:
    PaymentDialo- діалог оплати
    ClientDialog- діалог вводу клієнта по ш-коду
    ExitDialog- діалог виходу з документу

 2023.01.25 / doc_check_products_Array.js-- товари в чеках:
    Добавлення в масив, і для agGrid оновлюю  масив setRowData(rows1)

2023.001.30 / в doc_check_products- товари в чеках:
    Добавлення в БД, але для agGrid оновлюю  масив setRowData(rows1)
    При добаленні не створюєм шапку документа doc_check_head, а входим в документ(doc_check_products)
    № чеку для check_id,беремо з select-seqence (SELECT nextval('doc_check_head_id_seq')`)

2023.02.01
    / d_products- довідник товарів :
        Добавив поле типу (boolen)-доробив
        CheckboxRenderer-модуль для рендеру Checkbox в agGrid
    / в doc_check_products- товари в чеках:
        Не зміг реалізувати добвлення в doc_check_head з зарезервованим check_id(nextval)-> cannot insert a non-DEFAULT value into column "id" / undefined
2023.02.03 / в doc_check_products- товари в чеках:
    Доробив функцію перерахунку знижки в рядкак і шапці чеку
    При добавленні рядка  враховується поточни знижка

 2023.02.04 / в doc_check_products- товари в чеках:
    Запис в БД doc_check_products і doc_check_head / з масиву і doc_check_head ???

2023.02.06  / Підключив PostgreSQL до зовнішнього сервера/Veles

2023.02.07 / Обновив  "next": "^13.1.6",- мусів міняти <Link <a>
    <Link href={`${items.url}`} legacyBehavior>
        <a className="menu-items-a">{items.title}</a>
        </Link>

2023.02.09 / Розмістив БД на elephantsql.com
    Почистив від лишніх модулів
    Deploy to Versal

2023.02.16. / Добавив налаштування кольорів теми в multilevelMenu(MenuItems.jsб)

2023.02.18. / в doc_check_products- товари в чеках:
    - вилучення + коригуванн???

2023.02.28./ Поки тільки для d_brand
    - обновлення даних SWR-(mutate)
        const { data, mutate, error } = useSWR("/api/shop/references/d_brand/select-all", fetcher) в GBrand

    - Переміщення по стрілках  //https://github.com/ag-grid/ag-grid/issues/6186
    - Дії при натиску на Enter

2023.02.28./ react-bootstrap-table2(-next).// https://code.tutsplus.com/tutorials/working-with-tables-in-react-part-one--cms-29682
        - !!!  react-bootstrap-table-next - гірший за agGrid !!!

202.03.01-04 /
    1.Створив один компопент/components/AgGridModules/AgGrid.js для всіх таблиць, які використовують agGrid
     !! Товарні чеки не працюють!!!
     - Запуск Довідкики/agGrid/gmodule/
        -pages//shop__agmodule/references/d_brand->/components/Shop/References/Brend/GBrend.js->AgGrid.js
    2.Залишив agGrid таблиці з agGrid у кожноному документі.
        Запуск: Довідкики/agGrid
        -pages//shop_agmodule/references/d_brand->/components/Shop/References/Brend/GBrend.js->AgGrid.js
    -
    !!! Не працює переміщення фокусу на швидкий пошук при виклику як довідник
    !!! Не можу перемістити фокус на рядок, який був зкоригований після оновлення даних
        ensureIndexVisible(selectedRowGridID, "top") //прокручує сітку/рядок(RowID) початок вікна
        getDisplayedRowAtIndex(selectedRowGridID).setSelected(true)
