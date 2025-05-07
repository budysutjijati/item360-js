import { GridPanel, Skeleton, StackPanel } from '@uif-js/component';

export default function RecordFormSkeleton({ sectionsCount = 3 }) {
	const sections = [];
	for (let i = 0; i < sectionsCount; i++) {
		sections.push(<RecordSectionSkeleton key={i} />);
	}

	return (
		<StackPanel.Vertical itemGap={StackPanel.GapSize.XS} outerGap={StackPanel.GapSize.S}>
			{sections.map((section) => (
				<StackPanel.Item key={section.key}>{section}</StackPanel.Item>
			))}
		</StackPanel.Vertical>
	);
}

function RecordSectionSkeleton() {
	return (
		<Skeleton.FieldGroup>
			<GridPanel
				columns={['1fr', '1fr', '1fr', '1fr']}
				rowGap={GridPanel.GapSize.XS}
				columnGap={GridPanel.GapSize.L}
				outerGap={GridPanel.GapSize.XXS}
			>
				{Array.from({ length: 8 }).map((_, index) => (
					<GridPanel.Item key={index}>
						<Skeleton.Field />
					</GridPanel.Item>
				))}
			</GridPanel>
		</Skeleton.FieldGroup>
	);
}