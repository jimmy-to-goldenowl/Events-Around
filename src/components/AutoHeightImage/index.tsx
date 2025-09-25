import { Image,  LayoutChangeEvent, View } from 'react-native';
import React, { useState } from 'react';

import { AutoHeightImageProps } from './type';

export const AutoHeightImage = ({uri, style}: AutoHeightImageProps) => {
  const [parentWidth, setParentWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);

    if (width) {
      Image.getSize(uri, (originalWidth, originalHeight) => {
        const calculatedHeight = (originalHeight / originalWidth) * width;
        setHeight(calculatedHeight);
      });
    }
  };

  return (
    <View className="w-full" onLayout={handleLayout}>
      <Image source={{ uri }} style={[style, { width: parentWidth, height }]} resizeMode="contain"/>
    </View>
  );
};
