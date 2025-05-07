import {JSX} from '@uif-js/core';
import { Button, Heading, StackPanel } from '@uif-js/component';

export default function ItemsDeleteModal({ closeHandle, deleteHandle }) {
	return (
		<StackPanel.Vertical alignment={StackPanel.Alignment.CENTER} outerGap={StackPanel.GapSize.LARGE}>
			<StackPanel.Item>
				<Heading type={Heading.Type.MEDIUM_HEADING}>Are you sure to delete this item?</Heading>
			</StackPanel.Item>
			<StackPanel.Item>
				<StackPanel>
					<StackPanel.Item>
						<Button label={'Cancel'} action={closeHandle} />
					</StackPanel.Item>
					<StackPanel.Item>
						<Button type={Button.Type.DANGER} label={'Delete'} action={deleteHandle} />
					</StackPanel.Item>
				</StackPanel>
			</StackPanel.Item>
		</StackPanel.Vertical>
	);
}