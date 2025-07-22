import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit, OnDestroy{
  
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent){
    if(this.editForm?.dirty){
      $event.preventDefault();
    }
  }
  @ViewChild('editForm') editForm?: NgForm;
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  editableMember:EditableMember = {
    displayName : '',
    description : '',
    city : '',
    country : '',
  };
  protected toast = inject(ToastService);
  protected accountService = inject(AccountService);
  

  ngOnInit(): void {

    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      country: this.memberService.member()?.country || '',
      city: this.memberService.member()?.city || ''
    }
  }

  updateProfile(){
    if (!this.memberService.member()) return;
    const updatedProfile = { ...this.memberService.member(), ...this.editableMember}
    this.memberService.updateMember(this.editableMember).subscribe(
      {
        next: () => {
          const currentUser = this.accountService.currentUser();
          if(currentUser && currentUser.displayName != updatedProfile.displayName){
            currentUser.displayName = updatedProfile.displayName;
            this.accountService.setCurrentUser(currentUser);
          }
          this.toast.success('Profile updated successfully');
          this.memberService.isEditMode.set(false);
          this.memberService.member.set(<Member>updatedProfile)
          this.editForm?.reset(this.editableMember);
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.memberService.isEditMode())
      this.memberService.isEditMode.set(false);
  }
  
}
