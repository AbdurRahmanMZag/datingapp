import { Routes } from '@angular/router';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Home } from '../features/home/home';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        canActivate: [authGuard],
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'lists', component: Lists },
            { path: 'messages', component: Messages },
            { path: 'members', component: MemberList },
            { path: 'members/:id', component: MemberDetailed },
        ]
    },
    { path: '**', component: Home } // Wildcard route for a 404 page or redirect to home
];
