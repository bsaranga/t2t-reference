'use client'
import { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

export default function TaskCalendar() {
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [taskDetail, setTaskDetail] = useState({selectedDate: "No Date Selected"});
    
    return <div className='grow'>
        <Calendar
            localizer={localizer}
        />
    </div>;
}