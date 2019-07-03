import React from 'react';
import { View, Image } from 'react-native';
import { Paragraph, Subheading, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';

import articleStyles from './ArticleItem.style';

export interface IArticle {
	id: string | number;
	title?: string;
	content: string;
	imageURL?: string;
	targetURL?: string;
	sourceName: string;
	engagement: number;
	crawled: string;
}
export interface IArticleItemProps {
	article: IArticle;
}

const ArticleItem = ({ article }: IArticleItemProps) => {
	const { navigate } = useNavigation();
	const goToArticle = () => navigate('ArticleScreen', { article });

	return (
		<TouchableRipple onPress={goToArticle}>
			<View style={articleStyles.root}>
				<View style={articleStyles.content}>
					<Subheading
						style={articleStyles.title}
						numberOfLines={3}
						children={article.title}
					/>
					<Paragraph
						numberOfLines={3}
						children={article.content}
					/>
					<View style={articleStyles.captions}>
						<MaterialIcons
							name="whatshot"
							style={articleStyles.flameIcon}
							size={14}
						/>
						{ /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
						<Caption>{article.engagement} | {article.sourceName} | {article.crawled}</Caption>
					</View>
				</View>
				{article.imageURL
					&& <Image source={{ uri: article.imageURL }} style={articleStyles.image} />
				}
			</View>
		</TouchableRipple>
	);
};

export default ArticleItem;