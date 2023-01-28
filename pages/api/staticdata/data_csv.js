import path from "path"
import { promises as fs } from "fs"

export default async function handler(req, res) {
  console.log("datajson.js")
  //Знайти абсолютний шлях до каталогу json
  const csvDirectory = path.join(process.cwd(), "csv")
  //Читання файлу даних json data.json
  const fileContents = await fs.readFile(csvDirectory + "/data.csv", "utf8")
  //Повернути вміст файлу даних у форматі json
  console.log("data_csv.js/res.status(200).json(fileContents)=", res.status(200).json(fileContents))
  res.status(200).json(fileContents)
}
