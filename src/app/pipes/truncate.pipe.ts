import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, chars: number): SafeHtml {
    const replacedNewlines = value?.replace(/\n/g, '<br>');
    const truncatedText = this.truncate(replacedNewlines, chars);

    return this.sanitizer.bypassSecurityTrustHtml(truncatedText);
  }

  private truncate(text: string, chars: number): string {
    const truncatedText = text?.slice(0, chars);
    return truncatedText;
  }

}
