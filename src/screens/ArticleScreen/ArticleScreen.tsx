import React from 'react';
import { Image, View, Linking } from 'react-native';
import { Title, Paragraph, Caption, Button, IconButton, Snackbar } from 'react-native-paper';
import { withNavigation, ScrollView } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import placeholderIMG from '../../../assets/placeholder.png';
import articleScreenStyles from './ArticleScreen.style';
import { IArticle, IAppState } from '../../store/types';
import { navOpts } from '../../navigation/common';
import theme from '../../theme';
import { switchArticleReadStatus, switchArticleSaveStatus } from '../../store/articles/articles.actions';
import { store } from '../../store';

const ArticleScreen = ({ navigation }: NavigationStackScreenProps) => {
	const mounted = React.useRef(true);
	const snackbarContent: string = navigation.getParam('snackbarContent');
	const initArticle: IArticle = React.useCallback(navigation.getParam('article'), []);
	const [article, setArticle] = React.useState<IArticle>(initArticle);

	const dispatch = useDispatch();
	const [snackbarData, setSnackbarData] = React.useState({
		visibility: false,
		content: snackbarContent,
	});
	const articleFromStore = useSelector((state: IAppState) => (
		state.articles.articles.find((art) => art.id === initArticle.id) || article
	));

	React.useEffect(() => {
		setArticle(articleFromStore);
		navigation.setParams({ article: articleFromStore });
	}, [articleFromStore]); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => {
		return () => { mounted.current = false; };
	}, []);

	React.useEffect(() => {
		if (mounted && snackbarContent) {
			setSnackbarData({ visibility: true, content: snackbarContent });
		}
	}, [snackbarContent]);

	React.useEffect(() => {
		navigation.setParams({ Title: article.title });
		if (article.unread) dispatch(switchArticleReadStatus(article.id));
	}, [article]); // eslint-disable-line react-hooks/exhaustive-deps

	const goToSource = () => (
		article.targetURL ? Linking.openURL(article.targetURL) : alert('No link')
	);
	const saveArticle = () => {
		store.dispatch(switchArticleSaveStatus([article.id]));
		const content = !article.saved ? 'Saved to board.' : 'Removed from saved.';
		setSnackbarData({ visibility: true, content });
	};
	const img = article.imageURL ? { uri: article.imageURL } : placeholderIMG;

	return (
		<View style={articleScreenStyles.root}>
			<ScrollView>
				<Image style={articleScreenStyles.image} source={img} />
				<View style={articleScreenStyles.wrapper}>
					<Title>{ article.title }</Title>
					<View style={articleScreenStyles.captions}>
						<MaterialIcons
							name="whatshot"
							style={articleScreenStyles.flameIcon}
							size={14}
						/>
						<Caption>
							{/* eslint-disable-next-line react/jsx-one-expression-per-line */}
							{article.engagement} | {article.sourceName} | {article.crawled} {article.saved && '| Saved'}
						</Caption>
					</View>
					<Paragraph style={articleScreenStyles.content}>{ article.content }</Paragraph>
					<Button
						onPress={goToSource}
						icon="link"
						mode="contained"
						contentStyle={articleScreenStyles.btnContent}
						style={articleScreenStyles.btn}
						children="Visit website"
					/>
					<Button
						onPress={saveArticle}
						icon="content-save"
						mode="outlined"
						contentStyle={articleScreenStyles.btnContent}
						style={articleScreenStyles.btn}
						children="Read later"
					/>
				</View>
			</ScrollView>
			<Snackbar
				visible={snackbarData.visibility}
				duration={2000}
				onDismiss={() => setSnackbarData({ ...snackbarData, visibility: false })}
				children={snackbarData.content}
			/>
		</View>
	);
};

ArticleScreen.navigationOptions = ({ navigation }: NavigationStackScreenProps) => {
	const opts = navOpts(navigation);
	const { id, unread, saved }: IArticle = navigation.getParam('article');
	return {
		...opts,
		title: navigation.getParam('Title', 'Feed Reader'),
		headerTitleContainerStyle: articleScreenStyles.navHeaderTitleContainerStyle,
		headerRight: (
			<View style={articleScreenStyles.navHeaderRight}>
				<IconButton
					icon="content-save"
					color={theme.colors.headerElements}
					style={articleScreenStyles.navHeaderRightIcon}
					onPress={() => {
						store.dispatch(switchArticleSaveStatus([id]));
						navigation.setParams({
							snackbarContent: !saved ? 'Saved to board.' : 'Removed from saved.',
						});
					}}
				/>
				<IconButton
					icon="check"
					color={theme.colors.headerElements}
					style={articleScreenStyles.navHeaderRightIcon}
					onPress={() => {
						store.dispatch(switchArticleReadStatus(id));
						navigation.setParams({
							snackbarContent: !unread ? 'Keept unread.' : 'Marked as read.',
						});
					}}
				/>
			</View>
		),
	};
};

export default withNavigation(ArticleScreen);
