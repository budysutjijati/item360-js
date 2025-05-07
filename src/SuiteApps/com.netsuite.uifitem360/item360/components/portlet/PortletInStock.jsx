import { Portlet, Skeleton, StackPanel } from '@uif-js/component';
import { Style, Theme, useStyles } from '@uif-js/core';

export default function PortletInStock({ loading, data }) {
	return (
		<Portlet title={'Stock Status'}>
			{loading ? <PortletIsOnlineSkeleton /> : <PortletIsOnlineContent data={data} />}
		</Portlet>
	);
}

function PortletIsOnlineSkeleton() {
	return (
		<StackPanel alignment={StackPanel.Alignment.CENTER} justification={StackPanel.Justification.SPACE_AROUND} outerGap={StackPanel.GapSize.M}>
			<StackPanel.Item>
				<Skeleton width={170} height={45} />
			</StackPanel.Item>
			<StackPanel.Item>
				<Skeleton width={170} height={45} />
			</StackPanel.Item>
		</StackPanel>
	);
}

function PortletIsOnlineContent({ data }) {
	let inStock = 0;
	let outOfStock = 0;
	data.forEach((item) => {
		item.custrecord_pcpart_instock === 'T' ? inStock++ : outOfStock++;
	});

	return (
		<StackPanel alignment={StackPanel.Alignment.CENTER} justification={StackPanel.Justification.SPACE_AROUND} outerGap={StackPanel.GapSize.M}>
			<StackPanel.Item>
				<PortletIsOnlineNumber type={PortletIsOnlineNumber.Type.IN_STOCK}>{`${inStock} IN STOCK`}</PortletIsOnlineNumber>
			</StackPanel.Item>
			<StackPanel.Item>
				<PortletIsOnlineNumber type={PortletIsOnlineNumber.Type.OUT_OF_STOCK}>{`${outOfStock} OUT OF STOCK`}</PortletIsOnlineNumber>
			</StackPanel.Item>
		</StackPanel>
	);
}

const PortletIsOnlineNumberType = Object.freeze({
	IN_STOCK: 'inStock',
	OUT_OF_STOCK: 'outOfStock',
});

function PortletIsOnlineNumber({ type, children }) {
	const style = useStyles((theme) => {
		const { name, tokens } = theme;

		const typeClass = {
			[PortletIsOnlineNumber.Type.IN_STOCK]: Style.empty(),
			[PortletIsOnlineNumber.Type.OUT_OF_STOCK]: Style.empty(),
		};

		let root;

		switch (name) {
			case Theme.Name.REFRESHED: {
				root = Style.of`
					font-size: ${tokens.fontSizeLarge};
					font-weight: ${tokens.fontWeightSemiBold};
					&.${String(typeClass[PortletIsOnlineNumber.Type.IN_STOCK])} {
						color: ${tokens.colorTextUtilitySuccess};
					}
					&.${String(typeClass[PortletIsOnlineNumber.Type.OUT_OF_STOCK])} {
						color: ${tokens.colorTextUtilityError};
					}
				`;
				break;
			}
			case Theme.Name.REDWOOD:
			default: {
				root = Style.of`
					font-size: ${tokens.fontSizeBodyMD};
					font-weight: ${tokens.fontWeightSemiBold};
					&.${String(typeClass[PortletIsOnlineNumber.Type.IN_STOCK])} {
						color: ${tokens.colorLightTextSuccess};
					}
					&.${String(typeClass[PortletIsOnlineNumber.Type.OUT_OF_STOCK])} {
						color: ${tokens.colorLightTextDanger};
					}
				`;
				break;
			}
		}

		return {
			root,
			type: typeClass,
		};
	});

	return <div class={[style.root, style.type[type]]}>{children}</div>;
}

PortletIsOnlineNumber.Type = PortletIsOnlineNumberType;