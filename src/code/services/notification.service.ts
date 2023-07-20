import { Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  constructor(
    private translate: TranslateService,
    private messageService: MessageService
  ) { }

  showNotification(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  info(message: string) {
    this.showNotification('info', this.translate.instant('message.info'), message);
  }

  success(message: string) {
    this.showNotification('success', this.translate.instant('message.success'), message);
  }

  warn(message: string) {
    this.showNotification('warn', this.translate.instant('message.warn'), message);
  }

  error(message: string) {
    this.showNotification('error', this.translate.instant('message.error'), message);
  }
}
