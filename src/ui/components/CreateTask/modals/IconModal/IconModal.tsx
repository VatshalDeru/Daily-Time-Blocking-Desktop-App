import Button from "../../../Button/Button";
import { iconCategories, iconCategoryIcons } from "../../../../assets/iconSvg";
import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";
import { ModalContext } from "../../../../store/Modal/ModalContext";
import useClickOutside from "../../../../hooks/useClickOutside";
// import { useEffect } from "react";

const COLOURS = [
    '#F88E86',
    '#F27C49',
    '#F6C852',
    '#84B056',
    '#6B95C6',
    '#3D8760',
    '#C54F4E',
    '#2C66C4',
    '#FFFFFF',
]

const iconCategoryNames: string[] = [
    'Activities',
    'Animal',
    'Bathroom',
    'Clothes',
    'Digital & Apps',
    'Food & Drinks',
    'Health'
];

export default function IconModal({ taskColour, setCurrTask }) {
    const [selectedIconCategory, setSelectedIconCategory] = useState('Activities');
    const [selectedColour, setSelectedColour] = useState('#F88E86');
    const iconModalref = useRef<HTMLDivElement | null>(null)
    const { iconModal } = useContext(ModalContext);

    const handleChangeItemCategory = (iconName: string) => {
        console.log(iconName);
        setSelectedIconCategory(iconName)
    };

    const handlePickColour = (e: React.MouseEvent<HTMLButtonElement>, colour: string) => {
        setCurrTask((prevTask: any) => {
            return {
                ... prevTask,
                colour,
            }
        })
    };


    useClickOutside({ref: iconModalref, closeHandler: iconModal.hideModal});

    // console.log(tabler.icons)
    return <div className="iconModalContainer" ref={iconModalref}>
        <div className="header">
            <h3>Colour & Icon</h3>
            <div className="buttonContainer">
                <Button
                    onClick={iconModal.hideModal}
                    icon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6783 0.228713C10.7502 0.156831 10.8355 0.0998105 10.9295 0.060908C11.0234 0.0220056 11.1241 0.0019831 11.2258 0.0019831C11.3274 0.0019831 11.4281 0.0220056 11.5221 0.060908C11.616 0.0998105 11.7013 0.156831 11.7732 0.228713C11.8451 0.300595 11.9022 0.385932 11.9411 0.479851C11.98 0.573769 12 0.674431 12 0.776088C12 0.877745 11.98 0.978406 11.9411 1.07232C11.9022 1.16624 11.8451 1.25158 11.7732 1.32346L7.09686 6.00042L11.7732 10.6774L11.873 10.7987C11.9706 10.9477 12.0138 11.1258 11.9955 11.3029C11.9772 11.48 11.8985 11.6455 11.7725 11.7714C11.6466 11.8973 11.4811 11.9761 11.3039 11.9944C11.1268 12.0127 10.9487 11.9694 10.7997 11.8719L10.6783 11.7721L6.00058 7.09517L1.32287 11.7735C1.25088 11.8453 1.16545 11.9024 1.07143 11.9412C0.977413 11.9801 0.876661 12.0001 0.774925 12C0.673189 11.9999 0.572461 11.9798 0.478493 11.9409C0.384525 11.9019 0.299157 11.8448 0.227263 11.7728C0.155369 11.7008 0.0983573 11.6154 0.0594824 11.5214C0.0206075 11.4274 0.000631121 11.3267 0.000693729 11.2249C0.000756338 11.1232 0.0208567 11.0225 0.0598473 10.9286C0.0988378 10.8346 0.155955 10.7493 0.227938 10.6774L4.90566 6.00042L0.226589 1.32346L0.128153 1.20212C0.0298481 1.05314 -0.0140267 0.874798 0.00393662 0.697217C0.0218999 0.519636 0.100601 0.353692 0.226752 0.227403C0.352903 0.101114 0.518775 0.0222178 0.696362 0.00403452C0.87395 -0.0141488 1.05237 0.029495 1.20151 0.127597L1.32287 0.228713L6.00058 4.90432L10.6783 0.228713Z" fill="white"/>
                    </svg>}
                    variant="close"
                    btnDimensions={{
                        width: 2,
                        height:2,
                    }}
                    backgroundColor="#515152"
                />
            </div>
        </div>
        <div className="colourPicker">
            {COLOURS.map(colour => {
                return <button 
                    onClick={(e) => handlePickColour(e, colour)} 
                    className={taskColour === colour ? `selected`: ''} 
                    style={{backgroundColor: colour}}/>
            })}
        </div>
        <div className="iconCategories">
            <ul>
                {iconCategoryIcons.map((icon, index) => {
                        return <li>
                                <Icon onClick={() => handleChangeItemCategory(iconCategoryNames[index])} icon={icon} icon-name={iconCategoryNames[index]} width={20} height={20}/>
                            </li>
                    })}
            </ul>
        </div>
        <div className="iconsContainer">
            <h2>{selectedIconCategory}</h2>
                <ul>
                    {iconCategories[selectedIconCategory]?.map(icon => {
                        return <li>
                                <Icon icon={icon} width={20} height={20}/>
                            </li>
                    })}
                </ul>
        </div>
    </div>
}