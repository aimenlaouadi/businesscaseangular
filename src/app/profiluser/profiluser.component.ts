import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { ProfiluserService } from '../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profiluser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  user: any = {};
  form: FormGroup = new FormGroup({});

  constructor(private profiluserService: ProfiluserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    this.route.params.subscribe(params => {
      this.profiluserService.getUser(params['id']).subscribe(user => {
        this.user = user;
        this.form = new FormGroup({
          username: new FormControl(this.user.username, [Validators.required]),
          lastname: new FormControl(this.user.lastname, [Validators.required]),
          firstname: new FormControl(this.user.firstname, [Validators.required]),
          telephone: new FormControl(this.user.telephone, [Validators.required])
        });
      });
    });
  }

  updateUser(): void {
    if (this.form.valid) {
      this.profiluserService.updateUser(this.user.id, this.form.value).subscribe(() => {
        console.log('Profil mis à jour');
      });
    }
  }

  deleteUser(): void {
    this.profiluserService.deleteUser(this.user.id).subscribe(() => {
      console.log('Profil supprimé');
    });
  }

}