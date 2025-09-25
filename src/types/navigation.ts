import { EventSourceEnum } from './event';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: string,
    source: EventSourceEnum
  }
};
