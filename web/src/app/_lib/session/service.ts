

export interface ISessionService {
    setSessionId(sessionId: string): boolean
    getSessionId(): string|null
}

export class SessionService implements ISessionService {

    sessionStorageId = "GRATITUDE_SESSION_ID";

    getSessionId(): string|null {
        return localStorage.getItem(this.sessionStorageId);
    }

    setSessionId(sessionId: string): boolean {
        localStorage.setItem(this.sessionStorageId, sessionId);
        return false;
    }

}