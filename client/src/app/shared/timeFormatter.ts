const minutesToHoursMinutes = (totalMins: number) => {
    const hours = Math.floor(totalMins / 60);
    const minutes = Math.round(totalMins % 60);
    return `${hours}h ${minutes}m`;
};

export { minutesToHoursMinutes };