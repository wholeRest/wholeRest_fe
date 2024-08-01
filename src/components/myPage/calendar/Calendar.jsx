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


// 오늘 날짜를 yyyy-mm-dd 형식으로 반환하는 함수
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
const formatDate = (date) => {
  if (!date) return '';

  // date가 Date 객체가 아닌 경우, 이를 Date 객체로 변환 시도
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};



// 커스텀 PickersDay 컴포넌트
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
  const [nowDay, setNowDay ]= React.useState(getToday()); // 지금 선택된 날짜!
  const [hoveredDay, setHoveredDay] = React.useState(null); // 현재 마우스가 올라가 있는 날짜
  const [ranges, setRanges] = React.useState([]); // 선택된 날짜 범위(시작일과 종료일) 저장본
  const [color, setColor] = React.useState(''); // 선택된 범위의 색상
  const [startDateInput, setStartDateInput] = React.useState(''); // 입력받은 시작 날짜
  const [endDateInput, setEndDateInput] = React.useState(''); // 입력받은 종료 날짜
  const [selectedRange, setSelectedRange] = React.useState(null); // 현재 선택된 날짜 범위
  const [popupOpen_range, setPopupOpen_range] = React.useState(false); // 날짜 선택 팝업 눌렀나





  // nowDay가 변경될 때마다 콘솔에 출력 : 보여줄 날짜는 여기서 가져와야할듯. 
  React.useEffect(() => {
    console.log('선택된 날짜:', nowDay); // nowDay는 yyyy-mm-dd 형식 문자열
  }, [nowDay]);

  


  const handleDateChange = (newValue) => {
    if (startDateInput && endDateInput) {
      // 이미 시작일과 종료일이 설정되어 있는 경우
      setStartDateInput(newValue.format('YYYY-MM-DD'));
      setEndDateInput('');
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


  // 일정 삭제 함수 추가
  const handleDelete = () => {
    if (selectedRange) {
      setRanges(ranges.filter((range) => range !== selectedRange));
      setSelectedRange(null);
      setStartDateInput('');
      setEndDateInput('');
      setPopupOpen_range(false);
    }
  };
 

  const handleDayClick = (day) => {
    const formattedDate = formatDate(day);
    setNowDay(formattedDate);
    // console.log("클릭한 날짜: " + nowDay); // 클릭한 날짜: 이건 전에 선택한게 나옴..
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
            

          <svg 
            className='scheduleAdd_Btn' onClick={() => setPopupOpen_range(true)}
            xmlns="http://www.w3.org/2000/svg" width="40" height="39" fill="none"><rect width="39.032" height="38.542" x=".04" y=".208" fill="#EE8F84" rx="19.271"/><path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M19.555 13.98v11M24.805 19.48h-10.5"/>
          </svg>
        </div>
      </div>

      {popupOpen_range && (
        <div className='calendarPop_black' onClick={() => setPopupOpen_range(false)}></div>
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
                  value={startDateInput || ''}
                  onChange={(e) => setStartDateInput(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mr: 2 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDateInput || ''}
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
                  style={{ backgroundColor: '#AFAFAF', border: color === '#AFAFAF' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#AFAFAF')}
                ></div>



              </div>
            </Box>
          </div>
          <div className='calendarPop_Btn'>
            <Button className='deleteBtn' variant="contained" color="error" onClick={handleDelete} >
              일정 삭제하기
            </Button>
            
            <Button variant="contained" onClick={handleSubmit}>
              {selectedRange ? '일정 수정하기' : '일정 등록하기'}
            </Button>

            
          </div>
        </div>
 




    </LocalizationProvider>
  );
}




