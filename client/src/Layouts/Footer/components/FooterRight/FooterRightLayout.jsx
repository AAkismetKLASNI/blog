import styled from 'styled-components';
import { useEffect, useState } from 'react';

const WeatherWidget = styled.div`
	font-weight: bold;
`;

export const FooterRightLayout = () => {
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState('');
	const [temp, setTemp] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&lang=ru&appid=709a9f0a95d47e415bc335a4b8e5231f',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setWeather(weather[0].description);
				setTemp(Math.round(main.temp - 273.15));
			}).catch(() => console.log('Погода не получена'));
	}, []);

	return (
		<WeatherWidget>
			<div>
				{city},{' '}
				{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
			</div>
			<div>
				{temp ? '+' : null}
				{temp}, {weather}
			</div>
		</WeatherWidget>
	);
};
