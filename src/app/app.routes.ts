import { Routes } from '@angular/router';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { UserDashBoardComponent } from './pages/user-dash-board/user-dash-board.component';
import { AppointmentDashboardComponent } from './pages/appointment-dashboard/appointment-dashboard.component';
import { PaymentDashBoardComponent } from './pages/payment-dash-board/payment-dash-board.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SettingComponent } from './pages/setting/setting.component';

export const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'userHomePage',
    component: UserHomePageComponent,
    children: [
      {
        path: '',
        component:UserDashBoardComponent,
      },
      {
        path: 'userDashBoard',
        component: UserDashBoardComponent,
      },
      {
        path: 'appointment',
        component: AppointmentDashboardComponent,
      },
      {
        path: 'payment',
        component:PaymentDashBoardComponent
      },
      {
        path:'chat',
        component:ChatComponent
      },
      {
        path: 'setting',
        component:SettingComponent
      }
    ],
  },
];
