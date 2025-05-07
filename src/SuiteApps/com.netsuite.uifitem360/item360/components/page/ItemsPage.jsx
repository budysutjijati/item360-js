import { ApplicationHeader, StackPanel } from '@uif-js/component';
import { ContextType, Navigator, SystemIcon, useContext, useDispatch, useLayoutEffect } from '@uif-js/core';
import ItemsSkeleton from '../items/ItemsSkeleton';
import ItemsList from '../items/ItemsList';
import RootRoute from '../../app/RootRoute';
import { Action } from '../../app/Action';

function ItemsPage({ items }) {
	const { loading, data } = items;
	const dispatch = useDispatch();
	const navigator = useContext(ContextType.ROUTER_NAVIGATION);

	useLayoutEffect(() => {
		dispatch(Action.itemsLoad());
	}, []);

	const actions = [
		{
			label: 'Create new item',
			icon: SystemIcon.ADD,
			type: ApplicationHeader.ActionType.PRIMARY,
			action: () => {
				navigator.push(RootRoute.ITEM_CREATE);
			},
		},
	];

	return (
		<StackPanel.Vertical>
			<StackPanel.Item shrink={0}>
				<ApplicationHeader title={'Items'} icon={SystemIcon.ATTRIBUTES} actions={actions} />
			</StackPanel.Item>
			<StackPanel.Item grow={1}>
				{loading ? <ItemsSkeleton /> : <ItemsList data={data} />}
			</StackPanel.Item>
		</StackPanel.Vertical>
	);
}

export default ItemsPage;