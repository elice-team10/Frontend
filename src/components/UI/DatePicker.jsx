import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

export default function Calander() {
  const [date, setDate] = useState('');

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    >
      <DatePicker
        format="YYYY / MM / DD"
        value={date}
        onChange={(newDate) => {
          console.log(newDate.format("YYYY-MM-DD"));
          setDate(newDate.format("YYYY-MM-DD"));
        }}
        label="날짜 선택"
        slotProps={{
          textField: {
            size: 'small',
            focused: false,
          },
        }}
      />
    </LocalizationProvider>
  );
}
