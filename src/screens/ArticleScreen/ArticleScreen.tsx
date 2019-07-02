import React from 'react';
import { ScrollView, Image, View, Linking } from 'react-native';
import { Title, Paragraph, Caption, Button } from 'react-native-paper';
import { useNavigationParam } from 'react-navigation-hooks';
import { MaterialIcons } from '@expo/vector-icons';

import placeholderIMG from '../../../assets/placeholder.png';
import articleScreenStyles from './ArticleScreen.style';
import { IArticle } from '../../components/ArticleItem/ArticleItem';

const ArticleScreen = () => {
	const article: IArticle = useNavigationParam('article');

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

export default ArticleScreen;
