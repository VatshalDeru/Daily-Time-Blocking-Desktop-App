import type React from "react";

type dimensions = {
    width: number;
    height: number
}

// type HexColor = `#${string}`;

type ButtonProps = {
    icon?: React.ReactNode;
    children?: string;
    onClick?: () => void;
    backgroundColor?: string;
    btnDimensions?: dimensions;
    extraStyles?: React.CSSProperties
}

export default function Button({ icon, onClick, btnDimensions, backgroundColor, extraStyles, children }: ButtonProps) {
    return <button 
        // className={variant} 
        onClick={onClick} 
        style={{
            ...extraStyles,
            width: btnDimensions?.width+'em', 
            height: btnDimensions?.height+ 'em',
            "--bgCol": backgroundColor,
        } as React.CSSProperties}
    >
        {icon ?? children}
    </button>
}