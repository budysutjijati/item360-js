import {
	ApplicationHeader,
	Avatar,
	ContentPanel,
	Field,
	FieldGroup,
	GridPanel,
	Skeleton,
	StackPanel,
	Text,
} from '@uif-js/component';
import { useDispatch, useLayoutEffect } from '@uif-js/core';
import { Action } from '../../app/Action';

export default function ProfilePage({ profile }) {
	const { loading, data } = profile;
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(Action.profileLoad());
	}, []);

	return loading ? <ProfilePageSkeleton /> : <ProfilePageContent data={data} />;
}

function ProfilePageContent({ data }) {
	const { name, surname, position, email, phone, address } = data;
	const avatar = (
		<Avatar
			content={{
				url: '/spa-app/com.netsuite.uifitem360/item360/assets/UserAvatar.png',
				caption: 'Profile image',
			}}
		/>
	);

	return (
		<StackPanel.Vertical>
			<StackPanel.Item>
				<ApplicationHeader icon={avatar} title={`${name} ${surname}`} subtitle={position} />
			</StackPanel.Item>
			<StackPanel.Item>
				<ContentPanel outerGap={StackPanel.GapSize.S}>
					<FieldGroup title={'Contact Information'}>
						<GridPanel columns={['1fr', '1fr', '1fr']} columnGap={GridPanel.GapSize.L}>
							<GridPanel.Item>
								<Field label={'Email'}>
									<Text>{email}</Text>
								</Field>
							</GridPanel.Item>
							<GridPanel.Item>
								<Field label={'Phone'}>
									<Text>{phone}</Text>
								</Field>
							</GridPanel.Item>
							<GridPanel.Item>
								<Field label={'Address'}>
									<Text>{address}</Text>
								</Field>
							</GridPanel.Item>
						</GridPanel>
					</FieldGroup>
				</ContentPanel>
			</StackPanel.Item>
		</StackPanel.Vertical>
	);
}

function ProfilePageSkeleton() {
	return (
		<StackPanel.Vertical>
			<StackPanel.Item selfAlignment={StackPanel.SelfAlignment.START}>
				<Skeleton.ApplicationHeader />
			</StackPanel.Item>
			<StackPanel.Item>
				<ContentPanel outerGap={StackPanel.GapSize.S}>
					<Skeleton.FieldGroup>
						<ContentPanel outerGap={StackPanel.GapSize.XXXS}>
							<GridPanel columns={['1fr', '1fr', '1fr']} columnGap={GridPanel.GapSize.L}>
								<GridPanel.Item>
									<Skeleton.Field />
								</GridPanel.Item>
								<GridPanel.Item>
									<Skeleton.Field />
								</GridPanel.Item>
								<GridPanel.Item>
									<Skeleton.Field />
								</GridPanel.Item>
							</GridPanel>
						</ContentPanel>
					</Skeleton.FieldGroup>
				</ContentPanel>
			</StackPanel.Item>
		</StackPanel.Vertical>
	);
}