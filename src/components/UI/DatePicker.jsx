import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Calander() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      label="날짜 선택"
        slotProps={{
          textField: {
            size: 'small',
            focused: false,
          },
        }}
        format="YYYY / MM / DD"
        sx={{
          // some styles
          ":hover": {
            // border: "1px solid red", 
          }
        }}
      />
    </LocalizationProvider>
  );
}
