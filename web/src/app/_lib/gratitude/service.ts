import {IApiService, SpringApiRoutes} from "@/app/_lib/api/api";
import {ISessionService} from "@/app/_lib/session/service";

export type Gratitude = {
    id: string|undefined,
    message: string,
    date: Date,
    dateAdded: Date,
    dateModified: Date
}

export interface IGratitudeService {
    getGratitudes(month: number): Promise<Gratitude[]>
    addGratitude(message: string, gratitudeDate: Date): Promise<200|400|500>
}

export class GratitudeService implements IGratitudeService {

    constructor(private apiService: IApiService) {}

    async addGratitude(message: string, gratitudeDate: Date): Promise<200|400|500> {
        const response = await this.apiService.post(SpringApiRoutes.GRATITUDE, { message, gratitudeDate });
        if (response.status >= 500) {
            return 500
        } else if (response.status >= 400) {
            return 400
        } else if (response.status === 200) {
            this.getGratitudes(gratitudeDate.getMonth())
            return 200
        }
        throw new Error("Illegal state")
    }

    async getGratitudes(month: number): Promise<Gratitude[]> {
        const params = new Map<string, any>();
        params.set("month", month)
        const response = await this.apiService.get(SpringApiRoutes.GRATITUDE, params)

        if (response.status === 200) {
            const json = await response.json();
            const convertedGratitudes: Gratitude[] = [];
            const gratitudes = json.gratitudes as any[]
            gratitudes.forEach((gratitude: any) => {
                convertedGratitudes.push({
                    id: gratitude.id,
                    message: gratitude.message,
                    date: new Date(gratitude.gratitudeDate),
                    dateAdded: new Date(gratitude.dateAdded),
                    dateModified: new Date(gratitude.dateModified)
                })
            })
            return convertedGratitudes
        } else {
            console.log(`There was an issue getting the gratitude for the month: ${response.status}`)
        }

        return []
    }
}