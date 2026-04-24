import { useEffect } from "react";

type useClickOutsideParams = {
    ref: React.RefObject<HTMLElement | null>,
    closeHandler: () => void,
}

export default function useClickOutside({ref, closeHandler}: useClickOutsideParams) {
    useEffect(() => {
        const handleClickOut = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target as Node)){
                closeHandler();
            }
        }

        document.addEventListener('mousedown', handleClickOut);

        return () => {
            document.removeEventListener("mousedown", handleClickOut)
        }
    },[ref, closeHandler])
};