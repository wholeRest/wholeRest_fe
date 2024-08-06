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
import { authHttp } from '../../../axios/apiUrl';



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


const getCurrentMonth = (date) => {
  const year = date.year();
  const month = date.month() + 1; // month는 0부터 시작하므로 1을 더해줍니다
  return `${year}-${String(month).padStart(2, '0')}`;
};


export function Calendar(props) {
  const [testdays, setTestDays] = React.  useState([1, 2, 15]);
  const {nowDay, setNowDay} = props;
  
  const [hoveredDay, setHoveredDay] = React.useState(null); // 현재 마우스가 올라가 있는 날짜

  const [ranges, setRanges] = React.useState([]); // 선택된 날짜 범위(시작일과 종료일) 저장본

  const [color, setColor] = React.useState(''); // 선택된 범위의 색상
  const [startDateInput, setStartDateInput] = React.useState(''); // 입력받은 시작 날짜
  const [endDateInput, setEndDateInput] = React.useState(''); // 입력받은 종료 날짜
  const [selectedDateInfo, setSelectedDateInfo] = React.useState('No schedule available for this date'); // 클릭한 날짜의 일정 정보를
  const [selectedRange, setSelectedRange] = React.useState(null); // 현재 선택된 날짜 범위


  const [popupOpen_range, setPopupOpen_range] = React.useState(false); // 날짜 선택 팝업 눌렀나

  const [scheduleInfo, setScheduleInfo] = React.useState(''); // 일정 정보 입력 필드 값
  const [bgColor, setBgColor] = React.useState('white'); // 배경 색상

  const [currentMonth, setCurrentMonth] = React.useState(getCurrentMonth(dayjs())); // 현재 달 상태

  const letter = React.useRef(null); 
  
  

  // nowDay가 변경될 때마다 콘솔에 출력 : 보여줄 날짜는 여기서 가져와야할듯. 
  React.useEffect(() => {
    console.log('선택된 날짜:', nowDay); // nowDay는 yyyy-mm-dd 형식 문자열
    console.log('현재 저장된 일정정보: ' + scheduleInfo);
    console.log('현재 저장된 일정: ' + ranges);
    console.log('현재 저장된 일정: ', JSON.stringify(ranges, null, 2));
    
  }, [nowDay]);


  React.useEffect(() => {
    const range = ranges.find(({ startDate, endDate }) =>
      startDate && endDate && dayjs(nowDay).isBetween(startDate, endDate, null, '[]')
    );
  
    if (range) {
      setSelectedDateInfo(range.info || 'No schedule available for this date');
      setScheduleInfo(range.info || '');
      setBgColor(range.color || 'white'); // 일정이 있을 때 배경 색상 설정
      setSelectedRange(range); // 선택된 범위 상태 업데이트
      console.log("진짜 업뎃: " + range.info);
    } else {
      setSelectedDateInfo('No schedule available for this date'); 
      setScheduleInfo('');
      setBgColor('white'); // 일정이 없을 때 배경 색상 설정
      setSelectedRange(null); // 선택된 범위 초기화
    }

    console.log('!!!!!!!선택된 날짜:', nowDay);
    console.log('현재 저장된 일정정보:', scheduleInfo);
    console.log('현재 저장된 일정:', ranges);
  }, [ranges, nowDay]); 
  

  const testHandler = (value) => {
    console.log(value);

  };


  const handleDateChange = (newValue) => {
    console.log(newValue.$y);
    console.log(newValue.$M);
    if (startDateInput && endDateInput) {
      // 이미 시작일과 종료일이 설정되어 있는 경우
      setStartDateInput(newValue.format('YYYY-MM-DD'));
      setEndDateInput('');
    } else if (startDateInput && !endDateInput && newValue.isAfter(dayjs(startDateInput))) {
      setEndDateInput(newValue.format('YYYY-MM-DD'));
    } else {
      setStartDateInput(newValue.format('YYYY-MM-DD'));
    }

    console.log(startDateInput, endDateInput)
  };


  const handleSubmit = () => {

    const newStartDate = dayjs(startDateInput);
    const newEndDate = dayjs(endDateInput);
    console.log(newStartDate.$y.toString())
    const year = newStartDate.$y.toString()
    const mon = (newStartDate.$M + 1).toString().padStart(2, '0')
    const day = newStartDate.$D.toString().padStart(2, '0')

    const year1 = newEndDate.$y.toString()
    const mon1 = (newEndDate.$M + 1).toString().padStart(2, '0')
    const day1 = newEndDate.$D.toString().padStart(2, '0')
  
    console.log(year +'-'+ mon +'-'+ day);
    
    //const enterdLetter = letter.current.value;
    

    if (newStartDate.isValid() && newEndDate.isValid() && newStartDate.isBefore(newEndDate)) {
      // 기간에 이미 저장된 일정이 있으면 삭제하고 새로 추가
      const updatedRanges = ranges.filter(({ startDate, endDate }) =>
        !(startDate.isBefore(newEndDate) && endDate.isAfter(newStartDate))
      );
      setRanges([...updatedRanges, { startDate: newStartDate, endDate: newEndDate, color, info: scheduleInfo}]); 

      console.log(ranges)
      authHttp.post(`/api/schedule`, {
        start_date: year +'-'+ mon +'-'+ day,
        end_date: year1 +'-'+ mon1 +'-'+ day1,
        schedule_color: color,
        content: scheduleInfo,
      })
      .then((response) => {
        console.log(response)
      })
      .catch(function (error){
        console.log(error)
      });

      
      setStartDateInput('');
      setEndDateInput('');
      setPopupOpen_range(false); // 팝업을 닫음 
    } else {
      alert('Invalid dates. Please ensure the start date is before the end date.');
    }

  };


  // 일정 삭제 함수 추가
  const handleDelete = () => {
    const startDateToDelete = dayjs(startDateInput);
    const endDateToDelete = dayjs(endDateInput);

    const year = startDateToDelete.$y.toString()
    const mon = (startDateToDelete.$M + 1).toString().padStart(2, '0')
    const day = startDateToDelete.$D.toString().padStart(2, '0')

    const year1 = endDateToDelete.$y.toString()
    const mon1 = (endDateToDelete.$M + 1).toString().padStart(2, '0')
    const day1 = endDateToDelete.$D.toString().padStart(2, '0')

    console.log("삭제: 시작일: " +year +'-'+ mon +'-'+ day +"  종료일: " + year1 +'-'+ mon1 +'-'+ day1);
    
    // 시작날 ~ 종료날이 일치하는 일정이 있으면, 
    authHttp.get(`/api/schedule/date?date=${year +'-'+ mon +'-'+ day}`)
    .then(function (response){
      let scheduleId = response.data[0].schedule_id;

      authHttp.get(`/api/schedule/date?date=${year1 +'-'+ mon1 +'-'+ day1}`)
      .then(function (response){

        authHttp.delete(`/api/schedule/${scheduleId}`)
          .then(function (response){
            console.log("------'" + scheduleId);
            console.log("일정 삭제 성공");
          })
          .catch(function (error){
            console.error(error);
            console.error("응답 데이터:", error.response?.data);
            console.log("일정 삭제 실패");
          })

        if(scheduleId === response.data[0].schedule_id){
          // 그 id 삭제
          
        }
      })
      .catch(function (error){
        console.error(error);
        console.error("응답 데이터:", error.response?.data);
        console.log("delete end 실패");
      })
    })
    .catch(function (error){
      console.error(error);
      console.error("응답 데이터:", error.response?.data);
      console.log("delete start 실패");
    })


    // 일치하는 일정이 있으면 삭제
  if (startDateToDelete.isValid() && endDateToDelete.isValid() && startDateToDelete.isBefore(endDateToDelete)) {
    // 팝업창에서 입력된 날짜와 일치하는 범위 삭제
    const updatedRanges = ranges.filter(({ startDate, endDate }) =>
      !(startDate.isSame(startDateToDelete, 'day') && endDate.isSame(endDateToDelete, 'day'))
    );
    setRanges(updatedRanges);
    
    setStartDateInput('');
    setEndDateInput('');
    setColor('#ffffff'); // 색상 초기화
    setScheduleInfo(''); // 일정 정보 초기화
    setPopupOpen_range(false); // 팝업을 닫음
  } else {
    alert('Invalid dates. Please ensure the start date is before the end date.');
  }

    // console.log(selectedRange);
    // if (selectedRange) {
    //   // 선택된 범위와 동일한 일정 삭제
    //   setRanges(ranges.filter(({ startDate, endDate }) =>
    //     !(startDate.isSame(selectedRange.startDate, 'day') && endDate.isSame(selectedRange.endDate, 'day'))
    //   ));
    //   setSelectedRange(null);
    //   setStartDateInput('');
    //   setEndDateInput('');
    //   setPopupOpen_range(false);
    // }
  };
 

  const handleDayClick = (day) => {

    const formattedDate = formatDate(day);
    console.log('Clicked day:', day);
  console.log('Formatted date:', formattedDate);
    setNowDay(formattedDate);

    const range = ranges.find(({ startDate, endDate }) =>
      startDate && endDate && day.isBetween(startDate, endDate, null, '[]')
    );

    console.log('Range found:', range); // 범위 확인

    // 일치하는 일정이 있으면 일정정보 get (없으면)


    if (range) {
      // 클릭한 날짜가 범위 내에 있을 때만 일정 정보 표시
      setSelectedDateInfo(range.info || 'No schedule available for this date');
      setScheduleInfo(range.info || '');
      setBgColor(range.color); // 일정이 있을 때 배경 색상 설정
      setSelectedRange(range); // 선택된 범위 상태 업데이트
      console.log('Selected range:', range); // 확인
    } else {
      setSelectedDateInfo('No schedule available for this date');
      setScheduleInfo('');
      setBgColor('white'); // 일정이 없을 때 배경 색상 설정
      setSelectedRange(null); // 선택된 범위 초기화
    }

    // 팝업을 열지 않음
    // setPopupOpen_range(false); // 팝업을 닫음

    // const formattedDate = formatDate(day);
    // setNowDay(formattedDate);
    
    // const range = ranges.find(({ startDate, endDate }) =>
    //   startDate && endDate && day.isBetween(startDate, endDate, null, '[]')
    // );

    // if (range) {
    //   setStartDateInput(range.startDate.format('YYYY-MM-DD'));
    //   setEndDateInput(range.endDate.format('YYYY-MM-DD'));
    //   setColor(range.color);
    //   setSelectedRange(range);
    //   setSelectedDateInfo(`Start Date: ${range.startDate.format('YYYY-MM-DD')}, End Date: ${range.endDate.format('YYYY-MM-DD')}, Color: ${range.color}`);
    //   setPopupOpen_range(true); // 팝업을 엶 
    // } else {
    //   setSelectedDateInfo('No schedule available for this date');
    // }



    // const formattedDate = formatDate(day);
    // setNowDay(formattedDate);
    // // console.log("클릭한 날짜: " + nowDay); // 클릭한 날짜: 이건 전에 선택한게 나옴..
    // const range = ranges.find(({ startDate, endDate }) =>
    //   startDate && endDate && day.isBetween(startDate, endDate, null, '[]')
    // );

    // if (range) {
    //   setStartDateInput(range.startDate.format('YYYY-MM-DD'));
    //   setEndDateInput(range.endDate.format('YYYY-MM-DD'));
    //   setColor(range.color);
    //   setSelectedRange(range);
    //   setPopupOpen_range(true); // 팝업을 엶 
    // }
  };

  const handleTextChange = (e) => {
    const newInfo = e.target.value;
    setScheduleInfo(newInfo);

  if (selectedRange) {
    const updatedRanges = ranges.map((range) =>
      range === selectedRange ? { ...range, info: newInfo } : range
    );
    setRanges(updatedRanges);
    console.log('Updated ranges:', updatedRanges); // 확인
  }
  };



  //////////////////////////////////////////////////////
  ////// api ///////////////////////////////////////////


  const clickDay_ = () => {
    

    authHttp.get(`/api/schedule/date/date?=${nowDay}`)
    .then(function (response){
      let stD = response.data[0].start_date;
      let edD = response.data[0].end_date;
      let color = response.data[0].schedule_color;
      let content = response.data[0].content;

      setRanges([...updatedRanges, { startDate: stD, endDate: edD, color, info: content}]); 

    })
    .catch(function (error){
      console.error(error);
      console.error("응답 데이터:", error.response?.data);
      console.log("clickDay 실패");
    })
  }

  const showCalendar_ = () => {


  }

  
  const inputSchedule_ = (e) => {



    authHttp.post(`/api/schedule`, {
      start_date: newStartDate,
      end_date: newEndDate,
      schedule_color: color,
      content: scheduleInfo
    })
    .then(function (response){
      console.log("일정 추가 성공");
    })
    .catch(function (error){
      console.error(error);
      console.error("응답 데이터:", error.response?.data);
      console.log("일정 추가 실패");
    })
  }



  // 삭제 버튼 클릭 시 
  const deleteSchedule_ = () => {

    const startDateToDelete = dayjs(startDateInput);
    const endDateToDelete = dayjs(endDateInput);

    
    // 시작날 ~ 종료날이 일치하는 일정이 있으면, 
    authHttp.get(`/api/schedule/date/date?=${startDateToDelete}`)
    .then(function (response){
      let scheduleId = response.data[0].schedule_id;

      authHttp.get(`/api/schedule/date/date?=${endDateToDelete}`)
      .then(function (response){

        if(scheduleId === response.data[0].schedule_id){
          // 그 id 삭제
          authHttp.delete(`/api/schedule/${scheduleId}`)
          .then(function (response){
            console.log("일정 삭제 성공");
          })
          .catch(function (error){
            console.error(error);
            console.error("응답 데이터:", error.response?.data);
            console.log("일정 삭제 실패");
          })
        }
      })
      .catch(function (error){
        console.error(error);
        console.error("응답 데이터:", error.response?.data);
        console.log("delete end 실패");
      })
    })
    .catch(function (error){
      console.error(error);
      console.error("응답 데이터:", error.response?.data);
      console.log("delete start 실패");
    })
  }


  // 일정 내용이 업데이트됨. (날짜는 삭제후 생성임)
  const updateSchedule_ = () => {


    authHttp.get(`/api/schedule/date/date?=${nowDay}`)
    .then(function (response){
      let stD = response.data[0].start_date;
      let edD = response.data[0].end_date;
      let color = response.data[0].schedule_color;
      let content = response.data[0].content;
      setRanges([...updatedRanges, { startDate: stD, endDate: edD, color, info: content}]); 

    })
    .catch(function (error){
      console.error(error);
      console.error("응답 데이터:", error.response?.data);
      console.log("clickDay 실패");
    })



    authHttp.patch(`/api/schedule/{scheduleId}`, {
      content: scheduleInfo
    })
    .then(function (response){
      console.log("일정 변경 성공");
    })
    .catch(function (error){
      console.error(error);
      console.error("응답 데이터:", error.response?.data);
      console.log("일정 변경 실패");
    })
  }


  



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='realCalender'>
        <Box>
          <DateCalendar 
            value={null}
            onChange={handleDateChange}
            onMonthChange={testHandler}
            showDaysOutshdeCurrentMonth
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

        <div className='rangeInfoDiv' style={{ backgroundColor: bgColor }}>
        {selectedDateInfo !== 'No schedule available for this date' && (
            <TextField
              label="Schedule Info"
              multiline
              rows={1}
              value={scheduleInfo}
              onChange={handleTextChange}
              sx={{
                mt: 2,
                width: '90%',
                '& .MuiInputBase-input': {
                  fontSize: '12px',
                },
              }}
              inputProps={{ maxLength: 17 }}
            />
          )}
           {/* <p className='rangeInfo'>{selectedDateInfo}</p> 클릭한 날짜의 일정 정보 표시 */}
        </div>


        <div className='realCalendar_Btns'>
          
          <svg 
            className='scheduleAdd_Btn' onClick={() => {
              setScheduleInfo('');
              setBgColor('white');
              setPopupOpen_range(true);
            }}
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
                  onClick={() => setColor('#FF2D67')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FF7979', border: color === '#FF7979' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FF7979')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FF7C3F', border: color === '#FF7C3F' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FF7C3F')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#F7A782', border: color === '#F7A782' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#F7A782')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#FFE14F', border: color === '#FFE14F' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#FFE14F')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#4B9647', border: color === '#4B9647' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#4B9647')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#6FC0EE', border: color === '#6FC0EE' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#6FC0EE')} onChange={(e) => setColor(e.target.value)}
                ></div>
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#40300E', border: color === '#40300E' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#40300E')} onChange={(e) => setColor(e.target.value)}
                ></div>
                
                <div
                  className='color-circle'
                  style={{ backgroundColor: '#AFAFAF', border: color === '#AFAFAF' ? '2px solid #FFEFA6' : 'none' }}
                  onClick={() => setColor('#AFAFAF')} onChange={(e) => setColor(e.target.value)}
                ></div>



              </div>

              <div className='rangeInfo_InputDiv'>
              {/* 일정 정보 입력 필드 추가 */}
              <TextField
                label="Schedule Info"
                multiline
                rows={1}
                value={scheduleInfo || ''}
                onChange={(e) => setScheduleInfo(e.target.value)}
                // ref={letter}
                sx={{ mt: 2, width: '90%', 
                  '& .MuiInputBase-input': { 
                  fontSize: '12px', 
                  } 
                 }}
                inputProps={{ maxLength: 17 }}
              />
            </div>

            </Box>
          </div>
          <div className='calendarPop_Btn'>
            <Button className='range_deleteBtn' variant="contained" 
            sx={{
              backgroundColor: '#E0E0E0',
              '&:hover': {
                backgroundColor: 'error.main',
              },
            }}
            onClick={handleDelete} >
              일정 삭제하기
            </Button>
            
            <Button className='range_AddBtn' variant="contained" onClick={handleSubmit}>
              {selectedRange ? '일정 수정하기' : '일정 등록하기'}
            </Button>

            
          </div>
        </div>
 




    </LocalizationProvider>
  );
}




