'use client'

export interface ISessionService {
    setSessionId(sessionId: string): boolean
    getSessionId(): string|null
}

export class SessionService implements ISessionService {

    sessionStorageId = "GRATITUDE_SESSION_ID";

    getSessionId(): string|null {
        if (!window || !window.localStorage) {
            return null
        }
        return localStorage.getItem(this.sessionStorageId);
    }

    setSessionId(sessionId: string): boolean {
        if (!window || !window.localStorage) {
            return false;
        }
        localStorage.setItem(this.sessionStorageId, sessionId);
        return true;
    }

}