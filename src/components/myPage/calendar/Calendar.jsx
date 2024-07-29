import * as React from 'react';
import './Calendar.css';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { TextField, Box, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered' && prop !== 'color',
})(({ theme, isSelected, isHovered, isStartDate, isEndDate, color }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: color,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: color,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(isStartDate && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isEndDate && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

const isInDateRange = (day, ranges) => {
  return ranges.some(({ startDate, endDate }) =>
    startDate && endDate && day.isBetween(startDate, endDate, null, '[]')
  );
};

function Day(props) {
  const { day, ranges, hoveredDay, onDayClick, ...other } = props;

  const range = ranges.find(({ startDate, endDate }) =>
    startDate && endDate && day.isBetween(startDate, endDate, null, '[]')
  );

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInDateRange(day, ranges)}
      isHovered={hoveredDay && isInDateRange(day, [{ startDate: hoveredDay, endDate: hoveredDay }])}
      isStartDate={range?.startDate && day.isSame(range.startDate, 'day')}
      isEndDate={range?.endDate && day.isSame(range.endDate, 'day')}
      color={range?.color || 'transparent'}
      onClick={() => onDayClick(day)}
    />
  );
}

export function Calendar() {
  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [ranges, setRanges] = React.useState([]);
  const [color, setColor] = React.useState('blue');
  const [startDateInput, setStartDateInput] = React.useState('');
  const [endDateInput, setEndDateInput] = React.useState('');
  const [selectedRange, setSelectedRange] = React.useState(null);
  const [popupOpen, setPopupOpen] = React.useState(false);

  const handleDateChange = (newValue) => {
    if (startDateInput && endDateInput) {
      // 이미 시작일과 종료일이 설정되어 있는 경우
      setStartDateInput(newValue.format('YYYY-MM-DD'));
      setEndDateInput(null);
    } else if (startDateInput && !endDateInput && newValue.isAfter(dayjs(startDateInput))) {
      setEndDateInput(newValue.format('YYYY-MM-DD'));
    } else {
      setStartDateInput(newValue.format('YYYY-MM-DD'));
    }
  };

  const handleSubmit = () => {
    const newStartDate = dayjs(startDateInput);
    const newEndDate = dayjs(endDateInput);

    if (newStartDate.isValid() && newEndDate.isValid() && newStartDate.isBefore(newEndDate)) {
      if (selectedRange) {
        // 기존 범위 업데이트
        setRanges(ranges.map((range) =>
          range === selectedRange
            ? { ...range, startDate: newStartDate, endDate: newEndDate, color }
            : range
        ));
        setSelectedRange(null);
      } else {
        // 새로운 범위 추가
        setRanges([...ranges, { startDate: newStartDate, endDate: newEndDate, color }]);
      }
      setStartDateInput('');
      setEndDateInput('');
    } else {
      alert('Invalid dates. Please ensure the start date is before the end date.');
    }
  };

  const handleDayClick = (day) => {
    const range = ranges.find(({ startDate, endDate }) =>
      startDate && endDate && day.isBetween(startDate, endDate, null, '[]')
    );

    if (range) {
      setStartDateInput(range.startDate.format('YYYY-MM-DD'));
      setEndDateInput(range.endDate.format('YYYY-MM-DD'));
      setColor(range.color);
      setSelectedRange(range);
    }
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='realCalender'>
      <Box>
        <DateCalendar 
          value={null}
          onChange={handleDateChange}
          showDaysOutsideCurrentMonth
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) => ({
              ranges,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
              onDayClick: handleDayClick,
            }),
          }}
        />
      </Box>
      <div className='realCalendar_Btns'>
        <svg 
         className='scheduleAdd_Btn' onClick={()=>{setPopupOpen(true)}}
        xmlns="http://www.w3.org/2000/svg" width="40" height="39" fill="none"><rect width="39.032" height="38.542" x=".04" y=".208" fill="#EE8F84" rx="19.271"/><path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M19.555 13.98v11M24.805 19.48h-10.5"/></svg>
      </div>
      </div>

      {popupOpen && (
        <div className='calendarPop_black' 
        onClick={()=>{setPopupOpen(false)}}></div>
      )}
      
      
      {popupOpen && (

     
      <div className='calendar_rangePopupDiv'>
        <div className='calendarPop_title'>
          <p>■ 표시 될 일정의 기간과 색을 정해주세요.</p>

        </div>

        <div className='calendarPop_range'>

        <Box sx={{ mt: 2 }}>

          <div className='calenderPop_date'>

          
          <TextField 
            label="Start Date"
            type="date"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mr: 2 }}
          />

          <TextField
            label="End Date"
            type="date"
            value={endDateInput}
            onChange={(e) => setEndDateInput(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mr: 2 }}
          />
          </div>

          <div className='calendarPop_colors'>

          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel id="color-select-label">Color</InputLabel>
            <Select
              labelId="color-select-label"
              id="color-select"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              label="Color"
            >
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
            </Select>
          </FormControl>
          </div>
          
          
        </Box>
        </div>


        <div className='calendarPop_Btn'>
        <Button variant="contained"  
        onClick={()=>{
          handleSubmit;
          setPopupOpen(false); 
          }}>
            {selectedRange ? '일정 수정하기' : '일정 추가하기'}
          </Button>
        </div>
        
      
        </div>
        )}
    </LocalizationProvider>
  );
}
