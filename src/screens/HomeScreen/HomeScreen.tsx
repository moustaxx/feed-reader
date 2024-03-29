import React from 'react';
import { View, RefreshControl } from 'react-native';
import { Title, ActivityIndicator, IconButton, Button } from 'react-native-paper';
import { ScrollView, withNavigation } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import homeScreenStyles from './HomeScreen.style';
import articleScreenStyles from '../ArticleScreen/ArticleScreen.style';
import ArticleItem from '../../components/ArticleItem/ArticleItem';
import { navOpts } from '../../navigation/common';
import theme from '../../theme';
import { store } from '../../store';
import { IAppState } from '../../store/types';
import { articlesFetchData, markAllArticlesAsRead } from '../../store/articles/articles.actions';

const HomeScreen = ({ navigation }: NavigationStackScreenProps) => {
	const dispatch = useDispatch();
	const {
		articles,
		targetID,
		isLoading,
		error,
	} = useSelector((state: IAppState) => state.articles);
	const [refreshing] = React.useState(false);

	React.useEffect(() => {
		dispatch(articlesFetchData(targetID));
		navigation.setParams({ targetID });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, targetID]);

	if (isLoading) {
		return (
			<View style={homeScreenStyles.message}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	if (error) {
		return (
			<View style={homeScreenStyles.message}>
				<Title>{error}</Title>
			</View>
		);
	}
	if (!articles || !articles.length) {
		return (
			<View style={homeScreenStyles.message}>
				<Title>Nothing to show...</Title>
				<Button
					onPress={() => dispatch(articlesFetchData(targetID, false))}
					style={homeScreenStyles.btn}
					children="Show read articles"
					mode="contained"
				/>
			</View>
		);
	}

	return (
		<ScrollView
			refreshControl={(
				<RefreshControl
					refreshing={refreshing}
					onRefresh={() => dispatch(articlesFetchData(targetID))}
				/>
			)}
		>
			{articles.map((article) => (
				<ArticleItem
					key={article.id}
					article={article}
				/>
			))}
			<Button
				onPress={() => {
					dispatch(markAllArticlesAsRead());
					dispatch(articlesFetchData(targetID));
				}}
				contentStyle={{ height: 64 }}
				style={{ marginTop: 8 }}
				mode="contained"
				icon="check"
				children="Mark all as read"
			/>
		</ScrollView>
	);
};

HomeScreen.navigationOptions = ({ navigation }: NavigationStackScreenProps) => {
	const opts = navOpts(navigation);
	const targetID = navigation.getParam('targetID');
	const refresh = () => store.dispatch(articlesFetchData(targetID) as any);

	return {
		...opts,
		title: 'Feed Reader',
		headerRight: (
			<View style={articleScreenStyles.navHeaderRight}>
				<IconButton
					icon="refresh"
					color={theme.colors.headerElements}
					style={articleScreenStyles.navHeaderRightIcon}
					onPress={refresh}
				/>
				<IconButton
					icon="check-all"
					color={theme.colors.headerElements}
					style={articleScreenStyles.navHeaderRight}
					onPress={() => {
						store.dispatch(markAllArticlesAsRead());
						refresh();
					}}
				/>
			</View>
		),
	};
};

export default withNavigation(HomeScreen);
