import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleClass } from '../../../generic/primitive/role-class';
import { Role } from '../../../generic/primitive/role';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesRequestService {
  constructor(private http: HttpClient) {}

  async list(roleClass: RoleClass, id: number): Promise<Role[]> {
    return await firstValueFrom(
      this.http.get<Role[]>(`/api/roles/v1/${roleClass}/list/${id}`),
    );
  }
}
