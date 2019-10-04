import React from 'react';
import { Text, Paragraph } from 'react-native-paper';
import { View } from 'react-native';

import useUserProfile from '../../API/getUserProfile';

const ProfileScreen = () => {
	const { data, loading, error } = useUserProfile();

	if (error) {
		return (
			<Text>
				{error.message}
			</Text>
		); 
	}
	if (loading) {
		return (
			<Text>
				Loading...
			</Text>
		);
	}
	if (data) {
		return (
			<View>
				<Paragraph>{data.client}</Paragraph>
				<Paragraph>{data.created}</Paragraph>
				<Paragraph>{data.email}</Paragraph>
				<Paragraph>{data.facebookUserId}</Paragraph>
				<Paragraph>{data.familyName}</Paragraph>
				<Paragraph>{data.fullName}</Paragraph>
				<Paragraph>{data.gender}</Paragraph>
				<Paragraph>{data.givenName}</Paragraph>
				<Paragraph>{data.google}</Paragraph>
				<Paragraph>{data.id}</Paragraph>
			</View>
		);
	}
	return null;
};

export default ProfileScreen;
