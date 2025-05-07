import { Badge, ContentPanel, Field, StackPanel, Text } from '@uif-js/component';
import { Decorator } from '@uif-js/core';

export default function TopListItem({ name, price, inStock, isLast }) {
	const decorator = !isLast
		? Decorator.border({
			bottom: true,
			color: Decorator.Color.NEUTRAL,
			strength: Decorator.Strength.LIGHT,
		})
		: undefined;

	return (
		<StackPanel
			itemGap={StackPanel.GapSize.M}
			outerGap={StackPanel.GapSize.S}
			decorator={decorator}
			alignment={StackPanel.Alignment.CENTER}
		>
			<StackPanel.Item grow={1}>
				<Field label={'Name'}>
					<Text>{name}</Text>
				</Field>
			</StackPanel.Item>
			<StackPanel.Item>
				<Field label={'Cost'}>
					<Text type={Text.Type.STRONG}>{price}</Text>
				</Field>
			</StackPanel.Item>
			<StackPanel.Item basis={'150px'}>
				<ContentPanel horizontalAlignment={ContentPanel.HorizontalAlignment.END}>
					<Badge status={inStock ? Badge.Status.SUCCESS : Badge.Status.ERROR}>
						{inStock ? 'in stock' : 'out of stock'}
					</Badge>
				</ContentPanel>
			</StackPanel.Item>
		</StackPanel>
	);
}