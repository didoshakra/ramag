import { useEffect } from "react"
import { useRouter } from "next/router"
import Loyout from "../components/Main/Layout"
import classes from "../styles/error.module.css"

export default function Error() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }, [router])
  return (
    <Loyout title="Error">
      <h1 className={classes.error}>Error 404</h1>
      <h2> Сторінка не найдена...</h2>
    </Loyout>
  )
}
