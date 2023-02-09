//HomePage.js
import Head from "next/head"
import Layout from "../../components/Main/Layout"
import HomeSlaider from "../../components/shopRoletu/HomeSlaider"
import Сategory from "../../components/shopRoletu/Сategory"
import Products from "../../components/shopRoletu/Products"
import Footer from "../../components/shopRoletu/Footer"

// const HomePage = () => {
  export default function HomePage() {

  return (
    <Layout title="RAMAG" description="Мої компоненти">
      <Head>
        {/* <title>{t("header-titleSite")}</title> */}
        <title>RAMAG</title>
      </Head>
      <HomeSlaider />
      <Сategory />
      <Products />
      <Footer />
    </Layout>
  )
}
// export default HomePage
