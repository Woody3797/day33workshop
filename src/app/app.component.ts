import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareThoughtsComponent } from './share-thoughts/share-thoughts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    canShare = false

    @ViewChild(ShareThoughtsComponent)
    shareComp!: ShareThoughtsComponent

    ngOnInit(): void {
        this.canShare = !!navigator.share
    }

    share(text: string) {
        console.info(text)
        const data: any = {
            title: 'share a tot',
            text,
            // url: 'www.google.com'
        }
        navigator.share(data).then(result => {alert('shared')
        this.shareComp.clearThoughts()}).catch(err => alert(JSON.stringify(err)))
    }
}
