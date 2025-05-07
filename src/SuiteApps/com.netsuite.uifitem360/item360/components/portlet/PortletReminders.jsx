import { Portlet, Reminder, Skeleton, StackPanel } from '@uif-js/component';
import * as DataMapping from '../../data/DataMapping';

export default function PortletReminders({ loading, data }) {
	return (
		<Portlet title={'Reminders'}>
			{loading ? (
				<Skeleton.Reminders count={3} />
			) : (
				<StackPanel.Vertical itemGap={StackPanel.GapSize.XS}>
					{data.map(({ description, count, color }, index) => (
						<StackPanel.Item key={index}>
							<Reminder
								description={description}
								count={count}
								color={DataMapping.ReminderColor[color]}
							/>
						</StackPanel.Item>
					))}
				</StackPanel.Vertical>
			)}
		</Portlet>
	);
}