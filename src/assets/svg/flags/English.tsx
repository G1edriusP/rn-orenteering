import React, { memo } from 'react';

// Components
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

// Constants
import colors from 'constants/colors';

type Props = {
  size: number;
  selected: boolean;
};

const Lithuania: React.FC<Props> = ({ size, selected }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 496 331"
      style={[
        {
          aspectRatio: 496 / 331,
        },
        selected && {
          borderWidth: 2,
          borderColor: colors.BLACK,
          borderRadius: 4,
        },
      ]}
    >
      <Path
        fill="#103B9B"
        d="M461.057 330.58H34.941c-19.155 0-34.684-15.528-34.684-34.684V34.942C.257 15.787 15.785.258 34.941.258h426.115c19.155 0 34.684 15.528 34.684 34.684v260.954c0 19.155-15.528 34.684-34.683 34.684z"
      ></Path>
      <Path
        fill="#fff"
        d="M459.956.258h-44.608L247.999 111.824 80.649.258H31.27C14.142.258.256 14.144.256 31.272v22.581l167.35 111.566L.258 276.985v18.911c0 19.155 15.528 34.684 34.684 34.684h45.707l167.35-111.567 167.35 111.566h46.809c18.548 0 33.583-15.035 33.583-33.583v-20.012l-167.35-111.565 167.35-111.566v-17.81C495.74 16.28 479.719.258 459.956.258z"
      ></Path>
      <Path
        fill="#ED1F34"
        d="M12.816 322.206c6.169 5.219 14.142 8.373 22.856 8.373h18.179l220.945-147.296 208.385 138.923 12.547-26.569.001-.033L274.486 147.76 483.18 8.63C477.011 3.411 469.038.257 460.324.257h-18.18L221.213 147.561 12.816 8.631C5.137 15.125.257 24.828.257 35.674v.337l220.659 147.461-208.1 138.733z"
      ></Path>
      <Path
        fill="#fff"
        d="M495.74 120.825H292.592V.258h-89.186v120.567H.258v89.187h203.148V330.58h89.186V210.012H495.74v-89.187z"
      ></Path>
      <Path
        fill="#ED1F34"
        d="M495.74 141.47H271.947V.258h-47.896V141.47H.258v47.897h223.793V330.58h47.896V189.367H495.74V141.47z"
      ></Path>
    </Svg>
  );
};

export default memo(Lithuania);
