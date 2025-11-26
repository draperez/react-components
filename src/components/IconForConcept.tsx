import { ComponentProps } from "react"
import { IconType } from "react-icons"

export type IconMap = Record<string, IconType>;

export type IconComponentProps<T extends IconMap> = {
    concept: keyof T;
} & ComponentProps<IconType>;

export function createIconComponent<T extends IconMap>(
    icons: T,
    defaultClassName: string = ""
) {
    return ({ concept, className, ...rest }: IconComponentProps<T>) => {
        const Icon = (icons[concept] || (() => <></>)) as IconType;
        return (
            <Icon
                {...rest}
                className={`${defaultClassName} ${className || ""}`}
            />
        );
    };
}