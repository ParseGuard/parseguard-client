import { EMAIL_REGEX, PASSWORD_PATTERNS } from '../constants/regex';

/**
 * Email validation result type
 */
export type EmailValidation = {
  isValid: boolean
  message?: string
}

/**
 * Password validation result type
 */
export type PasswordValidation = {
  isValid: boolean
  message?: string
  strength?: 'weak' | 'medium' | 'strong'
}

/**
 * Validate email format
 * 
 * @param email - Email address to validate
 * @returns Validation result with error message if invalid
 * @example
 * const result = validateEmail('user@example.com');
 * if (!result.isValid) console.error(result.message);
 */
export function validateEmail(email: string): EmailValidation {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  return { isValid: true };
}

/**
 * Validate password strength
 * 
 * @param password - Password to validate
 * @returns Validation result with strength indicator
 * @throws Never throws, always returns validation object
 * @example
 * const result = validatePassword('MyP@ssw0rd');
 * console.log(result.strength); // 'strong'
 */
export function validatePassword(password: string): PasswordValidation {
  if (!password || password.length < 8) {
    return { 
      isValid: false, 
      message: 'Password must be at least 8 characters',
      strength: 'weak'
    };
  }
  
  const hasUpper = PASSWORD_PATTERNS.UPPERCASE.test(password);
  const hasLower = PASSWORD_PATTERNS.LOWERCASE.test(password);
  const hasNumber = PASSWORD_PATTERNS.NUMBER.test(password);
  const hasSpecial = PASSWORD_PATTERNS.SPECIAL.test(password);
  
  const strengthScore = (hasUpper ? 1 : 0) + (hasLower ? 1 : 0) + 
                        (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);
  
  const strength = strengthScore >= 3 ? 'strong' : 
                   strengthScore >= 2 ? 'medium' : 'weak';
  
  return {
    isValid: true,
    strength,
    message: strength === 'weak' ? 'Password is weak. Add uppercase, numbers, and special characters.' : undefined
  };
}

/**
 * Validate required field
 * 
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateRequired(value: string, fieldName: string): { isValid: boolean; message?: string } {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
}

/**
 * Validate minimum length
 * 
 * @param value - Value to validate
 * @param minLength - Minimum required length
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateMinLength(
  value: string, 
  minLength: number, 
  fieldName: string
): { isValid: boolean; message?: string } {
  if (value.length < minLength) {
    return { 
      isValid: false, 
      message: `${fieldName} must be at least ${minLength} characters` 
    };
  }
  return { isValid: true };
}
