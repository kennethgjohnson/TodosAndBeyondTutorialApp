export class UserPrincipal {
    constructor(
        private username: String,
        private resources: Array<String>,
        private authenticationToken: String
    ) {}

    public hasResource(resourceName: String): Boolean {
        return (this.resources.find(resource => resource === resourceName) != null);
    }

    public getUserName(): String {
        return this.username;
    }

    public getAuthenticationToken(): String {
        return this.authenticationToken;
    }

    public setAuthenticationToken(tokenValue: string): void {
        this.authenticationToken = tokenValue;
    }
}
