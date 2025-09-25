import { ActivityIndicator, RefreshControl, SectionList, SectionListRenderItem, Text, View } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';

import {Event} from '../Event';
import { Event as EventType } from '../../types/event';
import { eventStore } from '../../stores';

import { EventListProps, SectionType } from './type';

export const EventList = observer(({ onViewEventDetails }: EventListProps) => {
  const renderItem: SectionListRenderItem<EventType, SectionType> = ({ item }) => (
    <Event data={item} onViewDetails={onViewEventDetails} />
  );

  const renderSeparator = () => <View className="h-4" />;

  const renderEmpty = () => <Text className="text-md text-center color-gray-500">No events found</Text>;

  const renderHeader = () => <Text className="text-xl font-bold color-gray-950 mb-2">What's happening around?</Text>;

  const renderSectionHeader = ({ section: { category } }: { section: SectionType }) => <Text className="text-lg font-bold color-gray-950 my-2">{category}</Text>;

  const onRefresh = () => {
    eventStore.fetchEvents();
  };

  if(eventStore.loading) {
    return <ActivityIndicator className='my-2' />;
  }

  if(eventStore.error) {
    return <Text className="text-md font-semibold text-center color-red-500 mt-2">{eventStore.error}</Text>;
  }

  return (
    <SectionList
      contentContainerClassName="p-4 bg-white"
      sections={
        Object.entries(eventStore.eventsByCategory).map(([category, events]) => ({
          category,
          data: events,
        })) as SectionType[]
      }
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
      renderSectionHeader={renderSectionHeader}
      ListHeaderComponent={renderHeader}
      stickySectionHeadersEnabled={false}
      refreshControl={
        <RefreshControl
          refreshing={eventStore.loading}
          onRefresh={onRefresh}
        />
      }
    />
  );
});
