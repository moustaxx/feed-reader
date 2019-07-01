import React from 'react';
import { ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';

import getArticles from '../API/getArticles';
import ArticleItem from '../components/ArticleItem';
import homeScreenStyles from './HomeScreen.style';

const HomeScreen = () => {
	const { data, loading, error } = getArticles();
	if (loading) {
		return (
			<View style={homeScreenStyles.message}>
				<Title>Loading...</Title>
			</View>
		);
	}
	if (error) {
		return (
			<View style={homeScreenStyles.message}>
				<Title>{error.message}</Title>
			</View>
		);
	}
	if (!data || !data.id) {
		return (
			<View style={homeScreenStyles.message}>
				<Title>No data</Title>
			</View>
		);
	}
	const articles = data.items;
	return (
		<ScrollView>
			{articles.map((article) => {
				return (
					<ArticleItem
						key={article.id}
						id={article.id}
						title={article.title}
						content={(article.summary || article.content || {} as any).content}
						imageURL={article.visual && article.visual.url}
						sourceName={article.origin && article.origin.title}
						engagement={article.engagement}
						crawled={article.crawled}
					/>
				);
			})}
		</ScrollView>
	);
};

export default HomeScreen;
