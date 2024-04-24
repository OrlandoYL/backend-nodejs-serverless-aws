import dynamoDBClient from "../model/index";
import PersonasService from "./PersonasService";
const personasService = new PersonasService(dynamoDBClient());
export default personasService;