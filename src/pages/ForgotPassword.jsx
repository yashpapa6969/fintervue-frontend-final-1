import React, { useState } from "react";
import { sendEmailClicked } from "../lib/services/forgotpw.auth";
import { useToast } from "@chakra-ui/react";
import Navbar from "../components/navbar";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    return (
        <>
            <Navbar />

            <div className="w-full h-[80vh] grid place-content-center">
                <form
                    className="w-[300px] flex flex-col gap-3 border-black border-2 p-5"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        setLoading(true);

                        const isSent = await sendEmailClicked(email);
                        
                        if (isSent) {
                            toast({
                                title: "Email sent",
                                description: "Check your inbox for the email.",
                                variant: "top-accent",
                                status: "success",
                                isClosable: true,
                            });
                        }

                        setLoading(false);
                    }}
                >
                    <h1 className="text-2xl font-bold">Enter your email:</h1>
                    <input
                        className="w-full p-2 border-2 border-black rounded-md"
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-full disabled:opacity-50"
                        disabled={loading}
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;

/* import React, { useState } from 'react';
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
import config from '../config';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStep(2);
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        alert("Error sending OTP: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again later.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP sent to your email.");
      return;
    }
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (response.ok) {
        setStep(3);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Both password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      if (response.ok) {
        alert('Password successfully changed!');
        navigate('/signup');
      } else {
        alert("Error resetting password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        {step === 1 && (
          <div className='flex flex-col items-center gap-3'>
            <h1 className='text-2xl font-bold '>Change your password </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Change</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change your password</DialogTitle>
                  <DialogDescription>
                    Provide your registered email address.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="xyz@gmail.com"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSendOtp}>
                    Get OTP
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-3">
            <h1 className="my-3 text-lg font-bold">Enter your OTP</h1>
            <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)}>
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
                    Add your new password.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="password" className="text-right">
                      New Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="confirm-password" className="text-right">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleResetPassword}>
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
 */
