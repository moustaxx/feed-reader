import React from 'react';
import { View, Image } from 'react-native';
import { Paragraph, Subheading, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';

import articleStyles from './ArticleItem.style';
import markOneAsRead from '../../API/markOneAsRead';
import { IAppState, IArticle } from '../../store/types';

export interface IArticleItemProps {
	article: IArticle;
}

const ArticleItem = ({ article }: IArticleItemProps) => {
	const { navigate } = useNavigation();
	const { articlePictureOnLeft } = useSelector((state: IAppState) => state.settings);

	const goToArticle = () => {
		navigate('ArticleScreen', { article });
		markOneAsRead(article.id);
	};

	return (
		<TouchableRipple onPress={goToArticle}>
			<View style={articleStyles.root}>
				{article.thumbnail && articlePictureOnLeft && (
					<Image
						source={{ uri: article.thumbnail }}
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
				{article.thumbnail && !articlePictureOnLeft && (
					<Image
						source={{ uri: article.thumbnail }}
						style={articleStyles.imageRight}
					/>
				)}
			</View>
		</TouchableRipple>
	);
};

export default ArticleItem;
