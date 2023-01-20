import { CSSProperties, forwardRef } from 'react';
// types
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { useForwardedRef } from '@/helpers';
// styles
import BoxWrapper from './StyledBox';

export interface BoxProps extends HTMLMotionProps<'div'> {
  constrained?: boolean;
  $flexgrow?: boolean;
  $hide?: boolean;
  $isRelative?: boolean;
  $withGutter?: boolean;
  backgroundcolor?: CSSProperties['background'] | Record<string, CSSProperties['background']>;
  borderradius?: CSSProperties['borderRadius'] | Record<string, CSSProperties['borderRadius']>;
  children?: React.ReactNode;
  flexalign?: CSSProperties['alignItems'] | Record<string, CSSProperties['alignItems']>;
  flexalignself?: CSSProperties['alignSelf'] | Record<string, CSSProperties['alignSelf']>;
  flexdirection?: CSSProperties['flexDirection'] | Record<string, CSSProperties['flexDirection']>;
  flexgap?: CSSProperties['gap'] | Record<string, CSSProperties['gap']>;
  flexheight?: CSSProperties['height'] | Record<string, CSSProperties['height']>;
  flexjustify?: CSSProperties['justifyContent'] | Record<string, CSSProperties['justifyContent']>;
  flexmargin?: CSSProperties['margin'] | Record<string, CSSProperties['margin']>;
  flexpadding?: CSSProperties['padding'] | Record<string, CSSProperties['padding']>;
  flexwrap?: CSSProperties['flexWrap'] | Record<string, CSSProperties['flexWrap']>;
  minheight?: CSSProperties['minHeight'] | Record<string, CSSProperties['minHeight']>;
  screensizes?: number | Record<string, number>;
  width?: CSSProperties['width'] | Record<string, CSSProperties['width']>;
}

const Box = forwardRef((props: BoxProps, ref): JSX.Element => {
  const boxRef = useForwardedRef(ref);

  return <BoxWrapper ref={boxRef} {...props} />;
});

Box.displayName = 'Box';

Box.defaultProps = {
  flexalign: 'center',
  flexdirection: 'column',
  flexwrap: 'nowrap',
  flexjustify: 'center',
  width: '100%',
};

export default Box;
