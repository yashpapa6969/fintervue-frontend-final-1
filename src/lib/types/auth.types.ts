export type User = {
    type: "interviewee" | "interviewer" | "null";
    user: Interviewee | Interviewer | null;
};

export type Interviewee = {
    firstName?: string;
    lastName?: string;
    interviewee_id?: string; // Defaults to uuidv4
    profilePic?: string;
    resume?: string;
    email: string; // Required and must be unique
    password?: string;
    linkedInProfile?: string; // Must match LinkedIn URL regex
    city?: string;
    preferredCity?: string;
    currentEmploymentStatus?:
        | "employed"
        | "unemployed"
        | "student"
        | "freelancer";
    expectedCompensation?: number;
    skills?: string[];
    preferredJobRoles?: string[];
    industry?: string;
    profileVisibility?: boolean; // Defaults to true
    anonymized?: boolean; // Defaults to false
    createdAt?: Date; // Defaults to Date.now
    updatedAt?: Date; // Defaults to Date.now
    otp?: string;
    otpExpires?: Date;
    emailVerified?: boolean; // Defaults to false
};

export type Interviewer = {
    firstName?: string;
    lastName?: string;
    interviewer_id?: string; // Defaults to uuidv4
    profilePic?: string;
    resume?: string;
    email: string; // Required and must be unique
    password?: string;
    linkedInProfile?: string; // Must match LinkedIn URL regex
    industryExpertise?: string[]; // Array of strings
    phoneNumber?: string;
    availability?: {
        availableDays?: (
            | "Monday"
            | "Tuesday"
            | "Wednesday"
            | "Thursday"
            | "Friday"
            | "Saturday"
            | "Sunday"
        )[];
        availableTimeSlots?: string[];
    };
    interviewsConducted?: string[]; // Array of ObjectId references to 'Interview'
    createdAt?: Date; // Defaults to Date.now
    updatedAt?: Date; // Defaults to Date.now
    otp?: string;
    otpExpires?: Date;
    emailVerified?: boolean; // Defaults to false
};
