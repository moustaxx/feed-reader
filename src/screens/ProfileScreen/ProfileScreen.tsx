/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Text, ActivityIndicator, Button, Snackbar } from 'react-native-paper';
import { View, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import avatarPlaceholder from '../../../assets/avatar.jpg';
import { useAPIRequest, feedly, makeRequest } from '../../utils/feedlyClient';
import profileScreenStyles from './ProfileScreen.style';
import { resetSecureStore } from '../../store/secure/secure.actions';

const ProfileScreen = () => {
	const mounted = React.useRef(true);
	const [snackBarData, setSnackbarData] = React.useState({ visibility: false, content: '' });
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await makeRequest(() => feedly.logout());
			if (mounted.current) {
				setSnackbarData({ visibility: true, content: 'You have been logged out.' });
			}
		} catch (error) {
			console.warn('Log out error!', error);
			if (mounted.current) {
				setSnackbarData({ visibility: true, content: 'Log out error!' });
			}
		}
		dispatch(resetSecureStore());
	};

	const { data, loading, error } = useAPIRequest(() => feedly.getUserProfile());

	if (error) {
		return (
			<View style={profileScreenStyles.message}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	if (loading) {
		return (
			<View style={profileScreenStyles.message}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	if (data) {
		const img = data.picture ? { uri: data.picture } : avatarPlaceholder;
		return (
			<View style={profileScreenStyles.root}>
				<ScrollView>
					<View style={profileScreenStyles.content}>
						<Image source={img} style={profileScreenStyles.image} resizeMode="contain" />
						<Text style={profileScreenStyles.email}>{data.email}</Text>
						<Button
							children="Log out"
							mode="contained"
							onPress={handleLogout}
							contentStyle={{ padding: 8 }}
						/>
					</View>
				</ScrollView>
				<Snackbar
					visible={snackBarData.visibility}
					duration={2000}
					onDismiss={() => setSnackbarData({ ...snackBarData, visibility: false })}
					children={snackBarData.content}
				/>
			</View>
		);
	}
	return null;
};

export default ProfileScreen;
