import React from 'react';
import { Image, View, Linking } from 'react-native';
import { Title, Paragraph, Caption, Button, IconButton } from 'react-native-paper';
import { withNavigation, ScrollView } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

import placeholderIMG from '../../../assets/placeholder.png';
import articleScreenStyles from './ArticleScreen.style';
import { IArticle } from '../../components/ArticleItem/ArticleItem';
import { navOpts } from '../../navigation/common';
import theme from '../../theme';

const ArticleScreen = ({ navigation }: NavigationStackScreenProps) => {
	const article: IArticle = navigation.getParam('article');

	React.useEffect(() => {
		navigation.setParams({ Title: article.title });
	}, [article]); // eslint-disable-line react-hooks/exhaustive-deps

	const goToSource = () => (article.targetURL ? Linking.openURL(article.targetURL) : alert('No link'));
	const img = article.imageURL ? { uri: article.imageURL } : placeholderIMG;

	return (
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
					{/* eslint-disable-next-line react/jsx-one-expression-per-line */}
					<Caption>{article.engagement} | {article.sourceName} | {article.crawled}</Caption>
				</View>
				<Paragraph style={articleScreenStyles.content}>{ article.content }</Paragraph>
				<Button
					onPress={goToSource}
					icon="link"
					mode="contained"
					style={articleScreenStyles.goToSourceBtn}
					children="Visit website"
				/>
			</View>
		</ScrollView>
	);
};

ArticleScreen.navigationOptions = ({ navigation }: NavigationStackScreenProps) => {
	const opts = navOpts(navigation);
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
					onPress={() => console.log('save')}
				/>
			</View>
		),
	};
};

export default withNavigation(ArticleScreen);
