import { Box, ScrollArea } from "@mantine/core";
import classes from "./style.module.scss";

export function TicketsPage() {
	return (
		<Box
			flex={1}
			pos="relative"
		>
			<ScrollArea
				pos="absolute"
				scrollbars="y"
				type="scroll"
				inset={0}
				className={classes.scrollArea}
			>
				Test
			</ScrollArea>
		</Box>
	);
}

export default TicketsPage;
