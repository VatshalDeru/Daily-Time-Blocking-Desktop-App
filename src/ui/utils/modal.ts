// // 
// function handleCloseModal() {
//         function handleEscape(e: KeyboardEvent) {
//             if(e.key === "Escape") calenderModal.hideModal();
//         }

//         function handleClickOut(e: MouseEvent) {
//             if(modalRef.current && !
//                 modalRef.current.contains(e.target as Node) && 
//                 calenderButtonRef && 
//                 !calenderButtonRef.current?.contains(e.target as Node)){
//                     calenderModal.hideModal();
//                 } 
//         }

//         document.addEventListener("keydown", handleEscape);
//         document.addEventListener("mousedown", handleClickOut);

//         return () => {
//             document.removeEventListener("keydown", handleEscape);
//             document.removeEventListener("mousedown", handleClickOut);
//         }
// };