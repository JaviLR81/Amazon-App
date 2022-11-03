import { Component, OnInit } from '@angular/core';
import { HeaderSubjectService } from '../../services/header-subject/header-subject.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private headerSubjectService: HeaderSubjectService) { }

  ngOnInit(): void {
  }

  get userLoggedSubject$(){
    return this.headerSubjectService.userLogged$;
  }

}
