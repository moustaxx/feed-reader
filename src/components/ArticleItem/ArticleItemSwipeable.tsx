import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import { Animated, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { switchArticleSaveStatus } from '../../store/articles/articles.actions';

const styles = StyleSheet.create({
	readTextColor: {
		color: '#666',
	},
	swipeableLeftAction: {
		paddingLeft: 8,
		paddingRight: 16,
		backgroundColor: '#388e3c',
		alignItems: 'center',
		flexDirection: 'row',
	},
	swipeableActionIcon: {
		width: 30,
		marginHorizontal: 10,
	},
	swipeableText: {
		color: '#fff',
		textTransform: 'uppercase',
	},
});

const AnimatedIcon: typeof MaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

interface ILeftActionsProps {
	swipeableRowRef: React.MutableRefObject<Swipeable | null>;
	progress: Animated.Value | Animated.AnimatedInterpolation;
	dragX: Animated.AnimatedInterpolation;
	isSaved: boolean;
}

const LeftActions = ({ swipeableRowRef, isSaved }: ILeftActionsProps) => {
	return (
		<RectButton
			style={styles.swipeableLeftAction}
			onPress={() => swipeableRowRef.current?.close()}
		>
			<AnimatedIcon
				name="save"
				size={30}
				color="#fff"
				style={styles.swipeableActionIcon}
			/>
			<Animated.Text
				style={styles.swipeableText}
				children={isSaved ? 'Undo save' : 'Read later'}
			/>
		</RectButton>
	);
};

type TArticleItemSwipeable = React.FC<{
	articleSaved: boolean;
	articleID: string;
}>;

const ArticleItemSwipeable: TArticleItemSwipeable = ({ articleSaved, articleID, children }) => {
	const dispatch = useDispatch();
	const [isSaved, setIsSavedStatus] = React.useState(articleSaved);
	const swipeableRowRef = React.useRef<Swipeable | null>(null);

	const handleSwipeLeft = () => {
		setIsSavedStatus(!isSaved);
		dispatch(switchArticleSaveStatus([articleID]));
		swipeableRowRef.current?.close();
	};

	return (
		<Swipeable
			ref={swipeableRowRef}
			overshootLeft={false}
			onSwipeableOpen={handleSwipeLeft}
			renderLeftActions={(progress, dragX) => (
				<LeftActions
					swipeableRowRef={swipeableRowRef}
					progress={progress}
					dragX={dragX}
					isSaved={isSaved}
				/>
			)}
		>
			{children}
		</Swipeable>
	);
};

export default ArticleItemSwipeable;
