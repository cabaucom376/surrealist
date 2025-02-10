import { Group, Badge, BoxProps } from "@mantine/core";
import { iconDesigner, iconDelete, iconClose, iconPin } from "~/util/icons";
import { ActionButton } from "../ActionButton";
import { PrimaryTitle } from "../PrimaryTitle";
import { Spacer } from "../Spacer";
import { Icon } from "../Icon";
import { usePullout } from "~/providers/Pullout";
import { PropsWithChildren } from "react";

export interface PulloutTitleProps extends BoxProps {
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	closeDisabled?: boolean;
}

export function PulloutTitle({
	leftSection,
	rightSection,
	closeDisabled,
	children,
	...other
}: PropsWithChildren<PulloutTitleProps>) {
	const { close, togglePin } = usePullout();

	return (
		<Group
			mb="md"
			gap="sm"
			{...other}
		>
			<PrimaryTitle>{children}</PrimaryTitle>

			{leftSection}

			<Spacer />

			{rightSection}

			<ActionButton
				label="Toggle pinned"
				onClick={togglePin}
			>
				<Icon path={iconPin} />
			</ActionButton>

			<ActionButton
				label="Close panel"
				disabled={closeDisabled}
				onClick={close}
			>
				<Icon path={iconClose} />
			</ActionButton>
		</Group>
	);
}
