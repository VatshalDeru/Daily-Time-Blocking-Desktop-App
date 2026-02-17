import { useContext } from "react";
import Button from "../Button/Button";
import { ModalContext } from "../../context/ModalContext";

type HeaderProps = {
    month: string;
    year: number;
}

export default function Header({ month, year }: HeaderProps) {
    const { calenderModal } = useContext(ModalContext);
    console.log(calenderModal)
    return <header>
            <div className="dateControlsContainer" onClick={calenderModal.showModal}>
                <button className="calenderButton">
                    <h1>{month} <span>{year}</span></h1>
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.72262 10.6065L17.501 2.121L15.5568 0L8.7505 7.425L1.94425 0L0 2.121L7.77837 10.6065C8.03622 10.8877 8.3859 11.0457 8.7505 11.0457C9.1151 11.0457 9.46477 10.8877 9.72262 10.6065Z" fill="#00AAFF"/>
                    </svg>
                </button>
                <div className="changeDateButtons">
                    <button className="prevDayButton">
                        <svg  width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.3935 21.185L13.879 30.6133L16 28.2567L8.575 20.0067L16 11.7567L13.879 9.4L5.3935 18.8283C5.11229 19.1409 4.95432 19.5647 4.95432 20.0067C4.95432 20.4486 5.11229 20.8725 5.3935 21.185Z" fill="white"/>
                        </svg> 
                    </button>
                    <button className="nextDayButton">
                        <svg  width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.6065 21.185L6.121 30.6133L4 28.2567L11.425 20.0067L4 11.7567L6.121 9.4L14.6065 18.8283C14.8877 19.1409 15.0457 19.5647 15.0457 20.0067C15.0457 20.4486 14.8877 20.8725 14.6065 21.185Z" fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>

            <Button 
                icon={<svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.1408 17.5C30.1408 17.0975 30.1233 16.7125 30.0883 16.31L33.3433 13.8425C34.0433 13.3175 34.2358 12.3375 33.7983 11.5675L30.5258 5.915C30.3159 5.54432 29.9765 5.26425 29.5728 5.12858C29.169 4.99292 28.7294 5.01123 28.3383 5.18L24.5758 6.7725C23.9283 6.3175 23.2458 5.915 22.5283 5.5825L22.0208 1.54C21.9158 0.665 21.1633 0 20.2883 0H13.7608C12.8683 0 12.1158 0.665 12.0108 1.54L11.5033 5.5825C10.7858 5.915 10.1033 6.3175 9.45577 6.7725L5.69327 5.18C4.88827 4.83 3.94327 5.145 3.50577 5.915L0.233271 11.585C-0.204229 12.355 -0.0117286 13.3175 0.688271 13.86L3.94327 16.3275C3.8703 17.1133 3.8703 17.9042 3.94327 18.69L0.688271 21.1575C-0.0117286 21.6825 -0.204229 22.6625 0.233271 23.4325L3.50577 29.085C3.94327 29.855 4.88827 30.17 5.69327 29.82L9.45577 28.2275C10.1033 28.6825 10.7858 29.085 11.5033 29.4175L12.0108 33.46C12.1158 34.335 12.8683 35 13.7433 35H20.2708C21.1458 35 21.8983 34.335 22.0033 33.46L22.5108 29.4175C23.2283 29.085 23.9108 28.6825 24.5583 28.2275L28.3208 29.82C29.1258 30.17 30.0708 29.855 30.5083 29.085L33.7808 23.4325C34.2183 22.6625 34.0258 21.7 33.3258 21.1575L30.0708 18.69C30.1233 18.2875 30.1408 17.9025 30.1408 17.5ZM17.0858 23.625C13.7083 23.625 10.9608 20.8775 10.9608 17.5C10.9608 14.1225 13.7083 11.375 17.0858 11.375C20.4633 11.375 23.2108 14.1225 23.2108 17.5C23.2108 20.8775 20.4633 23.625 17.0858 23.625Z" fill="#858585"/>
                </svg>}
                variant="settings"
                btnDimensions={{ width: 3.5, height: 3.5 }}
            />
    </header>
}