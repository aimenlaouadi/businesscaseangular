import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { ProfiluserService } from '../shared/servicebusinesscase/profiluserservice/profiluser.service';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
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
  message: string = '';
  showSuccessMessage: boolean = false;

  constructor(private profiluserService: ProfiluserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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
        this.message = 'Votre demande a bien été prise en compte, merci!';
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      });
    }
  }

  deleteUser(): void {
    this.profiluserService.deleteUser(this.user.id).subscribe(() => {
      this.message = 'Votre profil a bien été supprimé, merci!';
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.router.navigateByUrl('/');
      }, 3000);
    });
  }

}