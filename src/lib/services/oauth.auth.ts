import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/recipe/thirdparty";
import { signInAndUp } from "supertokens-web-js/recipe/thirdparty";

export async function googleSignInClicked() {
    try {
        const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
            thirdPartyId: "google",

            // This is where Google should redirect the user back after login or error.
            // This URL goes on the Google's dashboard as well.
            frontendRedirectURI: `https://fintervue.com/api/auth/callback/google`,
        });

        // we redirect the user to google for auth.
        return authUrl;
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error("Oops! Something went wrong.");
        }
    }
}

export async function handleGoogleCallback() {
    try {
        const response = await signInAndUp();

        if (response.status === "OK") {
            if (
                response.createdNewRecipeUser &&
                response.user.loginMethods.length === 1
            ) {
                return { id: response.user.id, email: response.user.emails };
            } else {
                throw new Error("Error trying to log you in! try again soon.");
            }
        } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign in / up was not allowed.
            throw new Error(response.reason);
        } else {
            // SuperTokens requires that the third party provider
            // gives an email for the user. If that's not the case, sign up / in
            // will fail.

            // As a hack to solve this, you can override the backend functions to create a fake email for the user.
            // redirect back to login page
            throw new Error(
                "No email provided by social login. Please use another form of login"
            );
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error("Oops! Something went wrong.");
        }
    }
}
