// Item record ID
export const Type = 'customrecord_item360_pcpart';

// Item field names
export const FieldName = Object.freeze({
	NAME: 'name',
	ID: 'id',
	DESCRIPTION: 'custrecord_pcpart_description',
	CATEGORY: 'custrecord_pcpart_category',
	VENDOR: 'custrecord_pcpart_vendor',
	PRICE: 'custrecord_pcpart_price',
	SOLD_QUANTITY: 'custrecord_pcpart_soldquantity',
	RELEASE: 'custrecord_pcpart_release',
	WEIGHT: 'custrecord_pcpart_weight',
	IN_STOCK: 'custrecord_pcpart_instock',
	// Joined fields
	VENDOR_ID: 'custrecord_pcpart_vendor_id',
	VENDOR_NAME: 'custrecord_pcpart_vendor_name',
	CATEGORY_NAME: 'custrecord_pcpart_category_name',
});

// Scheme of the Item form displayed in the app
export const FormSchemeObject = [
	{
		title: 'Basic Information',
		fields: [FieldName.NAME, FieldName.DESCRIPTION, FieldName.CATEGORY, FieldName.VENDOR],
	},
	{
		title: 'Properties',
		fields: [FieldName.WEIGHT, FieldName.RELEASE],
	},
	{
		title: 'Sales',
		fields: [FieldName.PRICE, FieldName.SOLD_QUANTITY, FieldName.IN_STOCK],
	},
];