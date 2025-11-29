import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public isAddingMenu: boolean = false;
  public isAddingWastage: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  get(id?: number) {
    const url = id
      ? `${API_BASE_URL}foodmenu/${id}/`
      : `${API_BASE_URL}foodmenu/`;

    return this.http.get(url, {
      observe: 'response'
    });
  }


  post(data: any) {
    return this.http.post(API_BASE_URL+'foodmenu/', data);
  }

  put(data: any, id: number) {
    return this.http.put(API_BASE_URL+'foodmenu/'+id+'/', data);
  }

  patch(data: any, id: number) {
    return this.http.patch(API_BASE_URL+'foodmenu/'+id+'/', data);
  }

  search_by_date(date: string) {
    let params = new HttpParams()
      .set('date', date);

    return this.http.get(API_BASE_URL+'foodmenu/search_by_date/', { params })
  }

  weekly_menu(start: string){
    let params=new HttpParams()
      .set('start',start);

    return this.http.get<any>(API_BASE_URL+'foodmenu/weekly_menu/',{params});
  }

  uploadExcel(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(API_BASE_URL+'foodmenu/uploadbulkmenu/', formData);
  }

}
