import { Kpi, Portlet, Skeleton } from '@uif-js/component';

export default function PortletTotalItems({ loading, data }) {
	const itemsCount = data.length.toString();
	return (
		<Portlet>
			{loading ? <Skeleton.Kpi /> : <Kpi title={'Total Item Count'} value={itemsCount} />}
		</Portlet>
	);
}