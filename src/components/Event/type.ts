
import { Event as EventType } from '../../types/event';

export interface EventProps {
  data: EventType
  onViewDetails: (data: EventType) => void
}