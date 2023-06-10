'use client';

import { FC, useState } from 'react';
import { Calendar } from './ui/calendar';

interface EventCalendarProps {}

const EventCalendar: FC<EventCalendarProps> = ({}) => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			className='rounded-md border'
		/>
	);
};

export default EventCalendar;
