import { Component, OnInit, Output, inject } from '@angular/core';
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
    canShare = false

    @Output()
    onShareThoughts = new Subject<string>


    ngOnInit(): void {
        this.form = this.createForm()
        this.canShare = !!navigator.canShare()
    }

    share(text: string) {
        const data: any = {
            title: 'share a tot',
            text,
            url: 'www.google.com'
        }
        navigator.share(data).then(result => alert('shared')).catch(err => alert(JSON.stringify(err)))
    }

    private createForm(): FormGroup {
        return this.fb.group({
            thoughts: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
        })
    }

    clearThoughts() {
        this.form.reset()
    }
}
