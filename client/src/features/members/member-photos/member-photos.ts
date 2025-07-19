import { Observable } from 'rxjs';
import { MemberService } from './../../../core/services/member-service';
import { Component, inject, OnInit } from '@angular/core';
import { Photo } from '../../../types/member';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos implements OnInit{
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected memberPhotos$?:Observable<Photo[]>;
  
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next:(param)=> {
        const memberId = param.get('id');
        if (memberId) {
          this.memberPhotos$ = this.memberService.getMemberPhotos(memberId);
        }
      }
    });
  }

  get photoMocks (){
    return Array.from({length: 20}, (_, i)=>
      ({
        url: '/user.png'
      })
    )
  }

}
