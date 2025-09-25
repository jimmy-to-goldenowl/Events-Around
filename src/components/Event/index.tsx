import { Image, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

import { formatDateTime } from '../../utils/date';

import { EventProps } from './type';

export function Event({ data, onViewDetails }: EventProps) {
  const [imageError, setImageError] = useState<boolean>(false);

  const onPressViewDetails = () => {
    onViewDetails(data);
  };

  const onImageError = () => {
    setImageError(true);
  };

  return (
    <View className="border border-gray-300 bg-white shadow-sm rounded-xl p-4 gap-4">
      <Text className="text-md font-bold">{`${data.name} (${data.source})`}</Text>
      <View className="flex-row gap-3">
        {!imageError && <Image className="w-32 h-32 bg-slate-500 rounded-sm" source={{ uri: data.images[0] }} onError={onImageError} resizeMode="cover" />}
        <View className="flex-1 gap-2">
          <View className="flex-row justify-between items-center gap-2">
            {!!data.category && <Text className="text-xs font-normal color-gray-500 bg-slate-200 px-1.5 py-1 rounded-xl">{data.category}</Text>}
            <Text className="text-xs text-right flex-1">{formatDateTime(data.startTime)}</Text>
          </View>
          <Text className="text-sm italic" numberOfLines={2}>{data.location}</Text>
          <Text className="text-sm" numberOfLines={2}>{data.description}</Text>
          <TouchableOpacity className="p-2 rounded-md bg-green-600 self-start" onPress={onPressViewDetails}>
            <Text className="text-sm color-white">View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
