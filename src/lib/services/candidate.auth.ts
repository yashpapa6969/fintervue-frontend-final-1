import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { doesEmailExist } from "supertokens-web-js/recipe/emailpassword";
import axios from "axios";
import { Interviewee } from "../types/auth.types";
import Session from "supertokens-web-js/recipe/session";

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
            return;
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            throw new Error(err.message);
        } else {
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }

    return false;
};

const addInterviewee = async (formData: FormData) => {
    try {
        const response = await axios.post(
            `http://api.fintervue.com/api/interviewee/AddInterviewee`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data as Interviewee;
    } catch (error) {
        throw new Error();
    }
};

const getIntervieweeData = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `http://api.fintervue.com/api/interviewee/intervieweelogin`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
            
            return response.data as Interviewee;
    } catch (error) {
        throw new Error();
    }
};

export const signUpFlow = async (
    email: string,
    password: string,
    formData: FormData
) => {
    const doesEmailExist = await checkEmail(email);

    if (!doesEmailExist) {
        await handleSignup(email, password);
        const interviewee = await addInterviewee(formData);
        const loginSuccess = await handleLogin(email, password);

        if (loginSuccess) {
            return interviewee;
        } else return null;
    } else {
        throw new Error("Email already exists. Please sign in instead");
    }
};

export const loginFlow = async (email: string, password: string) => {
    const loginSuccess = await handleLogin(email, password);
    
    if (loginSuccess) {
        const interviewee = await getIntervieweeData(email, password);
        return interviewee;
    } else return null;
};

export const logout = async () => {
    await Session.signOut();
};