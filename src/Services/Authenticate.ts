import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import { signIn, signOut } from 'aws-amplify/auth';
import UserPool from "./UserPool";

export const authenticate = async (email: string, password: string) => {
 
    return new Promise((res, rej) => {
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                res(result);
            },
            onFailure: (err) => {
                console.log(err);
                rej(err);
            }
        })
    }) 
}

export const logout = async () => {
    try {
        const user = UserPool.getCurrentUser();
        user?.signOut();
        window.location.href = "/login";
    } catch (error) {
        console.log('error signing out: ', error);
    }
}