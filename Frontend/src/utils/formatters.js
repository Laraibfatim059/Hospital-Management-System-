import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Normalizes input date string, timestamp or Date instance into a valid Date object.
 *
 * @param {string|number|Date} date
 * @returns {Date|null} Valid Date or null
 */
function normalizeDate(date) {
  if (!date) return null;
  if (date instanceof Date) {
    return isValid(date) ? date : null;
  }
  if (typeof date === 'string') {
    const parsed = parseISO(date);
    if (isValid(parsed)) return parsed;
    const fallback = new Date(date);
    return isValid(fallback) ? fallback : null;
  }
  if (typeof date === 'number') {
    const parsed = new Date(date);
    return isValid(parsed) ? parsed : null;
  }
  return null;
}

/**
 * Formats a date using date-fns format.
 *
 * @param {string|number|Date} date - Date to format
 * @param {string} [formatStr='MMM dd, yyyy'] - Formatting pattern
 * @returns {string} Formatted date string or empty string
 */
export function formatDate(date, formatStr = 'MMM dd, yyyy') {
  const d = normalizeDate(date);
  if (!d) return '';
  return format(d, formatStr);
}

/**
 * Formats a date and time as 'MMM dd, yyyy hh:mm a'.
 *
 * @param {string|number|Date} date
 * @returns {string} Formatted date-time string
 */
export function formatDateTime(date) {
  return formatDate(date, 'MMM dd, yyyy hh:mm a');
}

/**
 * Formats time portion as 'hh:mm a'.
 *
 * @param {string|number|Date} date
 * @returns {string} Formatted time string
 */
export function formatTime(date) {
  return formatDate(date, 'hh:mm a');
}

/**
 * Formats currency amount using Intl.NumberFormat.
 *
 * @param {number|string} amount - Monetary amount
 * @param {string} [currency='PKR'] - ISO currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'PKR') {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return `${currency} 0`;
  }
  const numericAmount = Number(amount);
  try {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    return `${currency} ${numericAmount.toLocaleString()}`;
  }
}

/**
 * Formats phone number with dashes.
 * Supports 11-digit Pakistani mobile numbers (0300-1234567), 10-digit numbers,
 * and 12-digit country code numbers (+92-300-1234567).
 *
 * @param {string|number} phone
 * @returns {string} Formatted phone string
 */
export function formatPhone(phone) {
  if (!phone) return '';
  const str = String(phone).trim();
  const digits = str.replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 12 && digits.startsWith('92')) {
    return `+92-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }
  return str;
}

/**
 * Formats full name from first and last names.
 *
 * @param {string} [firstName='']
 * @param {string} [lastName='']
 * @returns {string} 'FirstName LastName'
 */
export function formatName(firstName = '', lastName = '') {
  return [firstName, lastName]
    .filter(Boolean)
    .map((name) => String(name).trim())
    .join(' ');
}

/**
 * Extracts uppercase initials from full name.
 *
 * @param {string} name - Full name
 * @returns {string} Initials (e.g. 'JD')
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Returns human-readable relative time (e.g., '2 hours ago').
 *
 * @param {string|number|Date} date
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
  const d = normalizeDate(date);
  if (!d) return '';
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Truncates text with ellipsis if exceeding maxLength.
 *
 * @param {string} text - Input text
 * @param {number} [maxLength=50] - Maximum allowed characters
 * @returns {string} Truncated string
 */
export function truncateText(text, maxLength = 50) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}
