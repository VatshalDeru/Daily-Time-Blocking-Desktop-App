
type ButtonVariant = "close" | "settings" | "delete" | "options" | "update" | "create-task";

type dimensions = {
    width: number;
    height: number
}

type ButtonProps = {
    icon?: React.ReactNode;
    children?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
    btnDimensions?: dimensions;
}

export default function Button({ icon, onClick, variant, btnDimensions, children }: ButtonProps) {
    return <button className={variant} onClick={onClick} style={{width: btnDimensions?.width+'em', height: btnDimensions?.height+ 'em'}}>
        {icon ?? children}
    </button>
}