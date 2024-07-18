import { CustomError } from "../errors/CustomError";

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\d{9,10}$/; 
    return phoneRegex.test(phone);
}

export function hasMinimumLetters(name: string): boolean {
    const letterRegex = /[a-zA-Z].*[a-zA-Z]/;
    return letterRegex.test(name);
}
export function isValidPassword(password: string): boolean {
    if (password.length < 8) {
        throw new CustomError('Password must be at least 8 characters long', 400);
    }
    const hasNumber = /\d/;
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!hasNumber.test(password)) {
        throw new CustomError('Password must contain at least one number', 400);
    }
    if (!hasLowerCase.test(password)) {
        throw new CustomError('Password must contain at least one lowercase letter', 400);
    }
    if (!hasUpperCase.test(password)) {
        throw new CustomError('Password must contain at least one uppercase letter', 400);
    }
    if (!hasSpecialChar.test(password)) {
        throw new CustomError('Password must contain at least one special character', 400);
    }

    return true;
}

export function isValidServiceCost(serviceCost: number): boolean {
    return serviceCost>=50;
}

export function isValidServiceDuration(serviceDuration: number): boolean {
   return serviceDuration>=10;
}

export function isValidMeetingDate(meetingDate:Date) :boolean {
    const meetingDateObj = new Date(meetingDate);
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2); // maximum allowed date is 2 years from now

    if (isNaN(meetingDateObj.getTime())) {
      throw new CustomError('Invalid meeting date',400);
    }
    if (meetingDateObj <= currentDate) {
      throw new CustomError('Meeting date must be in the future',400);
    }
    if (meetingDateObj > maxDate) {
      throw new CustomError('Meeting date is too far in the future',400);
    }
    
    return true;
}