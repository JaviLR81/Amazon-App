import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  constructor() { }

  onImgError(event: any){
    let url = (+new Date() % 2 === 0)
      ? './assets/img/amazon_logo_white.png'
      :  './assets/img/empty_avatar.png';
    event.target.src = url;
  }

}
