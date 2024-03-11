import { trigger, style, animate, transition } from '@angular/animations';

export const popOutAnimation = trigger('popOut', [
  transition(':enter', [
    style({ transform: 'scale(0)' }),
    animate('500ms', style({ transform: 'scale(1)' })),
  ]),
]);

