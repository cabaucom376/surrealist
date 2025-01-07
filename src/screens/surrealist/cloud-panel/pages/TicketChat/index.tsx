import { Box, Button, Group, ScrollArea, Text } from "@mantine/core";
import classes from "./style.module.scss";
import { PrimaryTitle } from "~/components/PrimaryTitle";
import { Icon } from "~/components/Icon";
import { iconArrowLeft } from "~/util/icons";
import { useLocation } from "wouter";

export interface TicketChatPageProps {
	params: any;
}

export function TicketChatPage({ params }: TicketChatPageProps) {
	const [, navigate] = useLocation();

	const id = params?.id ?? 0;

	if (id === 0) {
		return <div />;
	}

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
				<Box
					mx="auto"
					maw={900}
					pb={96}
				>
					<Group
						wrap="nowrap"
						align="start"
					>
						<Box flex={1}>
							<PrimaryTitle>Ticket Conversation #{id}</PrimaryTitle>
							<Button
								mt="sm"
								variant="light"
								color="slate"
								leftSection={<Icon path={iconArrowLeft} />}
								onClick={() => navigate("/cloud/tickets")}
								size="xs"
							>
								Back to overview
							</Button>
						</Box>
					</Group>
				</Box>
			</ScrollArea>
		</Box>
	);
}

export default TicketChatPage;
