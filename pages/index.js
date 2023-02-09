//HomePage.js
import Head from "next/head"
import Layout from "../components/Main/Layout"
import MyHomePage from "../components/Shop/MyHomePage"
import Footer from "../components/shopRoletu/Footer"

// const HomePage = () => {
  export default function HomePage() {

  return (
    <Layout title="RAMAG" description="Мої компоненти">
      <Head>
        {/* <title>{t("header-titleSite")}</title> */}
        <title>RAMAG</title>
      </Head>
      <MyHomePage />
      {/* <Footer /> */}
    </Layout>
  )
}
// export default HomePage
