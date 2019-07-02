import React from 'react';
import { ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';
import { format } from 'timeago.js';
import innertext from 'innertext';

import getArticles from '../../API/getArticles';
import ArticleItem from '../../components/ArticleItem/ArticleItem';
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
			{articles.map((_article) => {
				const { content } = _article.summary || _article.content || {} as any;
				const article = {
					id: _article.id,
					title: _article.title,
					content: innertext(content),
					imageURL: _article.visual && _article.visual.url !== 'none' ? _article.visual.url : undefined,
					targetURL: _article.alternate && _article.alternate[0].href,
					sourceName: _article.origin ? _article.origin.title : 'Unknown',
					engagement: _article.engagement ? _article.engagement : 0,
					crawled: format(_article.crawled, 'my-locale'),
				};
				return (
					<ArticleItem
						key={_article.id}
						article={article}
					/>
				);
			})}
		</ScrollView>
	);
};

export default HomeScreen;
