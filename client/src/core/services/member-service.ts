import { AccountService } from './account-service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member, Photo } from '../../types/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);
  private AccountService = inject(AccountService);

  private baseUrl = environment.apiUrl;
  
  getMembers(){
    return this.http.get<Member[]>(`${this.baseUrl}members`);
  }

  getMember(id:string){
    return this.http.get<Member>(`${this.baseUrl}members/${id}`);
  }

  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

}
