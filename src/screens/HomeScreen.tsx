import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { EventList } from '../components';
import { RootStackParamList } from '../types/navigation';
import { Event } from '../types/event';
import { eventStore } from '../stores';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const onViewEventDetails = (event: Event) => {
    navigation.navigate('Details', {
      id: event.id,
      source: event.source,
    });
  };

  useEffect(() => {
    eventStore.fetchEvents();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <EventList onViewEventDetails={onViewEventDetails} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
