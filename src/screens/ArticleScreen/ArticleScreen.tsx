import React from 'react';
import { Image, View, Linking } from 'react-native';
import { Title, Paragraph, Caption, Button } from 'react-native-paper';
import { NavigationScreenProps, withNavigation, ScrollView } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import placeholderIMG from '../../../assets/placeholder.png';
import articleScreenStyles from './ArticleScreen.style';
import { IArticle } from '../../components/ArticleItem/ArticleItem';

const ArticleScreen = ({ navigation }: NavigationScreenProps) => {
	const article: IArticle = navigation.getParam('article');

	React.useEffect(() => {
		navigation.setParams({ Title: article.title });
	}, [article]);

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

ArticleScreen.navigationOptions = ({ navigation }: NavigationScreenProps) => ({
	title: navigation.getParam('Title', 'Article'),
});


export default withNavigation(ArticleScreen);
