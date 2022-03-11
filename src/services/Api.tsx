//Types
import { GetCodeObjectAllProps } from "../types/GetCodeObjectAllProps";

const base_url = 'https://my-json-server.typicode.com/cidadealta/exercise/';

export const Api = {
    queryOfAuthentication: async (name: string, password: string) => {
        let request = await fetch(`${base_url}usuarios?nome=${name}&senha=${password}`);
        let json = await request.json();

        return json;
    },
    getAllCodes: async (limit: number, page: number) => {
        let request = await fetch(`${base_url}codigopenal?_limit=${limit}&_page=${page}`);
        let json = await request.json();

        return json;
    },
    getCodeOfId: async (id: number) => {
        let request = await fetch(`${base_url}codigopenal/${id}`);
        let json = await request.json();

        return json;
    },
    deleteCode: async (id: number) => {
        let request = await fetch(`${base_url}codigopenal/${id}`, {
            method:'DELETE'
        });
        let json = await request.json();

        return json;
    },
    editCode: async (data: GetCodeObjectAllProps) => {
        let request = await fetch(`${base_url}codigopenal/${data.id}`, {
            method:'PUT',
            body: JSON.stringify({
                data
            })
        });
        let json = await request.json();

        return json;
    },
    newCode: async (data: GetCodeObjectAllProps) => {
        let request = await fetch(`${base_url}codigopenal`, {
            method:'POST',
            body: JSON.stringify({
                data
            })
        });
        let json = await request.json();

        return json;
    }
}