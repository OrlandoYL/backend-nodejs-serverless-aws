import dynamoDBClient from "../model/index";
import PersonasService from "./PersonasService";
const vehiculosService = new PersonasService(dynamoDBClient());
export default vehiculosService;
//# sourceMappingURL=index.js.map