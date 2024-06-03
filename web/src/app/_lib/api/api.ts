export enum SpringApiRoutes {
    USER_LOGIN = "user/login",
    USER_CREATE = "user/create",
    GRATITUDE = "gratitude",
}

export interface IApiService {
    post(path: string, body: any, authToken: string|null): Promise<Response>;
    get(path: string, queryParams: Map<string, any>, authToken: string|null): Promise<Response>;
}

export class SpringApi implements IApiService {

    private apiBase = process.env.NEXT_PUBLIC_API_BASE

    private buildQueryParams(map: Map<string, any>) {
        const params: string[] = [];
        map.forEach((value, key) => {
            params.push(`${key}=${value}`);
        })
        return params.join("&");
    }

    async get(path: string, queryParams: Map<string, any>, authToken: null|string = null): Promise<Response> {
        const query = encodeURI(this.buildQueryParams(queryParams));
        return await fetch(this.buildApiCall(path) + `?${query}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken ? `Bearer ${authToken}` : ""
            },
        })
    }

    async post(path: string, body: any, authToken: null|string = null): Promise<Response> {
        return await fetch(this.buildApiCall(path), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken ? `Bearer ${authToken}` : ""
            },
            body: JSON.stringify(body)
        })
    }

    private buildApiCall(path: string) {
        return `${this.apiBase}/${path}`
    }

}