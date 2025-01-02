import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";
import axios from "axios";
import { Interviewer } from "../types/auth.types";
import Session from "supertokens-web-js/recipe/session";
// @ts-expect-error
import config from "../../config";
import { OAUTH_PASSWORD } from "../constants";

const checkEmail = async (email: string) => {
    try {
        let response = await doesEmailExist({
            email,
        });

        if (response.doesExist) {
            return true;
        }

        return false;
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error("Oops! Something went wrong.");
        }
    }
};

const handleSignup = async (email: string, password: string) => {
    try {
        let response = await signUp({
            formFields: [
                {
                    id: "email",
                    value: email,
                },
                {
                    id: "password",
                    value: password,
                },
            ],
        });

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validation
            response.formFields.forEach((formField) => {
                // Email validation failed (for example incorrect email syntax),
                // or the email is not unique.

                // OR

                // Password validation failed.
                // Maybe it didn't match the password strength
                throw new Error(formField.error);
            });
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            throw new Error(response.reason);
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error("Oops! Something went wrong.");
        }
    }
};

const handleLogin = async (email: string, password: string) => {
    try {
        let response = await signIn({
            formFields: [
                {
                    id: "email",
                    value: email,
                },
                {
                    id: "password",
                    value: password,
                },
            ],
        });

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach((formField) => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    throw new Error(formField.error);
                }
            });
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            throw new Error("Email password combination is incorrect.");
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign in was not allowed.
            throw new Error(response.reason);
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            return true;
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error("Oops! Something went wrong.");
        }
    }

    return false;
};

const addInterviewer = async (formData: FormData) => {
    try {
        const response = await axios.post(
            `${config.apiBaseUrl}/api/interviewer/AddInterviewer`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data as Interviewer;
    } catch (error) {
        throw new Error();
    }
};

const getInterviewerData = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${config.apiBaseUrl}/api/interviewer/Interviewerlogin`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error();
    }
};

export const signUpFlow = async (
    email: string,
    password: string,
    formData: FormData,
    isOauth: boolean = false
) => {
    if (!isOauth) {
        const doesEmailExist = await checkEmail(email);

        if (!doesEmailExist) {
            await handleSignup(email, password);
            const interviewer = await addInterviewer(formData);
            const loginSuccess = await handleLogin(email, password);

            if (loginSuccess) {
                return interviewer;
            } else return null;
        } else {
            throw new Error("Email already exists. Please sign in instead");
        }
    } else {
        formData.set("password", OAUTH_PASSWORD);
        const interviewer = await addInterviewer(formData);
        return interviewer;
    }
};

export const loginFlow = async (
    email: string,
    password: string,
    isOauth: boolean = false
) => {
    const loginSuccess = await handleLogin(email, password);
    if (!isOauth) {
        if (loginSuccess) {
            const interviewer = await getInterviewerData(email, password);
            return {
                user: interviewer.user,
                interviewer_id: interviewer.interviewer_id   
            };
        } else return null;
    } else {
        const interviewer = await getInterviewerData(email, password);
        return {
            user: interviewer.user,
            interviewer_id: interviewer.interviewer_id
        };
    }
};

export const logout = async () => {
    await Session.signOut();
};
