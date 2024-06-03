import {IApiService, SpringApiRoutes} from "@/app/_lib/api/api";
import {ISessionService} from "@/app/_lib/session/service";

type LoginResponse = {
    sessionId: string
}

export type User = {
    id: string
    name: string
    email: string
}

export interface IUserService {
    loginUser(email: string, password: string): Promise<200|400|500>;
    createUser(email: string, name: string, password: string): Promise<200|400|209|500>;
}

export class UserService implements IUserService {

    constructor(private apiService: IApiService, private sessionService: ISessionService) {}

    async loginUser(email: string, password: string): Promise<200|400|500> {
        try {
            const response = await this.apiService.post(SpringApiRoutes.USER_LOGIN, { email, password })

            if (response.status >= 500) {
                return 500;
            } else if (response.status >= 400) {
                return 400;
            } else if (response.status === 200) {
                const sessionId = (await response.json() as LoginResponse).sessionId ?? undefined;
                if (sessionId) {
                    this.sessionService.setSessionId(sessionId);
                }
                return 200;
            }
        } catch (e) {
            console.log(e)
        }
        return 500;
    }

    async createUser(email: string, name: string, password: string): Promise<200|400|500|209> {
        try {
            const response = await this.apiService.post(SpringApiRoutes.USER_CREATE, { email, name, password })
            if (response.status >= 500) {
                return 500;
            } else if (response.status >= 400) {
                return 400;
            } else if (response.status === 200) {
                const user = await response.json() as User
                return !!user.id ? 200 : 500
            } else if (response.status === 209) {
                return 209
            }
        } catch (e) {
            console.log(e)
        }
        return 500
    }

}


