import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public apiService: ApiService, private router: Router) { }

  query = new FormControl('');

  buscar() {
    const searchQuery = this.query.value;
    console.log('mibusqueda:', searchQuery);

    this.router.navigate(['']).then(() => {
      this.router.navigate(['search', searchQuery]);
    });
  }
}
