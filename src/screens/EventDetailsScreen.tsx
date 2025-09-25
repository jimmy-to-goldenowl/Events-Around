import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { RootStackParamList } from '../types/navigation';
import { AutoHeightImage } from '../components';
import { formatDateTime } from '../utils/date';
import { eventStore } from '../stores';
import { EventSourceEnum } from '../types/event';
import { formatPrice } from '../utils/number';

const EventDetailsScreen = observer(() => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  
  useEffect(() => {
    const eventId = route.params.id ?? null
    const eventSource = route.params.source ?? null
    if(eventId && eventSource) {
      eventStore.getSelectedEvent(eventId, eventSource)
    }

    return () => {
      eventStore.clearSelectedEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderEventPrice = () => {
    switch(eventStore.selectedEvent!.source) {
      case EventSourceEnum.YELP:
        return (
          <Text className="text-md mt-1">
            Estimated cost:
            <Text className="text-md font-semibold">{` ${eventStore.selectedEvent!.estimatedCost}`}</Text>
          </Text>
        )
      case EventSourceEnum.FOURSQUARE:
        return (
          <Text className="text-md mt-1">
            Price:
            <Text className="text-md font-semibold">{` $${formatPrice(eventStore.selectedEvent!.price)}`}</Text>
          </Text>
        )
      case EventSourceEnum.TICKETMASTER:
        return (
          <View className="mt-1 gap-1">
            <Text className="text-md">Price ranges:</Text>
            {eventStore.selectedEvent!.priceRanges.map((range, i) => (
              <View key={i}>
                <Text className="text-md font-semibold">{`$${formatPrice(range.min)} - $${formatPrice(range.max)}`}</Text>
              </View>
            ))}
          </View>
        )
      default:
        return <View />
    }
  }

  if(eventStore.selectedEventError) {
    return <Text className="text-md font-semibold text-center color-red-500 mt-2">{eventStore.selectedEventError}</Text>;
  }

  if(!eventStore.selectedEvent) {
    return <ActivityIndicator className='my-2' />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="p-4">
        <AutoHeightImage uri={eventStore.selectedEvent!.images[0]} />
        <View className="mt-2 mb-4 gap-2">
          <Text className="text-2xl font-bold text-center">{eventStore.selectedEvent!.name}</Text>
          {!!eventStore.selectedEvent!.category && (
            <Text className="text-xs font-normal self-center color-gray-500 bg-slate-200 px-1.5 py-1 rounded-xl">{eventStore.selectedEvent!.category}</Text>
          )}
        </View>
        <Text className="text-md mt-1">
          Start date:
          <Text className='text-md font-semibold'>{` ${formatDateTime(eventStore.selectedEvent!.startTime)}`}</Text>
        </Text>
        {!!eventStore.selectedEvent!.endTime && (
          <Text className="text-md mt-1">
            End date:
            <Text className='text-md font-semibold'>{` ${formatDateTime(eventStore.selectedEvent!.endTime)}`}</Text>
          </Text>
        )}
        <Text className="text-md mt-1">
          Location:
          <Text className='text-md font-semibold'>{` ${eventStore.selectedEvent!.location}`}</Text>
        </Text>
        {renderEventPrice()}

        <Text className="text-md mt-4">Description:</Text>
        <Text className="text-lg mt-1">{eventStore.selectedEvent!.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
});

export default EventDetailsScreen;
