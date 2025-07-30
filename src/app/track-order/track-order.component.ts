import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-track-order',
  standalone: false,
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})

export class TrackOrderComponent implements OnInit {
  searchOrderForm!: FormGroup;
  order: any;
  notFound = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.searchOrderForm = this.fb.group({
      trackingId: ['', Validators.required]
    });
  }

  submitForm() {
    const id = this.searchOrderForm.get('trackingId')?.value;
    this.authService.getOrderByTrackingId(id).subscribe({
      next: (res) => {
        this.order = res;
        this.notFound = false;
      },
      error: () => {
        this.order = null;
        this.notFound = true;
      }
    });
  }
}

