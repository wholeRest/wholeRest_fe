import * as React from 'react';
import './Calendar.css';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { TextField, Box, Button } from '@mui/material';




dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'isSelected' && prop !== 'isHovered' && prop !== 'isStartDate' && prop !== 'isEndDate' && prop !== 'color',
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
  const [popupOpen_range, setPopupOpen_range] = React.useState(false);
  const [popupOpen_emoji, setPopupOpen_emoji] = React.useState(false);

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
      setPopupOpen_range(false); // 팝업을 닫음 
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
      setPopupOpen_range(true); // 팝업을 엶 
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
            <label
            className='emojiAdd_Btn' 
            onClick={()=> setPopupOpen_emoji(true)}
            >ㅇ</label>

          <svg 
            className='scheduleAdd_Btn' onClick={() => setPopupOpen_range(true)}
            xmlns="http://www.w3.org/2000/svg" width="40" height="39" fill="none"><rect width="39.032" height="38.542" x=".04" y=".208" fill="#EE8F84" rx="19.271"/><path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M19.555 13.98v11M24.805 19.48h-10.5"/>
          </svg>
        </div>
      </div>

      {popupOpen_range && (
        <div className='calendarPop_black' onClick={() => setPopupOpen_range(false)}></div>
      )}

    {popupOpen_emoji && (
        <div className='calendarPop_black' onClick={() => setPopupOpen_emoji(false)}></div>
      )}
      


      {/* 일정 추가 팝업 내용 */}
      
        <div className={`calendar_rangePopupDiv ${popupOpen_range ? 'checked' : ''}`}>
          <div className='calendarPop_title'>
            <p>■ 표시 될 일정의 기간과 색을 정해주세요.</p>
            <label onClick={() => setPopupOpen_range(false)}>X</label>
          </div>
          <div className="calendarPop_range">
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
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FF2D67', border: color === '#FF2D67' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FF2D67')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FF7979', border: color === '#FF7979' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FF7979')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FF7C3F', border: color === '#FF7C3F' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FF7C3F')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#F7A782', border: color === '#F7A782' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#F7A782')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FFE14F', border: color === '#FFE14F' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FFE14F')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#4B9647', border: color === '#4B9647' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#4B9647')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#6FC0EE', border: color === '#6FC0EE' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#6FC0EE')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#40300E', border: color === '#40300E' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#40300E')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FFFFFF', border: color === '#FFFFFF' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FFFFFF')}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#AFAFAF', border: color === '#AFAFAF' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#AFAFAF')}
                ></div>
              </div>
            </Box>
          </div>
          <div className='calendarPop_Btn'>
            <Button variant="contained" onClick={handleSubmit}>
              {selectedRange ? '일정 수정하기' : '일정 등록하기'}
            </Button>
          </div>
        </div>
      


      {/* 이모지 추가 팝업 내용 */} 
     
        <div className={`calendar_rangePopupDiv ${popupOpen_emoji ? 'checked' : ''}`}>
          <div className='calendarPop_title'>
            <p>■ 이날 표시할 이모지를 선택해주세요.</p>
            <label onClick={() => setPopupOpen_emoji(false)}>X</label>
          </div>
          <div className='calendarPop_emoji'>
            <Box sx={{ mt: 2 }}>
              
              <div className='calendarPop_emojis'>

                <div className='todayEmoji_up'>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><g filter="url(#a)"><path fill="#FF2D67" d="M15.055 2.167 13.571 5.2a21.277 21.277 0 0 1-4.203 5.828l-.195.184a5.785 5.785 0 0 0-1.755 4.085v.195a7.432 7.432 0 0 0 4.55 6.922l.281.12a7.302 7.302 0 0 0 5.71 0h.065a7.583 7.583 0 0 0 4.56-7.053v-4.702a9.35 9.35 0 0 1-4.755 4.789h-.065c-.065 0-.824.314-1.149 0a.824.824 0 0 1-.065-1.084l.076-.054h.054a5.893 5.893 0 0 0 1.322-7.984c-1.408-2.145-2.947-4.28-2.947-4.28Z"/></g><defs><filter id="a" width="30" height="30" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5936"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5936" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" fill="none"><g filter="url(#a)"><path fill="#FF7979" d="M10.473 17.393c.394.405.985.607 1.478.607.59 0 1.083-.202 1.576-.506 3.112-2.857 4.741-4.349 5.593-5.128.685-.627.866-.793.91-.838l.098-.101C21.31 10.112 22 8.494 22 6.674v-.202C21.803 2.832 19.044 0 15.498 0c-1.084 0-2.66.607-3.547 1.82C11.064.607 9.586 0 8.502 0 4.956 0 2.1 2.831 2 6.472v.202c0 1.72.69 3.438 1.872 4.652l.098.101c0 .101.099.202 6.503 5.966Z"/></g><defs><filter id="a" width="24" height="22" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5939"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5939" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" fill="none"><g filter="url(#a)"><path fill="url(#b)" d="M10 7c2.8-4.4 3.5-4.833 3.5-4.5H15c.5.833 2.2 3.7 5 8.5s2.5 7 2 7.5c-.5.333-2.9 1.1-8.5 1.5-7 .5-8.5-1.5-9-3.5s2-4 5.5-9.5Z"/><path fill="#40300E" fillRule="evenodd" d="M10.19 4.08A3.94 3.94 0 0 1 13.67 2a4 4 0 0 1 3.55 2.1l5.64 10.44a4 4 0 0 1-3.52 5.9H8a4 4 0 0 1-3.51-5.92l5.7-10.44Zm5.68.73a2.48 2.48 0 0 0-4.37-.01L5.81 15.22A2.49 2.49 0 0 0 8 18.91h11.34a2.51 2.51 0 0 0 2.2-3.69L15.87 4.81Z" clipRule="evenodd"/><path fill="#40300E" d="M13.67 14a.75.75 0 0 0 0 1.5.74.74 0 0 0 .75-.75.74.74 0 0 0-.75-.74V14ZM13.67 12.63a.76.76 0 0 1-.75-.75v-3.1a.75.75 0 0 1 1.5 0v3.1a.75.75 0 0 1-.75.75Z"/></g><defs><linearGradient id="b" x1="4.437" x2="22.327" y1="11.245" y2="11.245" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE14F"/><stop offset=".514" stopColor="#FFE14F"/></linearGradient><filter id="a" width="28" height="28" x="-2" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5940"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5940" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="none"><g filter="url(#a)"><path fill="#6FC0EE" d="M5.5 5c-4.4 4.4-2.5 9.833-1 12l-1 2 .5 1.5c2.167 1 7.9 1.8 13.5-3s2.333-10.333 0-12.5C15.333 3.167 9.9.6 5.5 5Z"/><path fill="#40300E" fillRule="evenodd" d="M9.5 2.22A9.849 9.849 0 0 1 11.57 2a9.61 9.61 0 0 1 9.57 10.9c-.6 4.6-5.14 8.32-9.78 8.32H4.7a1.61 1.61 0 0 1-1.42-2.37l.27-.52a1.59 1.59 0 0 0-.05-1.59 9.6 9.6 0 0 1 6-14.52Zm1.78 17.49a8.57 8.57 0 0 0 8.29-7 8 8 0 0 0-1.91-6.44 8.1 8.1 0 0 0-6.09-2.77 8.86 8.86 0 0 0-1.76.18 8.11 8.11 0 0 0-5.1 12.24c.598.94.64 2.13.11 3.11l-.27.51a.1.1 0 0 0 0 .11c.04.06.1.06.1.06h6.63Z" clipRule="evenodd"/></g><defs><filter id="a" width="28" height="28" x="-2" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5943"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5943" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none"><g filter="url(#a)"><circle cx="12.5" cy="13.5" r="8.5" fill="#fff"/><path fill="#40300E" fillRule="evenodd" d="M2.657 13.357a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm1.5 0a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0Z" clipRule="evenodd"/><path fill="#40300E" d="M9.307 9.547a.75.75 0 0 0-1.06 1.06l2.66 2.66v4.09a.75.75 0 0 0 1.5 0v-4.4a.75.75 0 0 0-.22-.53l-2.88-2.88ZM21.187 5.857a11.92 11.92 0 0 0-4.76-3.77.75.75 0 0 0-1 .39.74.74 0 0 0 .39 1 10.48 10.48 0 0 1 4.16 3.3.75.75 0 0 0 1.05.15.75.75 0 0 0 .16-1.07ZM3.327 6.757a10.48 10.48 0 0 1 4.16-3.3.74.74 0 0 0 .39-1 .75.75 0 0 0-1-.39 11.92 11.92 0 0 0-4.75 3.79.75.75 0 0 0 .15 1 .74.74 0 0 0 .45.15.75.75 0 0 0 .6-.25Z"/></g><defs><filter id="a" width="28" height="28" x="-1" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5946"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5946" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none"><g filter="url(#a)"><path fill="#98BB85" fillRule="evenodd" d="M11.667 1a2 2 0 0 0-2 2v3.667a1 1 0 0 1-1 1H5a2 2 0 0 0-2 2v2.666a2 2 0 0 0 2 2h3.667a1 1 0 0 1 1 1V19a2 2 0 0 0 2 2h2.666a2 2 0 0 0 2-2v-3.667a1 1 0 0 1 1-1H21a2 2 0 0 0 2-2V9.667a2 2 0 0 0-2-2h-3.667a1 1 0 0 1-1-1V3a2 2 0 0 0-2-2h-2.666Z" clipRule="evenodd"/><path fill="#40300E" d="M5 7.667v.75-.75Zm16 0v-.75.75ZM10.417 3c0-.69.56-1.25 1.25-1.25V.25A2.75 2.75 0 0 0 8.917 3h1.5Zm0 3.667V3h-1.5v3.667h1.5ZM5 8.417h3.667v-1.5H5v1.5Zm-1.25 1.25c0-.69.56-1.25 1.25-1.25v-1.5a2.75 2.75 0 0 0-2.75 2.75h1.5Zm0 2.666V9.667h-1.5v2.666h1.5ZM5 13.583c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 5 15.083v-1.5Zm3.667 0H5v1.5h3.667v-1.5ZM10.417 19v-3.667h-1.5V19h1.5Zm1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1.5a2.75 2.75 0 0 0 2.75 2.75v-1.5Zm2.666 0h-2.666v1.5h2.666v-1.5Zm1.25-1.25c0 .69-.56 1.25-1.25 1.25v1.5a2.75 2.75 0 0 0 2.75-2.75h-1.5Zm0-3.667V19h1.5v-3.667h-1.5ZM21 13.583h-3.667v1.5H21v-1.5Zm1.25-1.25c0 .69-.56 1.25-1.25 1.25v1.5a2.75 2.75 0 0 0 2.75-2.75h-1.5Zm0-2.666v2.666h1.5V9.667h-1.5ZM21 8.417c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 21 6.917v1.5Zm-3.667 0H21v-1.5h-3.667v1.5ZM15.583 3v3.667h1.5V3h-1.5Zm-1.25-1.25c.69 0 1.25.56 1.25 1.25h1.5a2.75 2.75 0 0 0-2.75-2.75v1.5Zm-2.666 0h2.666V.25h-2.666v1.5Zm5.666 5.167a.25.25 0 0 1-.25-.25h-1.5c0 .966.784 1.75 1.75 1.75v-1.5Zm-.25 8.416a.25.25 0 0 1 .25-.25v-1.5a1.75 1.75 0 0 0-1.75 1.75h1.5Zm-8.416-.25a.25.25 0 0 1 .25.25h1.5a1.75 1.75 0 0 0-1.75-1.75v1.5Zm.25-8.416a.25.25 0 0 1-.25.25v1.5a1.75 1.75 0 0 0 1.75-1.75h-1.5Z"/></g><defs><filter id="a" width="25.5" height="25.5" x=".25" y=".25" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5949"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5949" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" fill="none"><g filter="url(#a)"><path fill="url(#b)" stroke="#40300E" strokeWidth="1.5" d="M12.418 4.79C13.512 2.209 14.059.918 15 .918c.94 0 1.488 1.29 2.582 3.874l.051.12c.619 1.459.928 2.188 1.558 2.632.63.443 1.457.513 3.11.654l.3.025c2.707.23 4.06.344 4.35 1.16.29.815-.716 1.68-2.726 3.412l-.67.578c-1.019.876-1.527 1.314-1.765 1.889a2.54 2.54 0 0 0-.11.328c-.155.6-.006 1.235.291 2.506l.093.396c.548 2.337.822 3.505.344 4.01-.179.188-.411.323-.67.39-.69.178-1.67-.578-3.63-2.09-1.287-.993-1.93-1.49-2.67-1.6a2.94 2.94 0 0 0-.877 0c-.739.11-1.382.607-2.67 1.6-1.96 1.512-2.94 2.268-3.63 2.09a1.405 1.405 0 0 1-.669-.39c-.478-.505-.204-1.673.344-4.01l.093-.396c.298-1.271.447-1.907.29-2.506a2.531 2.531 0 0 0-.11-.328c-.237-.575-.745-1.013-1.763-1.89l-.671-.577c-2.01-1.732-3.016-2.597-2.726-3.413.29-.815 1.643-.93 4.35-1.159l.3-.025c1.653-.14 2.48-.21 3.11-.654.63-.444.94-1.173 1.558-2.632l.05-.12Z"/></g><defs><linearGradient id="b" x1="3" x2="27" y1="11.917" y2="11.917" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE14F"/><stop offset=".514" stopColor="#FFE14F"/></linearGradient><filter id="a" width="29.503" height="27.667" x=".249" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5952"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5952" result="shape"/></filter></defs></svg>
                  </div>
                </div>

                <div className='todayEmoji_down'>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g filter="url(#a)"><rect width="22.5" height="22.5" x="2.75" y=".75" fill="#FFE14F" rx="11.25"/><path fill="#FFD04C" fillRule="evenodd" d="M2.806 10.875c-.037.37-.056.745-.056 1.125 0 6.213 5.037 11.25 11.25 11.25S25.25 18.213 25.25 12c0-.38-.019-.755-.055-1.125C24.63 16.56 19.834 21 14 21 8.166 21 3.37 16.56 2.806 10.875Z" clipRule="evenodd"/><circle cx="6.125" cy="9.375" r="1.875" fill="#FF759B" fillOpacity=".2"/><circle cx="21.875" cy="9.375" r="1.875" fill="#FF759B" fillOpacity=".2"/><mask id="b" fill="#fff"><path fillRule="evenodd" d="M10.25 7.333c-.533 0-.964.448-.964 1A.655.655 0 0 1 8.643 9 .655.655 0 0 1 8 8.333C8 7.045 9.007 6 10.25 6s2.25 1.045 2.25 2.333a.655.655 0 0 1-.643.667.655.655 0 0 1-.643-.667c0-.552-.431-1-.964-1Z" clipRule="evenodd"/></mask><path fill="#52565F" fillRule="evenodd" d="M10.25 7.333c-.533 0-.964.448-.964 1A.655.655 0 0 1 8.643 9 .655.655 0 0 1 8 8.333C8 7.045 9.007 6 10.25 6s2.25 1.045 2.25 2.333a.655.655 0 0 1-.643.667.655.655 0 0 1-.643-.667c0-.552-.431-1-.964-1Z" clipRule="evenodd"/><path fill="#52565F" d="M11.286 8.333c0 .483-.396 1-1.036 1v-4c-1.705 0-2.964 1.413-2.964 3h4ZM8.643 11c1.527 0 2.643-1.263 2.643-2.667h-4c0-.667.54-1.333 1.357-1.333v4ZM6 8.333C6 9.737 7.115 11 8.643 11V7C9.46 7 10 7.666 10 8.333H6ZM10.25 4C7.835 4 6 6.01 6 8.333h4c0-.116.044-.204.099-.261A.205.205 0 0 1 10.25 8V4Zm4.25 4.333C14.5 6.01 12.665 4 10.25 4v4c.045 0 .098.016.151.072a.371.371 0 0 1 .099.261h4ZM11.857 11c1.528 0 2.643-1.263 2.643-2.667h-4c0-.667.54-1.333 1.357-1.333v4ZM9.214 8.333C9.214 9.737 10.33 11 11.857 11V7c.818 0 1.357.666 1.357 1.333h-4Zm1.036 1c-.64 0-1.036-.517-1.036-1h4c0-1.587-1.259-3-2.964-3v4Z" mask="url(#b)"/><mask id="c" fill="#fff"><path fillRule="evenodd" d="M17.75 7.333c-.533 0-.964.448-.964 1a.655.655 0 0 1-.643.667.655.655 0 0 1-.643-.667C15.5 7.045 16.507 6 17.75 6S20 7.045 20 8.333a.655.655 0 0 1-.643.667.655.655 0 0 1-.643-.667c0-.552-.431-1-.964-1Z" clipRule="evenodd"/></mask><path fill="#52565F" fillRule="evenodd" d="M17.75 7.333c-.533 0-.964.448-.964 1a.655.655 0 0 1-.643.667.655.655 0 0 1-.643-.667C15.5 7.045 16.507 6 17.75 6S20 7.045 20 8.333a.655.655 0 0 1-.643.667.655.655 0 0 1-.643-.667c0-.552-.431-1-.964-1Z" clipRule="evenodd"/><path fill="#52565F" d="M18.786 8.333c0 .483-.396 1-1.036 1v-4c-1.705 0-2.964 1.413-2.964 3h4ZM16.143 11c1.527 0 2.643-1.263 2.643-2.667h-4c0-.667.54-1.333 1.357-1.333v4ZM13.5 8.333C13.5 9.737 14.615 11 16.143 11V7c.817 0 1.357.666 1.357 1.333h-4ZM17.75 4c-2.415 0-4.25 2.01-4.25 4.333h4c0-.116.044-.204.099-.261A.205.205 0 0 1 17.75 8V4ZM22 8.333C22 6.01 20.165 4 17.75 4v4c.045 0 .098.016.151.072a.371.371 0 0 1 .099.261h4ZM19.357 11C20.885 11 22 9.737 22 8.333h-4C18 7.666 18.54 7 19.357 7v4Zm-2.643-2.667c0 1.404 1.116 2.667 2.643 2.667V7c.818 0 1.357.666 1.357 1.333h-4Zm1.036 1c-.64 0-1.036-.517-1.036-1h4c0-1.587-1.259-3-2.964-3v4Z" mask="url(#c)"/><path fill="#52565F" fillRule="evenodd" d="M6.915 12.08a.75.75 0 0 1 1.006.335c.575 1.15 2.686 2.585 6.08 2.585 3.393 0 5.503-1.435 6.078-2.585a.75.75 0 0 1 1.342.67c-.925 1.85-3.709 3.415-7.42 3.415-3.713 0-6.497-1.565-7.422-3.415a.75.75 0 0 1 .336-1.006Z" clipRule="evenodd"/></g><defs><filter id="a" width="28" height="28" x="0" y="0" color-interpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5953"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5953" result="shape"/></filter></defs></svg>                  </div>
                  <div className='todayEmojiDiv'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g filter="url(#a)"><rect width="22.5" height="22.5" x="2.75" y=".75" fill="#FFE14F" rx="11.25"/><path fill="#FFD04C" fillRule="evenodd" d="M2.806 10.875c-.037.37-.056.745-.056 1.125 0 6.213 5.037 11.25 11.25 11.25S25.25 18.213 25.25 12c0-.38-.019-.755-.055-1.125C24.63 16.56 19.834 21 14 21 8.166 21 3.37 16.56 2.806 10.875Z" clipRule="evenodd"/><circle cx="6.125" cy="12.375" r="1.875" fill="#FF759B" fillOpacity=".2"/><circle cx="21.875" cy="12.375" r="1.875" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" fillRule="evenodd" d="M10.763 14.288a.75.75 0 0 1 .949.475c.302.905 1.115 1.737 2.288 1.737 1.174 0 1.987-.832 2.289-1.737a.75.75 0 0 1 1.423.474C17.264 16.582 15.985 18 14 18c-1.984 0-3.263-1.418-3.711-2.763a.75.75 0 0 1 .474-.949Z" clipRule="evenodd"/><circle cx="10.25" cy="9.75" r="1.5" fill="#52565F"/><circle cx="17.75" cy="9.75" r="1.5" fill="#52565F"/></g><defs><filter id="a" width="28" height="28" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5954"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5954" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g filter="url(#a)"><rect width="22.5" height="22.5" x="2.75" y=".75" fill="#FFE14F" rx="11.25"/><path fill="#FFD04C" fillRule="evenodd" d="M2.806 10.875c-.037.37-.056.745-.056 1.125 0 6.213 5.037 11.25 11.25 11.25S25.25 18.213 25.25 12c0-.38-.019-.755-.055-1.125C24.63 16.56 19.834 21 14 21 8.166 21 3.37 16.56 2.806 10.875Z" clipRule="evenodd"/><circle cx="10.25" cy="9.75" r="1.5" fill="#52565F"/><circle cx="17.75" cy="9.75" r="1.5" fill="#52565F"/><path fill="#52565F" fillRule="evenodd" d="M9.5 15.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd"/></g><defs><filter id="a" width="28" height="28" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5955"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5955" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g filter="url(#a)"><rect width="22.5" height="22.5" x="2.75" y=".75" fill="#FFE14F" rx="11.25"/><path fill="#FFD04C" fillRule="evenodd" d="M2.806 10.875c-.037.37-.056.745-.056 1.125 0 6.213 5.037 11.25 11.25 11.25S25.25 18.213 25.25 12c0-.38-.019-.755-.055-1.125C24.63 16.56 19.834 21 14 21 8.166 21 3.37 16.56 2.806 10.875Z" clipRule="evenodd"/><path fill="#52565F" fillRule="evenodd" d="M11.487 15.702a.75.75 0 0 0 .966-.439c.185-.494.714-1.013 1.547-1.013.834 0 1.363.519 1.548 1.013a.75.75 0 1 0 1.405-.526C16.575 13.73 15.535 12.75 14 12.75s-2.575.981-2.952 1.987a.75.75 0 0 0 .439.965Z" clipRule="evenodd"/><path fill="#9FCBF6" fillRule="evenodd" d="M10.25 22.61A11.278 11.278 0 0 1 5 18.75v-8.21h3.75l1.5-.791v12.86ZM17.75 22.61A11.277 11.277 0 0 0 23 18.75v-8.21h-3.75l-1.5-.791v12.86Z" clipRule="evenodd"/><path fill="#52565F" fillRule="evenodd" d="M10.585 8.33a.75.75 0 0 1 .336 1.005l-.336.671a2.25 2.25 0 0 1-2.012 1.244H5.75a.75.75 0 1 1 0-1.5h2.823a.75.75 0 0 0 .67-.415l.336-.67a.75.75 0 0 1 1.006-.336ZM17.415 8.33a.75.75 0 0 0-.336 1.005l.336.671a2.25 2.25 0 0 0 2.012 1.244h2.823a.75.75 0 1 0 0-1.5h-2.823a.75.75 0 0 1-.67-.415l-.336-.67a.75.75 0 0 0-1.006-.336Z" clipRule="evenodd"/></g><defs><filter id="a" width="28" height="28" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5956"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5956" result="shape"/></filter></defs></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g filter="url(#a)"><path fill="#FF2D67" d="M2.75 12C2.75 5.787 7.787.75 14 .75S25.25 5.787 25.25 12 20.213 23.25 14 23.25 2.75 18.213 2.75 12Z"/><path fill="#F70044" fillRule="evenodd" d="M2.806 10.875c-.037.37-.056.745-.056 1.125 0 6.213 5.037 11.25 11.25 11.25S25.25 18.213 25.25 12c0-.38-.019-.755-.055-1.125C24.63 16.56 19.834 21 14 21 8.166 21 3.37 16.56 2.806 10.875Z" clipRule="evenodd"/><path fill="#000" fillRule="evenodd" d="M7.4 7.05a.75.75 0 0 1 1.05-.15l3 2.25a.75.75 0 0 1-.268 1.328l-3 .75a.75.75 0 0 1-.364-1.456l1.472-.367L7.55 8.1a.75.75 0 0 1-.15-1.05ZM20.6 7.05a.75.75 0 0 0-1.05-.15l-3 2.25a.75.75 0 0 0 .268 1.328l3 .75a.75.75 0 0 0 .364-1.456l-1.472-.367L20.45 8.1a.75.75 0 0 0 .15-1.05ZM9.5 13.94l2.25 2.25L14 13.94l2.25 2.25 2.25-2.25 2.78 2.78a.75.75 0 1 1-1.06 1.06l-1.72-1.72-2.25 2.25L14 16.06l-2.25 2.25-2.25-2.25-1.72 1.72a.75.75 0 0 1-1.06-1.06l2.78-2.78Z" clipRule="evenodd"/><path fill="#CA0038" fillRule="evenodd" d="M16.487 5.288a.75.75 0 0 1 .475.95l-.75 2.25a.75.75 0 1 1-1.423-.475l.75-2.25a.75.75 0 0 1 .948-.475ZM11.513 5.288a.75.75 0 0 0-.475.95l.75 2.25a.75.75 0 1 0 1.423-.475l-.75-2.25a.75.75 0 0 0-.948-.475Z" clipRule="evenodd"/></g><defs><filter id="a" width="28" height="28" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_567_5957"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_567_5957" result="shape"/></filter></defs></svg>
                  </div>
                </div>
              
                
              </div>
            </Box>
          </div>
          <div className='calendarPop_Btn'>
            <Button variant="contained" onClick={handleSubmit}>
              {selectedRange ? '이모지 수정하기' : '이모지 등록하기'}
            </Button>
          </div>
        </div>


    </LocalizationProvider>
  );
}
