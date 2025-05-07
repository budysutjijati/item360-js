import { useDispatch, useLayoutEffect } from '@uif-js/core';
import ItemRecordPage from '../item/ItemRecordPage.js';
import ItemRecordSkeleton from '../item/ItemRecordSkeleton';
import { Action } from '../../app/Action';
import * as RecordPage from '../../data/RecordPage';

export default function ItemPage(props) {
	const { mode = RecordPage.Mode.VIEW, id, item } = props;
	const { loading, saving, record } = item;

	const dispatch = useDispatch();
	useLayoutEffect(() => {
		if (mode === RecordPage.Mode.CREATE) {
			dispatch(Action.itemCreate());
		} else if (id !== undefined) {
			dispatch(Action.itemLoad(id));
		}
	}, [id, mode]);

	return loading ? <ItemRecordSkeleton /> : <ItemRecordPage record={record} saving={saving} mode={mode} />;
}