import axios from "axios";
import { sendPasswordResetEmail } from "supertokens-web-js/recipe/emailpassword";
import { submitNewPassword } from "supertokens-web-js/recipe/emailpassword";
//@ts-expect-error
import config from "../../config";

export async function sendEmailClicked(email: string) {
    try {
        let response = await sendPasswordResetEmail({
            formFields: [
                {
                    id: "email",
                    value: email,
                },
            ],
        });

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validation
            response.formFields.forEach((formField) => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    window.alert(formField.error);
                }
            });
        } else if (response.status === "PASSWORD_RESET_NOT_ALLOWED") {
            // this can happen due to automatic account linking. Please read our account linking docs
            window.alert("Password Reset not allowed!");
        } else {
            // reset password email sent.
            return true;
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
    return false;
}

export async function newPasswordEntered(
    email: string,
    newPassword: string,
    type: string
) {
    try {
        let response = await submitNewPassword({
            formFields: [
                {
                    id: "password",
                    value: newPassword,
                },
            ],
        });

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach((formField) => {
                if (formField.id === "password") {
                    // New password did not meet password criteria on the backend.
                    window.alert(formField.error);
                }
            });
        } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
            // the password reset token in the URL is invalid, expired, or already consumed
            window.alert("Password reset failed. Please try again");
        } else {
            const isUpdated = await resetPassword(email, newPassword, type);
            if (isUpdated) {
                window.alert("Password reset successful!");
                return true;
            } else {
                window.alert("Password reset failed at our end!");
                return false;
            }
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
    return false;
}

export const resetPassword = async (
    email: string,
    newPassword: string,
    type: string
) => {
    try {
        const response = await axios.post(
            `${config.uploadBaseUrl}/api/${type}/forgotPassword`,
            {
                email,
                newPassword,
            }
        );
        return true;
    } catch (error) {
        return false;
    }
};
