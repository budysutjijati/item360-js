import { Chart, Portlet, Skeleton } from '@uif-js/component';

export default function PortletChart({ data, loading }) {
	const definition = {
		chart: { type: 'pie' },
		title: {
			text: null,
		},
		series: data,
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
				},
			},
		},
		credits: {
			enabled: false,
		},
	};

	return (
		<Portlet title={'Number of Items per Vendor'}>
			{loading === true ? <Skeleton.Chart /> : <Chart definition={definition} />}
		</Portlet>
	);
}