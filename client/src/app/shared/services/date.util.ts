const formatDateToLocalISOString = (dateValue: Date): string => {
  if (!dateValue || isNaN(dateValue.getTime())) throw new Error("Invalid date value");
  
  // Get the timezone offset in minutes and convert to milliseconds
  const tzOffset = dateValue.getTimezoneOffset() * 60000;
  
  // Adjust the date by adding the offset, then convert to ISO
  // This will make the UTC time match what would be the local time
  const localISOTime = new Date(dateValue.getTime() - tzOffset).toISOString();
  
  return localISOTime;
};

const combineDateAndTime= (date: Date | null, time: Date | null): Date | null=> {
   if(!date || !time) return null;

   const newDate = new Date(date);
   newDate.setHours(time.getHours());
   newDate.setMinutes(time.getMinutes()); 
   newDate.setSeconds(time.getSeconds()); 
   newDate.setMilliseconds(time.getMilliseconds()); 
   return newDate;
}

export {formatDateToLocalISOString,combineDateAndTime};