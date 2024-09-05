const InterviewerSignupForm = ({ formData, handleChange }) => {

    const handleResumeUpload = (e) => {
        const resumeFile = e.target.files[0];
        // TODO: Handle resume upload api integration
        const resumeURL = "temp resume file url";
        handleChange("resume", resumeURL);
    };

    return (
        <div className="flex flex-col gap-4 px-4 md:px-6 lg:px-8 w-full m-auto ">
            <div className="flex flex-col text-center pb-5">
                <h3 className="font-bold text-2xl md:text-3xl text-[rgba(51,51,51,1)] ">
                    Complete your Fintervue Profile
                </h3>
                <p className="font-extralight text-md md:text-md pt-3">
                    Search & apply to finance jobs from here
                </p>
            </div>
            <div className="flex flex-row gap-5">
                <div>
                    <label
                        htmlFor="fname_input"
                        className="text-black font-medium text-lg leading-[24px] pb-2"
                    >
                        First name*
                    </label>
                    <input
                        className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
                        type="text"
                        id="fname_input"
                        name="firstname"
                        placeholder="What is your first name?"
                        value={formData?.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="email_input"
                        className="text-black font-medium text-lg leading-[24px] pb-2"
                    >
                        Last name*
                    </label>
                    <input
                        className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
                        type="text"
                        id="lastname_input"
                        name="email"
                        placeholder="What is your last name?"
                        value={formData?.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div>
                    <label
                        htmlFor="password_input"
                        className="text-black font-medium text-lg leading-[24px] pb-2"
                    >
                        Password*
                    </label>
                    <input
                        className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
                        type="password"
                        id="password_input"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="mob_input"
                        className="text-black font-medium text-lg leading-[24px] pb-2"
                    >
                        Email*
                    </label>
                    <input
                        className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
                        type="email"
                        id="email_input"
                        name="email"
                        placeholder="Enter your email"
                        value={formData?.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>
            </div>
            <label
                htmlFor="linkedin_input"
                className="text-black font-medium text-lg leading-[24px] pb-2"
            >
                LinkedIn Url*
            </label>
            <input
                className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
                type="url"
                id="linkedin_input"
                name="linkedin_input"
                placeholder="https://linkedin.com/"
                value={formData?.linkedInProfile}
                onChange={(e) => handleChange("linkedInProfile", e.target.value)}
            />

            <div className="flex gap-4 mb-4">
                <label
                    htmlFor="resume-upload"
                    className="bg-black text-white py-2 px-4 rounded-md cursor-pointer"
                >
                    Add your resume
                </label>
                <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeUpload}
                />
            </div>

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
