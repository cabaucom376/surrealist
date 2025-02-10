import { Box, Drawer } from "@mantine/core";
import {
	type PropsWithChildren,
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { createHtmlPortalNode, InPortal, OutPortal } from "react-reverse-portal";
import { DrawerResizer } from "~/components/DrawerResizer";
import { PanelDragger } from "~/components/Pane/dragger";
import { usePanelMinSize } from "~/hooks/panels";
import { useStable } from "~/hooks/stable";

type OpenFunction = (content: ReactNode) => void;

const PORTAL_NODE = createHtmlPortalNode();
const PulloutContext = createContext<{
	open: OpenFunction;
	close: () => void;
	togglePin: () => void;
	isPinned: boolean;
} | null>(null);

/**
 * Access the pin panel functions
 */
export function usePullout() {
	const ctx = useContext(PulloutContext);

	return (
		ctx ?? {
			open: () => {},
			close: () => {},
			togglePin: () => {},
			isPinned: false,
		}
	);
}

export function PulloutProvider({ children }: PropsWithChildren) {
	const [content, setContent] = useState<ReactNode>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isPinned, setIsPinned] = useState(false);

	const open = useStable((content: ReactNode) => {
		setContent(content);
		setIsVisible(true);
		setIsPinned(false);
	});

	const close = useStable(() => {
		setContent(null);
		setIsVisible(false);
	});

	const togglePin = useStable(() => {
		setIsPinned((value) => !value);
	});

	const handle = useMemo(
		() => ({
			open,
			isPinned,
			close,
			togglePin,
		}),
		[isPinned],
	);

	const [width, setWidth] = useState(650);
	const [minPanelWidth, rootRef] = usePanelMinSize(width);

	return (
		<PulloutContext.Provider value={handle}>
			<Box
				h="100%"
				ref={rootRef}
			>
				<PanelGroup direction="horizontal">
					<Panel id="body">{children}</Panel>
					{isPinned && (
						<>
							<PanelDragger />
							<Panel
								id="content"
								defaultSize={minPanelWidth}
							>
								<OutPortal node={PORTAL_NODE} />
							</Panel>
						</>
					)}
				</PanelGroup>
			</Box>

			<InPortal node={PORTAL_NODE}>{content}</InPortal>

			<Drawer
				opened={isVisible && !isPinned}
				onClose={close}
				position="right"
				trapFocus={false}
				size={width}
				styles={{
					body: {
						height: "100%",
						display: "flex",
						flexDirection: "column",
					},
				}}
			>
				<DrawerResizer
					minSize={500}
					maxSize={1500}
					onResize={setWidth}
				/>

				<OutPortal node={PORTAL_NODE} />
			</Drawer>
		</PulloutContext.Provider>
	);
}
