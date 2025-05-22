import { TestBed, async } from '@angular/core/testing';
import { DateTimeFormatPipe } from './DateTimeFormat.pipe';
 
 describe('Pipe: DateTimeFormat', () => {
   it('create an instance', () => {
     let pipe = new DateTimeFormatPipe('shortDate');
     expect(pipe).toBeTruthy();
   });
 });