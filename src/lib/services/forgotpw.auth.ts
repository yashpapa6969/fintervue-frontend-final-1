import { sendPasswordResetEmail } from "supertokens-web-js/recipe/emailpassword";
import { submitNewPassword } from "supertokens-web-js/recipe/emailpassword";

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

export async function newPasswordEntered(newPassword: string) {
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
            window.location.assign("/auth"); // back to the login scree.
        } else {
            window.alert("Password reset successful!");
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