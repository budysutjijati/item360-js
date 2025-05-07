import query, { runSuiteQL } from 'N/query';
import record from 'N/record';
import { Async } from '@uif-js/core';
import * as ItemRecord from '../data/ItemRecord';
import * as VendorRecord from '../data/VendorRecord';
import * as CategoryList from '../data/CategoryList';

export default {
	// Items
	itemsLoad: async () => {
		const itemFields = [
			`${ItemRecord.Type}.${ItemRecord.FieldName.ID}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.NAME}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.CATEGORY}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.DESCRIPTION}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.PRICE}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.SOLD_QUANTITY}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.RELEASE}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.WEIGHT}`,
			`${ItemRecord.Type}.${ItemRecord.FieldName.IN_STOCK}`,
			`${VendorRecord.Type}.${VendorRecord.FieldName.NAME} AS ${ItemRecord.FieldName.VENDOR_NAME}`,
			`${VendorRecord.Type}.${VendorRecord.FieldName.ID} AS ${ItemRecord.FieldName.VENDOR_ID}`,
			`${CategoryList.Type}.${CategoryList.FieldName.NAME} AS ${ItemRecord.FieldName.CATEGORY_NAME}`,
		];
		const vendorJoin = `LEFT OUTER JOIN ${VendorRecord.Type} ON ${ItemRecord.Type}.${ItemRecord.FieldName.VENDOR} = ${VendorRecord.Type}.${VendorRecord.FieldName.ID}`;
		const categoryJoin = `LEFT OUTER JOIN ${CategoryList.Type} ON ${ItemRecord.Type}.${ItemRecord.FieldName.CATEGORY} = ${CategoryList.Type}.${CategoryList.FieldName.ID}`;
		const itemsSuiteQL = `SELECT ${itemFields}
                              FROM ${ItemRecord.Type} ${vendorJoin} ${categoryJoin}`;
		const vendorRecordIdSuiteQl = `SELECT internalid
                                       from customrecordtype
                                       where scriptid = UPPER('${VendorRecord.Type}')`;

		const [items, vendorRecordIdArray] = await Promise.all([
			runSuiteQL.promise({
				query: itemsSuiteQL,
			}),
			runSuiteQL.promise({
				query: vendorRecordIdSuiteQl,
			}),
		]);

		const vendorRecordId = Number(vendorRecordIdArray.asMappedResults()[0].internalid);

		await artificialDelay();
		const result = items.asMappedResults().map((item) => {
			return {
				...item,
				vendorRecordId,
			};
		});
		return result;
	},

	// Item
	itemLoad: async (id) => {
		await artificialDelay();
		return await record.load.promise({
			type: ItemRecord.Type,
			id,
			isDynamic: true,
		});
	},

	itemCreate: async () => {
		await artificialDelay();
		return await record.create.promise({
			type: ItemRecord.Type,
			isDynamic: true,
		});
	},

	itemSave: async (item) => {
		await artificialDelay();
		return await item.save.promise();
	},

	itemDelete: async (id) => {
		await artificialDelay();
		return await record.delete.promise({
			type: ItemRecord.Type,
			id,
		});
	},

	// Reminders
	remindersLoad: async () => {
		await artificialDelay();
		return [
			{
				description: 'First reminder',
				count: 42,
				color: 'info',
			},
			{
				description: 'Second reminder',
				count: 24,
				color: 'success',
			},
			{
				description: 'Third reminder',
				count: 12,
				color: 'danger',
			},
		];
	},

	// Profile
	profileLoadJSONData: async () => {
		const response = await fetch('/spa-app/com.netsuite.uifitem360/item360/assets/UserData.json');
		const data = await response.json();
		await artificialDelay();
		return data;
	},
};

// Generates random number in given range
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Creates an artificial random delay - used in order for loaders/skeletons to be visible
async function artificialDelay() {
	await Async.delay(getRandomInt(1000, 2000));
}