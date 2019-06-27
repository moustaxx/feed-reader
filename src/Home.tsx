import React from 'react';
import { ScrollView } from 'react-native';
import Article from './components/Article';
import mockedArticles from './data';


const Home = () => {
	console.log('Home');

	return (
		<ScrollView>
			{mockedArticles.map(article => (
				<Article
					key={article.id}
					id={article.id}
					title={article.title}
					imageHref={article.imageHref}
					content={article.content}
				/>
			))}
		</ScrollView>
	);
};

export default Home;
