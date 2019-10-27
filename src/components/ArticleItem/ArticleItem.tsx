import React from 'react';
import { View, Image } from 'react-native';
import { Paragraph, Subheading, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';

import articleStyles from './ArticleItem.style';
import { SettingsContext } from '../../utils/useSettings';
import markOneAsRead from '../../API/markOneAsRead';

export interface IArticle {
	id: string;
	title?: string;
	content: string;
	unread: boolean;
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
	const [{ articlePictureOnLeft }] = React.useContext(SettingsContext);

	const goToArticle = () => {
		navigate('ArticleScreen', { article });
		markOneAsRead(article.id);
	};

	return (
		<TouchableRipple onPress={goToArticle}>
			<View style={articleStyles.root}>
				{article.imageURL && articlePictureOnLeft && (
					<Image
						source={{ uri: article.imageURL }}
						style={articleStyles.imageLeft}
					/>
				)}
				<View style={articleStyles.content}>
					<Subheading
						style={[articleStyles.title, !article.unread && articleStyles.readTextColor]}
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
				{article.imageURL && !articlePictureOnLeft && (
					<Image
						source={{ uri: article.imageURL }}
						style={articleStyles.imageRight}
					/>
				)}
			</View>
		</TouchableRipple>
	);
};

export default ArticleItem;
