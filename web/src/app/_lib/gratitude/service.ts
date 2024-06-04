import {IApiService, SpringApiRoutes} from "@/app/_lib/api/api";

export type Gratitude = {
    id: string|undefined,
    message: string,
    date: number,
    month: number,
    year: number,
    dateAdded: Date,
    dateModified: Date
}

export interface IGratitudeService {
    getGratitudes(month: number, year: number): Promise<Gratitude[]>
    addGratitude(message: string, gratitudeDate: Date): Promise<200|400|500>
}

export class GratitudeService implements IGratitudeService {

    constructor(private apiService: IApiService) {}

    async addGratitude(message: string, gratitudeDate: Date): Promise<200|400|500> {
        const response = await this.apiService.post(SpringApiRoutes.GRATITUDE, { message, month: gratitudeDate.getMonth(), day: gratitudeDate.getDate(), year: gratitudeDate.getFullYear() });
        if (response.status >= 500) {
            return 500
        } else if (response.status >= 400) {
            return 400
        } else if (response.status === 200) {
            return 200
        }
        throw new Error("Illegal state")
    }

    async getGratitudes(month: number, year: number): Promise<Gratitude[]> {
        const params = new Map<string, any>();
        params.set("month", month)
        params.set("year", year)
        const response = await this.apiService.get(SpringApiRoutes.GRATITUDE, params)

        if (response.status === 200) {
            const json = await response.json();
            const convertedGratitudes: Gratitude[] = [];
            const gratitudes = json.gratitudes as any[]
            gratitudes.forEach((gratitude: any) => {
                convertedGratitudes.push({
                    id: gratitude.id,
                    message: gratitude.message,
                    date: gratitude.date,
                    month: gratitude.month,
                    year: gratitude.year,
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