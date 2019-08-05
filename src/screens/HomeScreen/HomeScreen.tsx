import React from 'react';
import { View } from 'react-native';
import { Title, ActivityIndicator, IconButton } from 'react-native-paper';
import { ScrollView, NavigationScreenProps, withNavigation } from 'react-navigation';
import { format } from 'timeago.js';
import innertext from 'innertext';

import homeScreenStyles from './HomeScreen.style';
import getArticles from '../../API/getArticles';
import markAllAsRead from '../../API/markAllAsRead';
import ArticleItem from '../../components/ArticleItem/ArticleItem';
import { navOpts } from '../../navigation/common';
import theme from '../../theme';
import articleScreenStyles from '../ArticleScreen/ArticleScreen.style';

const HomeScreen = ({ navigation }: NavigationScreenProps) => {
	const { data, loading, error, refetch } = getArticles();

	React.useEffect(() => {
		navigation.setParams({ refetchFun: refetch });
	}, [refetch]); // eslint-disable-line react-hooks/exhaustive-deps


	if (loading) {
		return (
			<View style={homeScreenStyles.message}>
				<ActivityIndicator size="large" />
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
	if (!data || !data.id || !data.items.length) {
		return (
			<View style={homeScreenStyles.message}>
				<Title>Nothing to show...</Title>
			</View>
		);
	}
	const articles = data.items;
	return (
		<ScrollView>
			{articles.map(_article => {
				const { content } = _article.summary || _article.content || {} as any;
				const article = {
					id: _article.id,
					title: _article.title,
					content: content && innertext(content),
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

HomeScreen.navigationOptions = ({ navigation }: NavigationScreenProps) => {
	const opts = navOpts(navigation);
	const markAndRefresh = async () => {
		await markAllAsRead();
		if (navigation.state.params) navigation.state.params.refetchFun();
	};
	return {
		...opts,
		title: 'Feed Reader',
		headerRight: (
			<View style={articleScreenStyles.navHeaderRight}>
				<IconButton
					icon="refresh"
					color={theme.colors.headerElements}
					style={articleScreenStyles.navHeaderRightIcon}
					onPress={() => { if (navigation.state.params) navigation.state.params.refetchFun(); }}
				/>
				<IconButton
					icon="check"
					color={theme.colors.headerElements}
					style={articleScreenStyles.navHeaderRight}
					onPress={markAndRefresh}
				/>
			</View>
		),
	};
};

export default withNavigation(HomeScreen);
