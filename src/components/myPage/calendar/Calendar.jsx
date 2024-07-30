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
          <div className='calendarPop_range'>
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
                    <svg  xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" stroke="#52565F" strokeLinecap="round" strokeWidth="2" d="M14.25 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667ZM26.75 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667Z"/><path fill="#52565F" fillRule="evenodd" d="M8.69 20.869a1.25 1.25 0 0 1 1.678.559c.959 1.918 4.476 4.309 10.132 4.309 5.655 0 9.173-2.391 10.132-4.31a1.25 1.25 0 1 1 2.236 1.119c-1.541 3.082-6.182 5.69-12.368 5.69-6.187 0-10.827-2.608-12.368-5.69a1.25 1.25 0 0 1 .559-1.677Z" clipRule="evenodd"/></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" fillRule="evenodd" d="M15.105 24.551a1.25 1.25 0 0 1 1.58.79c.504 1.51 1.86 2.896 3.815 2.896 1.955 0 3.311-1.386 3.814-2.895a1.25 1.25 0 1 1 2.372.79c-.747 2.241-2.878 4.605-6.186 4.605s-5.439-2.364-6.186-4.605a1.25 1.25 0 0 1 .79-1.581Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/><path fill="#52565F" fillRule="evenodd" d="M13 26.987c0-.69.56-1.25 1.25-1.25h12.5a1.25 1.25 0 1 1 0 2.5h-12.5c-.69 0-1.25-.56-1.25-1.25Z" clipRule="evenodd"/></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><path fill="#52565F" fillRule="evenodd" d="M16.31 26.907a1.25 1.25 0 0 0 1.61-.731c.31-.824 1.19-1.69 2.58-1.69 1.39 0 2.27.866 2.58 1.69a1.25 1.25 0 0 0 2.34-.878c-.628-1.676-2.362-3.311-4.92-3.311s-4.292 1.635-4.92 3.311a1.25 1.25 0 0 0 .73 1.61Z" clipRule="evenodd"/><path fill="#9FCBF6" fillRule="evenodd" d="M14.25 38.42a18.795 18.795 0 0 1-8.75-6.431V18.306h6.25l2.5-1.32V38.42ZM26.75 38.42a18.795 18.795 0 0 0 8.75-6.431V18.306h-6.25l-2.5-1.32V38.42Z" clipRule="evenodd"/><path fill="#52565F" fillRule="evenodd" d="M14.809 14.619a1.25 1.25 0 0 1 .559 1.677l-.559 1.118a3.75 3.75 0 0 1-3.354 2.073H6.75a1.25 1.25 0 0 1 0-2.5h4.705a1.25 1.25 0 0 0 1.118-.691l.559-1.118a1.25 1.25 0 0 1 1.677-.56ZM26.191 14.619a1.25 1.25 0 0 0-.559 1.677l.559 1.118a3.75 3.75 0 0 0 3.354 2.073h4.705a1.25 1.25 0 0 0 0-2.5h-4.705a1.25 1.25 0 0 1-1.118-.691l-.559-1.118a1.25 1.25 0 0 0-1.677-.56Z" clipRule="evenodd"/></svg>
                  </div>
                  <div className='todayEmojiDiv'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><path fill="#FF2D67" d="M1.75 20.737c0-10.355 8.395-18.75 18.75-18.75s18.75 8.395 18.75 18.75-8.395 18.75-18.75 18.75-18.75-8.395-18.75-18.75Z"/><path fill="#F70044" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><path fill="#000" fillRule="evenodd" d="M9.5 12.487a1.25 1.25 0 0 1 1.75-.25l5 3.75a1.25 1.25 0 0 1-.447 2.213l-5 1.25a1.25 1.25 0 0 1-.606-2.426l2.452-.613-2.9-2.174a1.25 1.25 0 0 1-.25-1.75ZM31.5 12.487a1.25 1.25 0 0 0-1.75-.25l-5 3.75a1.25 1.25 0 0 0 .447 2.213l5 1.25a1.25 1.25 0 0 0 .606-2.426l-2.452-.613 2.9-2.174a1.25 1.25 0 0 0 .25-1.75ZM13 23.97l3.75 3.75 3.75-3.75 3.75 3.75L28 23.97l4.634 4.633a1.25 1.25 0 0 1-1.768 1.768L28 27.505l-3.75 3.75-3.75-3.75-3.75 3.75-3.75-3.75-2.866 2.866a1.25 1.25 0 0 1-1.768-1.768L13 23.969Z" clipRule="evenodd"/><path fill="#CA0038" fillRule="evenodd" d="M24.645 9.551a1.25 1.25 0 0 1 .79 1.581l-1.25 3.75a1.25 1.25 0 0 1-2.371-.79l1.25-3.75a1.25 1.25 0 0 1 1.581-.791ZM16.355 9.551a1.25 1.25 0 0 0-.79 1.581l1.25 3.75a1.25 1.25 0 0 0 2.371-.79l-1.25-3.75a1.25 1.25 0 0 0-1.581-.791Z" clipRule="evenodd"/></svg>
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
