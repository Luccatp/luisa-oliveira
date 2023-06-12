'use client';

import { FC, useState } from 'react';
import { Calendar } from './ui/calendar';
import AsyncButton from './AsyncButton';

interface EventCalendarProps {}

const EventCalendar: FC<EventCalendarProps> = ({}) => {
	const [date, setDate] = useState<Date | undefined>(new Date());

	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};
	return (
		<div>
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
				className='rounded-md border'
			/>
		</div>
	);
};

export default EventCalendar;
