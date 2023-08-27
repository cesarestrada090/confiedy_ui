import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },

  {
    title: 'Mi Perfil',
    icon: 'person-outline'
  },
  {
    title: 'Mis Cursos',
    icon: 'book-open-outline',
    children: [
      {
        title: 'Calculo 1',
        link: '/pages/casos/visita-tecnica',
      },{
        title: 'Matemática Financiera',
        link: '/pages/configuracion/sede',
      }
    ],
  },{
    title: 'Cerrar Sesión',
    icon: 'power-outline',
    link: '/autenticacion/login',
  }
];
