import {Component, OnInit} from '@angular/core';
import { ViewChild, ElementRef, Renderer } from '@angular/core';
declare let swal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // htmlSnippet = '<script>swal("Hi! I am script and I bypassed angular security", "", "success")</script>';
  // htmlSnippet = '{{constructor.constructor(\'alert(1)\')()}}';
  // htmlSnippet = '<img src="a.jpg" onerror="alert('Hi! I am script and I bypassed ember security')">';
  @ViewChild('element') public viewElement: ElementRef;
  public element: any;
  title = 'Show your favourite image';
  value = '';

  update(value: string) {
    this.value = value;
  }
}
