import React, { memo } from 'react';

// Components
import Svg, { Path } from 'react-native-svg';

// Constants
import colors from 'constants/colors';

type Props = {
  size: number;
  color?: string;
};

const Profile: React.FC<Props> = ({ size }) => {
  return (
    <Svg height={size} width={size} viewBox='0 0 444 451' style={{ aspectRatio: 444 / 451 }}>
      <Path
        fill={colors.LIGHT_GREY}
        d='M441.69 215.995l-.93.88c-9.82 3.16-29.22 8.47-34.58 1.93-1.11-1.37-1.16-5.49-1.66-13.73-.52-8.46-.34-1.72-1-16.93-.19-4.24-.32-8.21-2.35-8.84-.69-.23-2.29-.24-2.17.46 1 5.55 1.32 5.56 1.68 11 .4 6.24.34 6.18.66 13.89.4 9 3.3 15.23-.45 16.53-2.42.84 0 0-3.72 1-8.92 2.43-7.77 2.91-23.55 6.41a172.874 172.874 0 01-21.38 3.35c-5.77.54-15 1.07-32.73-.3-24.33-1.88-48.34-3.75-50.78-12.5-.09-.35 0-3.09.17-8.55.2-6.34.31-9.5.5-11.58 1.13-11.84 2.25-15.94 2.63-19.13.12-.94-3.15-1.33-3.3-.55-.7 3.72-1.51 5.05-2 11.43-.76 9.92-.51 11-.76 14.95-.48 7.64.54 10.15-.24 13.27-.12.49-1.43 1.27-8.35 1.53a85.272 85.272 0 01-13.87-.61 100.397 100.397 0 01-14.08-2.91c-8-52.3 26.78-97.18 71.19-113.25a58.113 58.113 0 01-22.172-41.151 58.117 58.117 0 0115.302-44.17 57.608 57.608 0 0189.955 6.916 57.615 57.615 0 019.885 32.565 57.999 57.999 0 01-9.27 31.53 58.737 58.737 0 01-13.28 14.44c45.75 16.99 81.03 64.72 70.65 112.12z'
      />
      <Path
        fill={colors.DARK_BLUE}
        opacity={0.35}
        d='M440.76 216.875L166 450.955l-81.5-81-84.5-85 293.75-266.56a58.109 58.109 0 00-15.316 44.162 58.118 58.118 0 0022.156 41.158c-44.41 16.07-79.22 61-71.19 113.25a100.54 100.54 0 0014.08 2.91c4.599.58 9.238.784 13.87.61 6.92-.26 8.23-1 8.35-1.53.78-3.12-.24-5.63.24-13.27.25-4 0-5 .76-14.95.49-6.38 1.3-7.71 2-11.43.15-.78 3.42-.39 3.3.55-.38 3.19-1.5 7.29-2.63 19.13-.19 2.08-.3 5.24-.5 11.58-.18 5.46-.26 8.2-.17 8.55 2.44 8.75 26.45 10.62 50.78 12.5 17.7 1.37 27 .84 32.73.3 7.19-.669 14.33-1.788 21.38-3.35 15.78-3.5 14.63-4 23.55-6.41 3.72-1 1.3-.16 3.72-1 3.75-1.3.85-7.49.45-16.53-.32-7.71-.26-7.65-.66-13.89-.36-5.41-.67-5.42-1.68-11-.12-.7 1.48-.69 2.17-.46 2 .63 2.16 4.6 2.35 8.84.66 15.21.48 8.47 1 16.93.5 8.24.55 12.36 1.66 13.73 5.44 6.57 24.79 1.26 34.61-1.9z'
      />
    </Svg>
  );
};

export default memo(Profile);
