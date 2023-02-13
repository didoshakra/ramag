//https://nextjs.org/docs/api-routes/request-helpers
export const config = {
  api: {
    externalResolver: true, //Проти помилки:API resolved without sending a response
    // bodyParser: {
    //   sizeLimit: "1mb",
    // },
  },
}
