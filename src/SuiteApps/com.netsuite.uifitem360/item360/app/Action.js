import ServerDataService from '../service/ServerDataService';
import { Store, Type } from '@uif-js/core';
import record from 'N/record';

// Action types - enumeration of available actions
export const ActionType = Object.freeze({
	// Items
	ITEMS_SET_LOADING: 'itemsSetLoading',
	ITEMS_LOAD_DATA: 'itemsLoadData',
	// Item
	ITEM_SET_LOADING: 'itemSetLoading',
	ITEM_LOAD_DATA: 'itemLoadData',
	ITEM_SET_SAVING: 'itemSetSaving',
	// Reminders
	REMINDERS_SET_LOADING: 'remindersSetLoading',
	REMINDERS_LOAD_DATA: 'remindersLoadData',
	// Chart
	CHART_LOAD_DATA: 'chartLoadData',
	// Top Lists
	TOP_EXPENSIVE_SET: 'topExpensiveSet',
	TOP_CHEAPEST_SET: 'topCheapestSet',
	// Profile
	PROFILE_SET_LOADING: 'profileSetLoading',
	PROFILE_LOAD_DATA: 'profileSetLoadData',
});

// Action creators
export const Action = {
	// Items
	itemsSetLoading(value) {
		return { type: ActionType.ITEMS_SET_LOADING, value };
	},
	itemsLoadData(items) {
		return { type: ActionType.ITEMS_LOAD_DATA, items };
	},
	itemSetLoading(value) {
		return { type: ActionType.ITEM_SET_LOADING, value };
	},
	itemLoadData(record) {
		return { type: ActionType.ITEM_LOAD_DATA, record };
	},
	itemSetSaving(value) {
		return { type: ActionType.ITEM_SET_SAVING, value };
	},
	remindersSetLoading(value) {
		return { type: ActionType.REMINDERS_SET_LOADING, value };
	},
	remindersLoadData(reminders) {
		return { type: ActionType.REMINDERS_LOAD_DATA, reminders };
	},
	chartLoadData(data) {
		return { type: ActionType.CHART_LOAD_DATA, data };
	},
	topExpensiveSet(items) {
		return { type: ActionType.TOP_EXPENSIVE_SET, items };
	},
	topCheapestSet(items) {
		return { type: ActionType.TOP_CHEAPEST_SET, items };
	},
	profileSetLoading(value) {
		return { type: ActionType.PROFILE_SET_LOADING, value };
	},
	profileLoadData(data) {
		return { type: ActionType.PROFILE_LOAD_DATA, data };
	},

	// Compound actions
	itemsLoad() {
		return async (dispatch) => {
			dispatch(Action.itemsSetLoading(true));
			const items = await ServerDataService.itemsLoad();
			dispatch(Action.itemsLoadData(items));
			dispatch(Action.topExpensiveSet(getMostExpensive(items)));
			dispatch(Action.topCheapestSet(getCheapest(items)));
			dispatch(Action.chartLoadData(getChartData(items)));
			dispatch(Action.itemsSetLoading(false));
		};
	},

	itemLoad(id) {
		return async (dispatch) => {
			dispatch(Action.itemSetLoading(true));
			const item = await ServerDataService.itemLoad(id);
			dispatch(Action.itemLoadData(item));
			dispatch(Action.itemSetLoading(false));
		};
	},

	itemCreate() {
		return async (dispatch) => {
			dispatch(Action.itemSetLoading(true));
			const item = await ServerDataService.itemCreate();
			dispatch(Action.itemLoadData(item));
			dispatch(Action.itemSetLoading(false));
		};
	},

	itemDelete(id) {
		return async (dispatch) => {
			dispatch(Action.itemsSetLoading(true));
			const response = { result: true, error: null };
			try {
				await ServerDataService.itemDelete(id);
			} catch (err) {
				response.result = false;
				response.error = err;
			}
			const items = await ServerDataService.itemsLoad();
			dispatch(Action.itemsLoadData(items));
			dispatch(Action.topExpensiveSet(getMostExpensive(items)));
			dispatch(Action.topCheapestSet(getCheapest(items)));
			dispatch(Action.itemsSetLoading(false));
			return response;
		};
	},

	itemSave(item) {
		return async (dispatch) => {
			dispatch(Action.itemSetSaving(true));
			const response = { result: true, error: null, recordId: null };
			try {
				response.recordId = await ServerDataService.itemSave(item);
			} catch (err) {
				response.result = false;
				response.error = err;
			}
			dispatch(Action.itemSetSaving(false));
			return response;
		};
	},

	remindersLoad() {
		return async (dispatch) => {
			dispatch(Action.remindersSetLoading(true));
			const reminders = await ServerDataService.remindersLoad();
			dispatch(Action.remindersLoadData(reminders));
			dispatch(Action.remindersSetLoading(false));
		};
	},

	profileLoad() {
		return async (dispatch) => {
			dispatch(Action.profileSetLoading(true));
			const profile = await ServerDataService.profileLoadJSONData();
			dispatch(Action.profileLoadData(profile));
			dispatch(Action.profileSetLoading(false));
		};
	},
};

function getMostExpensive(items) {
	return items
		.slice()
		.filter(({ custrecord_pcpart_price }) => Type.Number.is(custrecord_pcpart_price))
		.sort((a, b) => b.custrecord_pcpart_price - a.custrecord_pcpart_price)
		.slice(0, 5);
}

function getCheapest(items) {
	return items
		.slice()
		.filter(({ custrecord_pcpart_price }) => Type.Number.is(custrecord_pcpart_price))
		.sort((a, b) => a.custrecord_pcpart_price - b.custrecord_pcpart_price)
		.slice(0, 5);
}

function getChartData(items) {
	const vendors = {};
	items.forEach(({ custrecord_pcpart_vendor_name }) => {
		if (vendors[custrecord_pcpart_vendor_name] !== undefined) {
			vendors[custrecord_pcpart_vendor_name] += 1;
		} else {
			vendors[custrecord_pcpart_vendor_name] = 1;
		}
	});
	const data = [];
	for (const [vendor, itemsCount] of Object.entries(vendors)) {
		data.push({
			name: vendor,
			y: itemsCount,
		});
	}
	return [
		{
			name: 'Number of Items',
			data,
		},
	];
}