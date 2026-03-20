import React, { HTMLAttributes } from 'react';
import { SxProp } from '../sx';
export type CounterLabelProps = React.PropsWithChildren<HTMLAttributes<HTMLSpanElement> & {
    scheme?: 'primary' | 'secondary';
} & SxProp>;
declare const CounterLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    scheme?: "primary" | "secondary" | undefined;
} & SxProp & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLSpanElement>>;
export default CounterLabel;
