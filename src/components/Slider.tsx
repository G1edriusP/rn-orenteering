import React, { memo } from "react";
import { useCallbackOne } from "use-memo-one";

// Styles
import styles from "styles/components/Slider";

// Components
import { Text, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

type Props = {
  type: string;
  values: number[];
  onChange: (type: string, value: []) => {};
  subtitle: string;
};

const Slider: React.FC<Props> = ({ type, values = [], onChange, subtitle }) => {
  const customMarker = useCallbackOne(e => <View style={[styles.rangeSliderMarker]} />, []);

  return (
    <View style={styles.rangeSliderRoot}>
      <Text style={styles.rangeSliderValue}>
        <Text>
          {Math.round(values[0])} {subtitle}
        </Text>
        <Text> - </Text>
        <Text>
          {Math.round(values[1])} {subtitle}
        </Text>
      </Text>
      <View style={styles.rangeSliderWrap}>
        <View style={styles.rangeSliderBehindTrack} />
        <MultiSlider
          values={values}
          onValuesChange={val => onChange && onChange(type, val)}
          sliderLength={rangeSliderWidth}
          min={0}
          max={Math.ceil(values[1])}
          step={1}
          isMarkersSeparated
          selectedStyle={styles.rangeSliderSelected}
          trackStyle={styles.rangeSliderTrack}
          customMarkerLeft={customMarker}
          customMarkerRight={customMarker}
        />
      </View>
    </View>
  );
};

export default memo(Slider);
