const STATUS_PRESENTATION = {
  reserved: {
    label: 'ΠΡΟΣΧΕΔΙΟ / ΔΕΣΜΕΥΜΕΝΟ',
    className: 'invoice-status-reserved',
    accessibleLabel: 'Κατάσταση τιμολογίου: προσχέδιο, δεσμευμένο'
  },
  issued: {
    label: 'ΕΚΔΟΘΕΝ / ΕΓΚΥΡΟ',
    className: 'invoice-status-issued',
    accessibleLabel: 'Κατάσταση τιμολογίου: εκδοθέν, έγκυρο'
  },
  cancelled: {
    label: 'ΑΚΥΡΩΜΕΝΟ / ΑΚΥΡΟ',
    className: 'invoice-status-cancelled',
    accessibleLabel: 'Κατάσταση τιμολογίου: ακυρωμένο, άκυρο'
  }
};

export function normalizeInvoiceStatus(status) {
  return Object.prototype.hasOwnProperty.call(STATUS_PRESENTATION, status) ? status : 'issued';
}

export function getInvoiceStatusPresentation(status) {
  const normalizedStatus = normalizeInvoiceStatus(status);
  return {
    status: normalizedStatus,
    ...STATUS_PRESENTATION[normalizedStatus]
  };
}
