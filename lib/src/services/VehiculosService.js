export default class PersonasService {
    constructor(docClient) {
        this.docClient = docClient;
        this.Tablename = "PersonasTable";
    }
    async getAllPersonas() {
        const personas = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise();
        return personas.Items;
    }
    async createPersona(persona) {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: persona
        }).promise();
        return persona;
    }
}
//# sourceMappingURL=PersonasService.js.map