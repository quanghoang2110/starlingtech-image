import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import FastImage, {
  type FastImageProps,
  type ImageStyle,
} from 'react-native-fast-image';
import { useThemeContext, appSize, AppBlock } from '@starlingtech/element';

interface Props extends FastImageProps {
  radius?: number;
  width?: number;
  height?: number;
}

export default function Image(props: Props) {
  const { width, height, radius } = props;
  const { colors } = useThemeContext();

  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
  }, [props.source]);

  const style: ImageStyle = {
    ...(width !== undefined && { width: appSize(width) }),
    ...(height !== undefined && { height: appSize(height) }),
    ...(radius !== undefined && { borderRadius: appSize(radius) }),
  };

  if (imageError) {
    return (
      <AppBlock
        width={width}
        height={height}
        radius={radius}
        style={[style, props.style]}
      />
    );
  }

  const tmpProps = {
    ...props,
    width: undefined,
    height: undefined,
    radius: undefined,
  };
  delete tmpProps.width;
  delete tmpProps.height;
  delete tmpProps.radius;

  return (
    <FastImage
      {...tmpProps}
      style={[
        styles.image,
        style,
        props.style,
        isLoading && { backgroundColor: colors.skeleton },
      ]}
      onLoad={() => setIsLoading(false)}
      onError={() => setImageError(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
