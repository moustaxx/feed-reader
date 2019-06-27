import React from 'react';
import { ScrollView } from 'react-native';

import mockedArticles from '../data';
import ArticleItem from '../components/ArticleItem';


const HomeScreen = () => {
	return (
		<ScrollView>
			{mockedArticles.map(article => (
				<ArticleItem
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

export default HomeScreen;
