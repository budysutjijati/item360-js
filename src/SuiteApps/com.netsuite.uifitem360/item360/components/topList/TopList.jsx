import { Decorator } from '@uif-js/core';
import { Heading, Skeleton, StackPanel } from '@uif-js/component';
import TopListItem from './TopListItem';

export default function TopList({ loading, title, items, strength = Decorator.Strength.LIGHTEST }) {
	return (
		<StackPanel.Vertical
			itemGap={StackPanel.GapSize.XS}
			outerGap={StackPanel.GapSize.S}
			decorator={Decorator.background({ color: Decorator.Color.NEUTRAL, strength })}
		>
			<StackPanel.Item>
				<Heading type={Heading.Type.MEDIUM_HEADING}>{title}</Heading>
			</StackPanel.Item>
			<StackPanel.Item>
				{loading ? <TopListSkeleton /> : <TopListContent items={items} />}
			</StackPanel.Item>
		</StackPanel.Vertical>
	);
}

function TopListSkeleton() {
	return (
		<StackPanel.Vertical itemGap={StackPanel.GapSize.S}>
			<StackPanel.Item>
				<Skeleton height={'85px'} width={'100%'} />
			</StackPanel.Item>
			<StackPanel.Item>
				<Skeleton height={'85px'} width={'100%'} />
			</StackPanel.Item>
			<StackPanel.Item>
				<Skeleton height={'85px'} width={'100%'} />
			</StackPanel.Item>
			<StackPanel.Item>
				<Skeleton height={'85px'} width={'100%'} />
			</StackPanel.Item>
			<StackPanel.Item>
				<Skeleton height={'85px'} width={'100%'} />
			</StackPanel.Item>
		</StackPanel.Vertical>
	);
}

function TopListContent({ items }) {
	return (
		<StackPanel.Vertical>
			{items.map(({ name, custrecord_pcpart_price, custrecord_pcpart_instock }, index) => (
				<StackPanel.Item key={index}>
					<TopListItem
						name={name}
						price={custrecord_pcpart_price}
						inStock={custrecord_pcpart_instock === 'T'}
						isLast={index === 4}
					/>
				</StackPanel.Item>
			))}
		</StackPanel.Vertical>
	);
}