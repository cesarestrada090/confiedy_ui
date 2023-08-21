import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },

  {
    title: 'Mi Perfil',
    icon: 'grid-outline'
  },
  {
    title: 'Mis Cursos',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Calculo 1',
        link: '/pages/configuracion/area',
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
