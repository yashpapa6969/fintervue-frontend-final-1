import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOpen, setIsOpen] = useState(true);
const navigate = useNavigate();
  // Function to handle "Send OTP" button
  const handleSendOtp = () => {
    // Code to send OTP to the email entered
    // Example: API call to backend to send OTP
    setStep(2);
  };

  // Function to handle "Verify OTP" button
  const handleVerifyOtp = () => {
    // Code to verify the OTP entered
    // Example: API call to verify OTP
    setStep(3);
  };

  // Function to handle "Reset Password" button
  const handleResetPassword = () => {
    // Code to reset the password
    // Example: API call to update the password
    alert("Password successfully changed!");
    navigate('/signup');
  };
 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        {step === 1 && (
          <div
          //onClick={handleSendOtp}
          className='flex flex-col gap-3 items-center'
          >
            <h1 className='text-2xl font-bold '>Change your password </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button  >Change</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change your password </DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Give your email addresss
                    through which you have registered to fintervue.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="Email"
                      defaultValue="xyz@gmail.com"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSendOtp}>
                    Get OTP
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3 items-center">
            <h1 className="font-bold text-lg my-3">Enter your OTP</h1>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button onClick={handleVerifyOtp} className="py-3 my-3">
              Verify OTP
            </Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change your password</DialogTitle>
                  <DialogDescription>
                    Add your new password for the current email address.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      New Password
                    </Label>
                    <Input
                      id="password"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="confirm-password" className="text-right">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleResetPassword}>
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
