import { IconProps } from '@primer/octicons-react';
import React from 'react';
import { SxProp } from '../sx';
import { ComponentProps } from '../utils/types';
declare const Octicon: import("styled-components").StyledComponent<React.ForwardRefExoticComponent<{
    icon: React.ElementType;
    color?: string | undefined;
} & IconProps & React.RefAttributes<SVGSVGElement>>, any, SxProp, never>;
export type OcticonProps = ComponentProps<typeof Octicon>;
export default Octicon;
