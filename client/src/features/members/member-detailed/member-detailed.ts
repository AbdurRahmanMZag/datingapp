import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { filter } from 'rxjs';
import { Member } from '../../../types/member';
import { MemberService } from '../../../core/services/member-service';
import { AgePipe } from "../../../core/pipes/age-pipe";
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit {
  protected memberService = inject(MemberService);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected accountService = inject(AccountService);
  title = signal<string | undefined>('Profile');
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  ngOnInit() {
    this.title.set(this.route.firstChild?.snapshot?.title);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    });
  }

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return
    return this.memberService.getMember(id);
  }

}
