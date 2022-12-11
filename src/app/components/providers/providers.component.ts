import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Provider } from 'src/app/shared/interfaces/provider';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit{

  providerDialog: boolean = false;

  providers: Provider[] = [];

  provider!: Provider;

  selectedProviders!: Provider[];

  submitted: boolean = false;

  ngOnInit(): void {
   
  }

  constructor(private providerService: ProviderService, private confirmationService: ConfirmationService, private messageService : MessageService ){}

  openNew(){
    this.provider = {
      _id: '',
      name: ''
    };
    this.submitted = false;
    this.providerDialog = true;
  }

  deleteSelectedProviders(){
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected providers?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.providers = this.providers.filter(val => !this.selectedProviders.includes(val));
            this.selectedProviders = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

hideDialog(){
  this.providerDialog = false;
  this.submitted = false;
}


getAllProvider() {
  this.providerService.getAllProviders()
    .subscribe({
      next: (data) => {
        this.providers = data ? data : [];
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

saveProviders(){
  this.submitted = true;

  }

editProvider(provider: Provider) {
    this.provider = {...provider};
    this.providerDialog = true;
}
deleteProvider(provider: Provider) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + provider.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.providers = this.providers.filter(val => val._id !== provider._id);
          this.provider = {
            _id: '',
            name: ''
          };
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}


}
