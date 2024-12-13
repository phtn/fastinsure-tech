import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Image,
  Link,
  Tooltip,
  Avatar,
  AvatarGroup,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback } from "react";
import { ButtSex } from "./button/ripple";

interface SideSnapProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  onClose: VoidFunction;
}
export const SideSnap = ({ isOpen, onOpenChange }: SideSnapProps) => {
  return (
    <Drawer
      hideCloseButton
      backdrop="opaque"
      className="z-[250]"
      classNames={{
        base: "z-[250] data-[placement=right]:lg",
        body: "",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      size="lg"
    >
      <DrawerContent className="absolute z-[200] bg-white">
        <DrawerHeader className="absolute inset-x-0 top-0 z-[300] flex flex-row justify-between gap-2 border-b border-default-200/50 bg-content1/50 px-2 py-2 backdrop-blur-lg backdrop-saturate-150">
          <div className="flex w-full justify-start gap-2">
            <Button
              className="text-small font-medium text-default-500"
              size="sm"
              startContent={
                <svg
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85.75c-.908 0-1.702.328-2.265.933-.558.599-.835 1.41-.835 2.29V7.88c0 .801.23 1.548.697 2.129.472.587 1.15.96 1.951 1.06a.75.75 0 1 0 .185-1.489c-.435-.054-.752-.243-.967-.51-.219-.273-.366-.673-.366-1.19V3.973c0-.568.176-.993.433-1.268.25-.27.632-.455 1.167-.455h4.146c.479 0 .828.146 1.071.359.246.215.43.54.497.979a.75.75 0 0 0 1.483-.23c-.115-.739-.447-1.4-.99-1.877C9.51 1 8.796.75 7.996.75zM7.9 4.828c-.908 0-1.702.326-2.265.93-.558.6-.835 1.41-.835 2.29v3.905c0 .879.275 1.69.833 2.289.563.605 1.357.931 2.267.931h4.144c.91 0 1.705-.326 2.268-.931.558-.599.833-1.41.833-2.289V8.048c0-.879-.275-1.69-.833-2.289-.563-.605-1.357-.931-2.267-.931zm-1.6 3.22c0-.568.176-.992.432-1.266.25-.27.632-.454 1.168-.454h4.145c.54 0 .92.185 1.17.453.255.274.43.698.43 1.267v3.905c0 .569-.175.993-.43 1.267-.25.268-.631.453-1.17.453H7.898c-.54 0-.92-.185-1.17-.453-.255-.274-.43-.698-.43-1.267z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              }
              variant="flat"
            >
              Copy Link
            </Button>
            <Button
              className="text-small font-medium text-default-500"
              endContent={
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              }
              size="sm"
              variant="flat"
            >
              Event Page
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip content="Previous">
              <Button
                isIconOnly
                className="text-default-500"
                size="sm"
                variant="flat"
              >
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </Button>
            </Tooltip>
            <Tooltip content="Next">
              <Button
                isIconOnly
                className="text-default-500"
                size="sm"
                variant="flat"
              >
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </Tooltip>
          </div>
        </DrawerHeader>
        <DrawerBody className="pt-16">
          <div className="flex w-full items-center justify-center pt-4">
            <Image
              isBlurred
              isZoomed
              alt="Event image"
              className="aspect-square w-full hover:scale-110"
              height={300}
              src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/san-francisco.png"
            />
          </div>
          <div className="flex flex-col gap-2 py-4">
            <h1 className="text-2xl font-bold leading-7">
              SF Bay Area Meetup in November
            </h1>
            <p className="text-sm text-default-500">
              555 California St, San Francisco, CA 94103
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 flex-none overflow-hidden rounded-small border-1 border-default-200/50 text-center">
                  <div className="bg-default-100 py-0.5 text-tiny text-default-500">
                    Nov
                  </div>
                  <div className="flex h-6 items-center justify-center text-medium font-semibold text-default-500">
                    19
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-medium font-medium text-foreground">
                    Tuesday, November 19
                  </p>
                  <p className="text-small text-default-500">
                    5:00 PM - 9:00 PM PST
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-small border-1 border-default-200/50">
                  <svg
                    className="text-default-500"
                    height="20"
                    viewBox="0 0 16 16"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M2 6.854C2 11.02 7.04 15 8 15s6-3.98 6-8.146C14 3.621 11.314 1 8 1S2 3.62 2 6.854" />
                      <path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <Link
                    isExternal
                    showAnchorIcon
                    anchorIcon={
                      <svg
                        className="text-default-400 transition-[color,transform] group-hover:text-inherit group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    }
                    className="group gap-x-0.5 text-medium font-medium text-foreground"
                    href="https://www.google.com/maps/place/555+California+St,+San+Francisco,+CA+94103"
                    rel="noreferrer noopener"
                  >
                    555 California St suite 500
                  </Link>
                  <p className="text-small text-default-500">
                    San Francisco, California
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start gap-3">
                <span className="text-medium font-medium">About the event</span>
                <div className="flex flex-col gap-2 text-medium text-default-500">
                  <p>
                    Hey Bay Area! We are excited to announce our next meetup on
                    Tuesday, November 19th.
                  </p>
                  <p>
                    Join us for an evening of insightful discussions and
                    hands-on workshops focused on the latest developments in web
                    development and design. Our featured speakers will share
                    their experiences with modern frontend frameworks,
                    responsive design patterns, and emerging web technologies.
                    You&apos;ll have the opportunity to network with fellow
                    developers and designers while enjoying refreshments and
                    snacks.
                  </p>
                  <p>
                    During the main session, we&apos;ll dive deep into practical
                    examples of building scalable applications, exploring best
                    practices for component architecture, and understanding
                    advanced state management techniques. Our interactive
                    workshop portion will let you apply these concepts directly,
                    with experienced mentors available to provide guidance and
                    answer your questions. Whether you&apos;re a seasoned
                    developer or just starting your journey, you&apos;ll find
                    valuable takeaways from this session.
                  </p>

                  <p className="mt-4">
                    Brought to you by the{" "}
                    <Link
                      className="text-default-700"
                      href="https://nextui.org"
                    >
                      NextUI team
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start gap-3">
                <span className="text-small text-default-500">Hosted By</span>
                <div className="flex items-center gap-2">
                  <Avatar
                    name="NextUI"
                    size="sm"
                    src="https://nextui.org/android-chrome-192x192.png"
                  />
                  <span className="text-small text-default-500">
                    NextUI Team
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start gap-3">
                <span className="text-small text-default-500">105 Going</span>
                <div className="flex items-center gap-2">
                  <AvatarGroup
                    isBordered
                    classNames={{
                      base: "pl-2",
                      count: "text-default-500 text-tiny bg-default-100",
                    }}
                    size="sm"
                    total={101}
                  >
                    <Tooltip content="Alex">
                      <Avatar
                        className="data-[hover=true]:!translate-x-0"
                        name="Alex"
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                      />
                    </Tooltip>
                    <Tooltip content="Joe">
                      <Avatar
                        className="data-[hover=true]:!translate-x-0"
                        name="Joe"
                        src="https://i.pravatar.cc/150?u=a04258114e290267084"
                      />
                    </Tooltip>
                    <Tooltip content="John">
                      <Avatar
                        className="data-[hover=true]:!translate-x-0"
                        name="John"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                      />
                    </Tooltip>
                    <Tooltip content="Jane">
                      <Avatar
                        className="data-[hover=true]:!translate-x-0"
                        name="Jane"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                      />
                    </Tooltip>
                  </AvatarGroup>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter className="flex flex-col gap-1">
          <Link
            className="text-default-400"
            href="mailto:hello@nextui.org"
            size="sm"
          >
            Contact the host
          </Link>
          <Link
            className="text-default-400"
            href="mailto:hello@nextui.org"
            size="sm"
          >
            Report event
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const SideSnapII = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <ButtSex onClick={handleOpen}>Drop your panties</ButtSex>
      <Drawer
        classNames={{}}
        placement="right"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent className="z-[200]">
          {(onClose) => (
            <>
              <DrawerHeader className="absolute z-[300] flex size-96 flex-col gap-1 bg-white">
                Drawer Title
              </DrawerHeader>
              <DrawerBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
