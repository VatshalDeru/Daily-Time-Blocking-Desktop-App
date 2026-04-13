import Button from "../../../Button/Button";
import { iconCategories, iconCategoryIcons } from "../../../../assets/iconSvg";
import { Icon } from "@iconify/react";
import { useContext, useRef, useState } from "react";
import { ModalContext } from "../../../../store/Modal/ModalContext";
import useClickOutside from "../../../../hooks/useClickOutside";
import { TaskContext } from "../../../../store/Task/TaskContext";
// import { useEffect } from "react";

import type { IconCategoryNames } from "../../../../assets/iconSvg";
import CloseIcon from "../../../icons/CloseIcon";

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


const iconCategoryNames: IconCategoryNames[] = [
    'Activities',
    'Animal',
    'Bathroom',
    'Clothes',
    'Digital & Apps',
    'Food & Drinks',
    'Health'
];


export default function IconModal() {
    const [selectedIconCategory, setSelectedIconCategory] = useState<IconCategoryNames>('Activities');
    const iconModalref = useRef<HTMLDivElement | null>(null)
    const { iconModal } = useContext(ModalContext);
    const { currTask } = useContext(TaskContext);

    const handleChangeItemCategory = (iconCategory: IconCategoryNames) => {
        console.log(iconCategory);
        setSelectedIconCategory(iconCategory)
    };

    const handlePickColour = (colour: string) => {
        currTask.setColour(colour);
        // setCurrTask((prevTask: any) => {
        //     return {
        //         ... prevTask,
        //         colour,
        //     }
        // })
    };

    const handleSelectIcon = (icon: string) => {
        console.log(icon);
        currTask.setIcon(icon);
    };


    useClickOutside({ref: iconModalref, closeHandler: iconModal.hideModal});

    // console.log(tabler.icons)
    return <div className="iconModalContainer" ref={iconModalref}>
        <div className="header">
            <h3>Colour & Icon</h3>
            <div className="buttonContainer">
                <Button
                    onClick={iconModal.hideModal}
                    icon={<CloseIcon/>}
                    btnDimensions={{
                        width: 2,
                        height:2,
                    }}
                    backgroundColor="#515152"
                />
            </div>
        </div>
        <div className="colourPicker">
            {COLOURS.map((colour, index) => {
                return <button 
                    key={index}
                    onClick={() => handlePickColour(colour)} 
                    className={currTask.colour === colour ? `selected`: ''} 
                    style={{backgroundColor: colour}}/>
            })}
        </div>
        <div className="iconCategories">
            <ul>
                {iconCategoryIcons.map((icon, index) => {
                        return <li 
                            key={index}
                            className={selectedIconCategory === iconCategoryNames[index]? 'selected': ''}
                        >
                            <Icon onClick={() => handleChangeItemCategory(iconCategoryNames[index])} icon={icon} icon-name={iconCategoryNames[index]} width={20} height={20}/>
                        </li>
                    })}
            </ul>
        </div>
        <div className="iconsContainer">
            <h2>{selectedIconCategory}</h2>
                <ul>
                    {iconCategories[selectedIconCategory]?.map((icon: string, index: number) => {
                        return <li 
                            key={index} 
                            onClick={() => handleSelectIcon(icon)}
                            className={currTask.icon === icon? 'selected':''}
                        >
                                <Icon icon={icon} width={20} height={20}/>
                            </li>
                    })}
                </ul>
        </div>
    </div>
}