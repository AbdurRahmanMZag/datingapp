import { EditableMember } from './../../types/member';
import { AccountService } from './account-service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Member, Photo } from '../../types/member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);
  private AccountService = inject(AccountService);
  isEditMode = signal<boolean>(false);
  member = signal<Member | undefined>(undefined);

  private baseUrl = environment.apiUrl;
  
  getMembers(){
    return this.http.get<Member[]>(`${this.baseUrl}members`);
  }

  getMember(id:string){
    return this.http.get<Member>(`${this.baseUrl}members/${id}`)
      .pipe(
        tap(member => this.member.set(member))
      )
    ;
  }

  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  updateMember(editableMember:EditableMember){
    return this.http.put(this.baseUrl + 'members', editableMember);
  }

}
