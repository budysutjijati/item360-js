import { FieldGroup, GridPanel } from '@uif-js/component';
import RecordField from './RecordField';
import record from 'N/record';

function RecordSection({ record, section, readonly }) {
	const { title, fields } = section;

	return (
		<FieldGroup title={title}>
			<GridPanel
				columns={['1fr', '1fr', '1fr', '1fr']}
				rowGap={GridPanel.GapSize.XXS}
				columnGap={GridPanel.GapSize.L}
			>
				{fields.map((fieldId, index) => (
					<GridPanel.Item key={index}>
						<RecordField record={record} fieldId={fieldId} readonly={readonly} />
					</GridPanel.Item>
				))}
			</GridPanel>
		</FieldGroup>
	);
}

export default RecordSection;