
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const items = [
  {
    id: 1,
    step: "Step 1",
    title: "Get an activation code.",
    description:
    "If you haven't already, ask your manager to generate one for you. Activation codes are valid for 48 hours from the time it was created.",
  },
  {
    id: 2,
    step: "Step 2",
    title: "Enter your activation code.",
    description: "Enter your activation code and hit Activate. ",
  },
  {
    id: 3,
    step: "Step 3",
    title: "Refresh the page.",
    description:
      "If your page didn't update to reflect your AGENT status, reload the page.",
  },
  {
    id: 4,
    step: "Step 4",
    title: "Wrap up",
    description:
      "A successful activation should change your badge status from NEW to AGENT.",
  },
]

export function TimelineComponent() {
  return (
    <Timeline defaultValue={3} className="flex h-full">
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="group-data-[orientation=vertical]/timeline:ms-10"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-[26px]" />
            <TimelineDate className="text-macd-blue font-semibold">{item.step}</TimelineDate>
            <TimelineTitle className="text-lg tracking-tight text-white">{item.title}</TimelineTitle>
            <TimelineIndicator className="bg-white group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-[0.33px] border-macl-gray group-data-[orientation=vertical]/timeline:-left-7">
              <span>{index + 1}</span>
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
