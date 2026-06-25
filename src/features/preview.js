import { calculateInvoice } from './calculations.js';
import { amountToGreekWords } from './number-to-words.js';

function splitDateParts(value) {
  if (!value) return { day: '', month: '', year: '' };
  const [year, month, day] = value.split('-');
  return {
    day: day ?? '',
    month: month ?? '',
    year: year ? year.slice(-2) : ''
  };
}

function formatDate(value) {
  const { day, month, year } = splitDateParts(value);
  return day && month && year ? `${day}/${month}/20${year}` : '';
}

function amountParts(value) {
  const cents = Math.round((Number(value) || 0) * 100);
  const euros = Math.floor(cents / 100);
  const remainder = Math.abs(cents % 100);

  return {
    euros: String(euros),
    cents: String(remainder).padStart(2, '0')
  };
}

function setOutput(key, value) {
  document.querySelectorAll(`[data-output="${key}"]`).forEach(element => {
    element.textContent = value || '';
  });
}

function getValue(id) {
  return document.getElementById(id)?.value.trim() ?? '';
}

export function renderPreview() {
  const calculation = calculateInvoice(getValue('netAmount'), getValue('vatRate'));
  const issueDateParts = splitDateParts(getValue('issueDate'));
  const netParts = amountParts(calculation.netAmount);
  const vatParts = amountParts(calculation.vatAmount);
  const grossParts = amountParts(calculation.grossAmount);

  const directValues = {
    invoiceNumber: getValue('invoiceNumber'),
    department: getValue('department'),
    chapterCode: getValue('chapterCode'),
    vatRegistration: getValue('vatRegistration'),
    issueDay: issueDateParts.day,
    issueMonth: issueDateParts.month,
    issueYear: issueDateParts.year,
    serviceAddress: getValue('serviceAddress'),
    debtorName: getValue('debtorName'),
    debtorTaxId: getValue('debtorTaxId'),
    debtorAddress: getValue('debtorAddress'),
    postalCode: getValue('postalCode'),
    phone: getValue('phone'),
    paymentType: getValue('paymentType'),
    description: getValue('description'),
    billingPeriod: getValue('billingPeriod'),
    signatoryName: getValue('signatoryName'),
    signDate: formatDate(getValue('signDate')),
    revenueAccount: getValue('revenueAccount'),
    vatRate: String(calculation.vatRate || '').replace(/\.0+$/, ''),
    netEuros: netParts.euros,
    netCents: netParts.cents,
    vatEuros: vatParts.euros,
    vatCents: vatParts.cents,
    grossEuros: grossParts.euros,
    grossCents: grossParts.cents,
    amountInWords: amountToGreekWords(calculation.grossAmount)
  };

  Object.entries(directValues).forEach(([key, value]) => setOutput(key, value));
}
