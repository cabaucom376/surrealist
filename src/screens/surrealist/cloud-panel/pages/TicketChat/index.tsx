import {
	Avatar,
	Badge,
	Box,
	Button,
	Center,
	Divider,
	Group,
	Menu,
	Paper,
	ScrollArea,
	Text,
	Textarea,
} from "@mantine/core";
import { format, formatRelative, subDays } from "date-fns";
import classes from "./style.module.scss";
import { PrimaryTitle } from "~/components/PrimaryTitle";
import { Icon } from "~/components/Icon";
import { iconArrowLeft, iconChevronDown, iconClose, iconCursor, iconEdit } from "~/util/icons";
import { useLocation } from "wouter";
import { Spacer } from "~/components/Spacer";
import { AccountAvatar } from "~/components/AccountAvatar";
import { useCloudStore } from "~/stores/cloud";

export interface TicketChatPageProps {
	params: any;
}

export function TicketChatPage({ params }: TicketChatPageProps) {
	const [, navigate] = useLocation();
	const profile = useCloudStore((s) => s.profile);

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
						<PrimaryTitle>Ticket #{id}</PrimaryTitle>
						<Spacer />
						<Button
							variant="light"
							color="slate"
							leftSection={<Icon path={iconArrowLeft} />}
							onClick={() => navigate("/cloud/tickets")}
							size="xs"
						>
							Back to overview
						</Button>
					</Group>
					<Paper
						p="xl"
						mt="xl"
					>
						<Group
							wrap="nowrap"
							align="start"
							gap="xl"
						>
							<AccountAvatar />
							<Box flex={1}>
								<Text
									fw="500"
									c="bright"
									fz="lg"
								>
									{profile.name}
								</Text>
								<Text c="slate">
									{formatRelative(subDays(new Date(), 4), new Date())}
								</Text>
								<Text mt="md">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Architecto, cum officia? Modi suscipit ullam excepturi, adipisci
									facere illo sequi laboriosam quisquam corrupti. Sunt enim,
									deserunt repellendus id non sapiente mollitia.
								</Text>
								<Text>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Architecto, cum officia? Modi suscipit ullam excepturi, adipisci
									facere illo sequi laboriosam quisquam corrupti. Sunt enim,
									deserunt repellendus id non sapiente mollitia.
								</Text>
								<Text>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Architecto, cum officia? Modi suscipit ullam excepturi, adipisci
									facere illo sequi laboriosam quisquam corrupti. Sunt enim,
									deserunt repellendus id non sapiente mollitia.
								</Text>
								<Text>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Architecto, cum officia? Modi suscipit ullam excepturi, adipisci
									facere illo sequi laboriosam quisquam corrupti. Sunt enim,
									deserunt repellendus id non sapiente mollitia.
								</Text>
							</Box>
						</Group>
					</Paper>

					<PrimaryTitle mt="xl">1 Reply</PrimaryTitle>
					<Divider mt="xs" />

					<Paper
						p="xl"
						mt="xl"
					>
						<Group
							wrap="nowrap"
							align="start"
							gap="xl"
						>
							<AccountAvatar />
							<Box flex={1}>
								<Group gap="xs">
									<Text
										fw="500"
										c="bright"
										fz="lg"
									>
										John Doe
									</Text>
									<Badge
										color="blue"
										size="xs"
										variant="light"
									>
										Support agent
									</Badge>
								</Group>
								<Text c="slate">
									{formatRelative(subDays(new Date(), 3), new Date())}
								</Text>
								<Text mt="md">No</Text>
							</Box>
						</Group>
					</Paper>

					<Text
						ta="center"
						mt={42}
					>
						This ticket is open and our support team is working on it.
					</Text>

					<Group
						mt="xl"
						justify="center"
					>
						<Button
							variant="gradient"
							rightSection={<Icon path={iconCursor} />}
						>
							Send a reply
						</Button>
						<Button
							variant="light"
							color="slate"
							rightSection={<Icon path={iconClose} />}
						>
							Close ticket
						</Button>
					</Group>
				</Box>
			</ScrollArea>
		</Box>
	);
}

export default TicketChatPage;
