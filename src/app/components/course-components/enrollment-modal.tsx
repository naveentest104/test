"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, CreditCard, PayPal, Smartphone } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Course {
  title: string;
  description: string;
  duration: string;
  price: number;
  level: string;
  rating: number;
}

interface EnrollmentModalProps {
  course: Course;
  onClose: () => void;
}

const PaymentForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input id="expiry" placeholder="MM/YY" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="123" required />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Complete Enrollment
      </Button>
    </form>
  );
};

const UpiPaymentForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="upiId">UPI ID</Label>
        <Input id="upiId" placeholder="yourupi@example.com" required />
      </div>
      <Button type="submit" className="w-full">
        Complete Enrollment
      </Button>
    </form>
  );
};

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, onClose }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrolled(true);
    setTimeout(onClose, 2000); // Close after 2 seconds
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] font-san text-black">
        <DialogHeader>
          <DialogTitle className="text-black">
            {isEnrolled ? "Enrollment Successful!" : "Enroll in Course"}
          </DialogTitle>
          <DialogDescription className="text-black-300">
            {isEnrolled ? "You have successfully enrolled in the course." : "Complete your enrollment for:"}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!isEnrolled ? (
            <motion.div
              key="enrollmentForm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4">
                <h3 className="font-semibold text-black">{course.title}</h3>
                <p className="text-sm text-gray-400">{course.description}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-400">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                  <span>★ {course.rating.toFixed(1)}</span>
                </div>
                <p className="mt-2 text-lg font-bold text-black">${course.price.toFixed(2)}</p>
              </div>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="creditCard" id="creditCard" />
                  <Label htmlFor="creditCard" className="text-black">Credit Card</Label>
                  <CreditCard className="ml-auto h-4 w-4 text-black" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="text-black">UPI</Label>
                  <Smartphone className="ml-auto h-4 w-4 text-black" />
                </div>
              </RadioGroup>
              {paymentMethod === "creditCard" && <PaymentForm onSubmit={handleEnrollment} />}
              {paymentMethod === "upi" && <UpiPaymentForm onSubmit={handleEnrollment} />}
            </motion.div>
          ) : (
            <motion.div
              key="enrollmentSuccess"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <p className="mt-4 text-lg font-semibold text-white">You're all set!</p>
              <p className="mt-2 text-sm text-gray-400">Your course begins on {new Date().toLocaleDateString()}</p>
              <Button className="mt-4">Start Learning</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;
