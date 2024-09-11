import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import DragAndDropUpload from "./dragAndDropUpload";

const InterviewerSignupForm = ({ formData, handleChange, errors }) => {

    const handleResumeUpload = (e) => {
        const resumeFile = e.target.files[0];
        // TODO: Handle resume upload api integration
        const resumeURL = "temp resume file url";
        handleChange("resume", resumeURL);
    };

    return (
        <div className="flex flex-col gap-4 px-4 md:px-6 lg:px-8 w-full m-auto">
            <div className="flex flex-col text-center pb-5">
                <h3 className="font-bold text-2xl md:text-3xl text-[rgba(51,51,51,1)] ">
                    Complete your Fintervue Profile
                </h3>
                <p className="font-extralight text-md md:text-md pt-3">
                    Search & apply to finance jobs from here
                </p>
            </div>
            <div className="flex flex-row gap-5">
                <FormControl isInvalid={!!errors?.firstName} isRequired>
                    <FormLabel as="legend">Last Name</FormLabel>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                        <Input
                            className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
                            type="text"
                            name="firstname"
                            placeholder="What is your first name?"
                            value={formData?.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                    </InputGroup>
                    {errors?.firstName && (
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={!!errors?.lastName} isRequired>
                    <FormLabel as="legend">First Name</FormLabel>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                        <Input
                            className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
                            type="text"
                            name="lastName"
                            placeholder="What is your last name?"
                            value={formData?.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                    </InputGroup>
                    {errors?.lastName && (
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    )}
                </FormControl>
            </div>
            <div className="flex flex-row gap-5">
                <FormControl isInvalid={!!errors?.password} isRequired>
                    <FormLabel as="legend">Password</FormLabel>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                        <Input
                            className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
                            type="password"
                            name="password"
                            placeholder="What is your password?"
                            value={formData?.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                    </InputGroup>
                    {errors?.password && (
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={!!errors?.email} isRequired>
                    <FormLabel as="legend">Email</FormLabel>
                    <InputGroup display={"flex"} flexDirection={"column"}>
                        <Input
                            className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
                            type="text"
                            name="email"
                            placeholder="What is your email?"
                            value={formData?.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </InputGroup>
                    {errors?.email && (
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                </FormControl>
            </div>
            <FormControl isInvalid={!!errors?.linkedInProfile} isRequired>
                <FormLabel as="legend">Linkedin Url</FormLabel>
                <InputGroup display={"flex"} flexDirection={"column"}>
                    <Input
                        className="outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3"
                        type="text"
                        name="linkedInProfile"
                        placeholder="What is your linkedInProfile?"
                        value={formData?.linkedInProfile}
                        onChange={(e) => handleChange("linkedInProfile", e.target.value)}
                    />
                </InputGroup>
                {errors?.linkedInProfile && (
                    <FormErrorMessage>{errors.linkedInProfile}</FormErrorMessage>
                )}
            </FormControl>

            <DragAndDropUpload handleResumeUpload={handleResumeUpload} />
            
            <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="whatsapp_opt_in" />
                <label
                    htmlFor="whatsapp_opt_in"
                    className="text-md font-semibold text-gray-600"
                >
                    Send me important updates & promotions via SMS, email, and{" "}
                    <span className="text-green-500">WhatsApp</span>
                </label>
            </div>
        </div>
    );
};

export default InterviewerSignupForm;
