import { StackPanel } from '@uif-js/component';
import RecordSection from './RecordSection';
import record from 'N/record';

export default function RecordForm({ record, formScheme, readonly }) {
	return (
		<StackPanel.Vertical outerGap={StackPanel.GapSize.S} itemGap={StackPanel.GapSize.XS}>
			{formScheme.map((section) => (
				<StackPanel.Item key={section.title}>
					<RecordSection record={record} section={section} readonly={readonly} />
				</StackPanel.Item>
			))}
		</StackPanel.Vertical>
	);
}