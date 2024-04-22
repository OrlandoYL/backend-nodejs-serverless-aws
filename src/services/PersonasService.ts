import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Persona from "../model/Persona";

export default class PersonasService {
    
    private Tablename: string = "PersonasTable";
    static getAllPersonas: any;

    constructor(private docClient: DocumentClient) { }
    async getAllPersonas(): Promise<Persona[]> {
        const personas = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return personas.Items as Persona[];
     }
     async createPersona(persona: Persona): Promise<Persona> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: persona
        }).promise()
        return persona as Persona;

    }
    
    }