import Swal from 'sweetalert2';

//Alerta que exportaremos y cambiaremos según necesitemos, las propiedades se pueden sobreescribir al declararla en otro lugar
export const Toast = Swal.mixin({
    toast: true,
    showClass: {
        popup: 'animate__animated animate__bounceInRight'
    },
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor:"#E10000",
    background: "#4D4D4D",
    color: "#FFFFFF",
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})