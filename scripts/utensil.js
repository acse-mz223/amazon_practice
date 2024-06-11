export function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


