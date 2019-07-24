import { Credential } from './credential';

export class UserNamePasswordCredential implements Credential {
    constructor(
        public username: String,
        public password: String
    ) { }
}
