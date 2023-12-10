import Swal from 'sweetalert2'
import whithReactContent from 'sweetalert2-react-content'

export function show_alerta(icono, mensaje, foco){
    const MySwal = whithReactContent(Swal);
    onfocus(foco);
    MySwal.fire({
        title: mensaje,
        icon: icono
    })
}


function onfocus (foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}