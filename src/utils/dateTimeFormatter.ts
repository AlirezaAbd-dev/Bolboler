const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    minute: '2-digit',
    hour: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
});

export default dateTimeFormatter;
