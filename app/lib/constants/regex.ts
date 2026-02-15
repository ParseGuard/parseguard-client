/**
 * Regular expression constants for validation
 * All regex patterns used across the application
 */

/**
 * Email validation regex
 * Matches standard email format: user@domain.com
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password strength patterns
 */
export const PASSWORD_PATTERNS = {
  /**
   * Uppercase letter pattern
   */
  UPPERCASE: /[A-Z]/,
  
  /**
   * Lowercase letter pattern
   */
  LOWERCASE: /[a-z]/,
  
  /**
   * Number pattern
   */
  NUMBER: /[0-9]/,
  
  /**
   * Special character pattern
   */
  SPECIAL: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
} as const;

/**
 * URL validation regex
 */
export const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Phone number regex (international format)
 */
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * Alphanumeric with spaces
 */
export const ALPHANUMERIC_SPACE_REGEX = /^[a-zA-Z0-9\s]+$/;

/**
 * Numbers only
 */
export const NUMBERS_ONLY_REGEX = /^\d+$/;
