import { ArrayDataSource } from '@uif-js/core';
import record from 'N/record';

// Initial state
export const initialState = {
	items: {
		loading: true,
		data: new ArrayDataSource([]),
	},
	item: {
		loading: true,
		saving: false,
		record: null,
	},
	dashboard: {
		reminders: {
			loading: true,
			data: [],
		},
		chart: {
			data: [],
		},
		topMostExpensive: [],
		topCheapest: [],
	},
	profile: {
		loading: true,
		data: undefined,
	},
};