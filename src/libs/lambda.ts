import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda";
import cors from "@middy/http-cors";

const middyfy = (handler:Handler) => {
  //console.log(handler);
  return middy(handler).use(middyJsonBodyParser()).use(cors());
}
export default middyfy;