import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({children, open, onClose, className = ''}) {
    // console.log('from modal component',open); 
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current

        if(open){
            modal.showModal();
         } else {
            modal.close();
         }
             
     },[open])

    return createPortal(
    <dialog  className='modelStyle w-64 h-40 text-center p-8 rounded-2xl ' ref={dialog} onClose={onClose}>{children}</dialog>, 
    document.getElementById('modal')
    ); 
}

