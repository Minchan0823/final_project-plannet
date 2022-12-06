import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import 'react-calendar/dist/Calendar.css'; // css import
import './Calendar.css';
import Api from "../api/plannetApi";

const Cal = ({doMark, endMark}) => {
    const [value, setValue] = useState(new Date());
    


    //날짜 클릭시 해당날짜의 write로 이동
    const dayIn = (value) => {
        const selectDate = moment(value).format('YYYY-MM-DD');
        const link = "/write/" + selectDate;
        window.location.replace(link);
    }


    return(
        <div>
            <Calendar 
            returnValue="range"
            calendarType="US"
            onChange={setValue} 
            value={value} 
            onClickDay={dayIn}
            formatShortWeekday={(locale,value) => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][value.getDay()]}
            formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
            minDetail="month"
            tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                let html = [];
                // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                if (doMark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                    html.push(<div className="dotDo"></div>);
                }
                if (endMark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                    html.push(<div className="dotEnd"></div>);
                }
                return (
                    <>
                        <div className="dotBox">
                            {html}
                        </div>
                    </>
                );
            }}
            />
        </div>
    );
}

export default Cal;
