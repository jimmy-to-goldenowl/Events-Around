import { Event as EventType } from '../../types/event';

export type SectionType = {
  category: string;
  data: EventType[];
};

export interface EventListProps {
  onViewEventDetails: (event: EventType) => void
}
