import React from 'react';
import { ScrollView } from 'react-native';
import Article from './components/Article';

// import mainStyles from './Main.style';
const mockedArticles = [
	{
		id: 1,
		title: 'Blackout w kilka godzin zamieni życie w piekło. Bez wody, komunikacji i informacji zapanuje totalny chaos, chamstwo i tak dalej',
		imageHref: 'https://lh3.googleusercontent.com/Z-6IPwr2JrDl5xPNCey2uQ0DhdPXOyQ3OOootmJnIptXWdSGEAMidcGSYIlcc64waBeXi6P5X2eLGOhSuE8lePEBqFA=s163',
		content: 'Wystarczy tylko kilka godzin bez prądu, a nie będziemy mieli wody, informacji i możliwości przemieszczania się. To jednak dopiero początek',
	},
	{
		id: 2,
		title: 'Heavy Rain debiutuje na PC',
		imageHref: 'https://lh3.googleusercontent.com/hdYqn118sysnt_o45FQsp77uZen_4joJFHfReJiFauiaxTEW6BUWVJd2MQEErmbeUjZh2agJhmcIIQZFftc5si09oDQ=s163',
		content: 'W niedzielę ulicami Przemyśla przeszła coroczna ukraińska procesja z okazji Święta Ukraińskiej Pamięci Narodowej',
	},
	{
		id: 3,
		title: 'Rosja wzmacnia kontrole gruzińskich win.',
		imageHref: 'https://lh3.googleusercontent.com/xJAmD8UzF7xitDEF_ERe3pzZGYTP9sMHlebcKyMI_r07dilRNhMvm_bqGh78Yi3EznKcH-sxtBv7Oag8n4HHmbbirg=s163',
		content: 'W niedzielę ulicami Przemyśla przeszła coroczna ukraińska procesja z okazji Święta Ukraińskiej Pamięci Narodowej',
	},
	{
		id: 4,
		title: 'Czemierniki. Wypadek z udziałem motocyklisty',
		imageHref: 'https://lh3.googleusercontent.com/FhMM7W38Jb2_OTQKFin20dfZqy236LrrkJAIAVX19CeBtOLsULhFiRmyWVAoNEB_FNF-j46Pho6HXN5xf0eMuajL=s163',
		content: 'Czemierniki wypadek z udziałem Czemiernik, tak wypadek z udziałem motocyklisty',
	},
	{
		id: 5,
		title: 'Heavy Rain debiutuje na PC z udziałem motocyklisty',
		imageHref: 'https://lh3.googleusercontent.com/Z-6IPwr2JrDl5xPNCey2uQ0DhdPXOyQ3OOootmJnIptXWdSGEAMidcGSYIlcc64waBeXi6P5X2eLGOhSuE8lePEBqFA=s163',
		content: 'Czemierniki wypadek z Heavy Rain debiutuje na PC z udziałem motocyklisty',
	},
];

const Home = () => {
	console.log('Home');

	return (
		<ScrollView>
			{mockedArticles.map(article => (
				<Article
					key={article.id}
					title={article.title}
					imageHref={article.imageHref}
					content={article.content}
				/>
			))}
		</ScrollView>
	);
};

export default Home;
