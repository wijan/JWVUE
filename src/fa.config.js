import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//  ICONOS SOLIDOS (CON EL RELLENO NEGRO)
import { 
    fas
} from '@fortawesome/free-solid-svg-icons'


//  ICONOS REGULARES (CON EL ESPACIO EN BLANCO)
import { 
    far
 } from '@fortawesome/free-regular-svg-icons'

 import {
     fab
 } from '@fortawesome/free-brands-svg-icons'

library.add(
    //  SOLIDOS
    fas,
    //  REGULARES
    far,
    //  MARCAS
    fab
);

Vue.component('icono', FontAwesomeIcon);



