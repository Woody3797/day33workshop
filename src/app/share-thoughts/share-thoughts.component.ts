import { Component, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-share-thoughts',
  templateUrl: './share-thoughts.component.html',
  styleUrls: ['./share-thoughts.component.css']
})
export class ShareThoughtsComponent implements OnInit {
    
    form!: FormGroup
    fb: FormBuilder = inject(FormBuilder)

    @Input()
    canShare = false

    @Output()
    onShareThoughts = new Subject<string>


    ngOnInit(): void {
        this.form = this.createForm()
        this.canShare = !!navigator.canShare()
    }

    share() {
        const data = this.form.value['thoughts']
        this.onShareThoughts.next(data)
    }

    private createForm(): FormGroup {
        return this.fb.group({
            thoughts: this.fb.control('', [Validators.required, Validators.minLength(3)])
        })
    }

    clearThoughts() {
        this.form.reset()
    }
}
