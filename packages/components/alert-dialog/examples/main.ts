import { createModal} from "../src/Modal"
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'


const modalEl = document.querySelector("[data-modal-test-1]")
if(modalEl instanceof HTMLElement){
    createModal({
        modalElement:modalEl,
        options:{
            
        }
    })
}