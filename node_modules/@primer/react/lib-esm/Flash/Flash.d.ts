import { SxProp } from '../sx';
import { ComponentProps } from '../utils/types';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';
type StyledFlashProps = {
    variant?: 'default' | 'warning' | 'success' | 'danger';
    full?: boolean;
} & SxProp;
declare const StyledFlash: import("styled-components").StyledComponent<"div", any, {
    variant?: "success" | "danger" | "default" | "warning" | undefined;
    full?: boolean | undefined;
} & SxProp, never>;
export type FlashProps = ComponentProps<typeof StyledFlash>;
declare const Flash: PolymorphicForwardRefComponent<"div", StyledFlashProps>;
export default Flash;
