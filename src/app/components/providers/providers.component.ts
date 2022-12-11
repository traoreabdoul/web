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

  providerAddDialog: boolean = false;
  providerEditDialog: boolean = false;

  providers: Provider[] = [];

  provider!: Provider;

  selectedProviders!: Provider[];

  submitted: boolean = false;

  ngOnInit(): void {
   this.getAllProvider()
  }

  constructor(private providerService: ProviderService, private confirmationService: ConfirmationService, private messageService : MessageService ){}

  openAddDialog(){
    this.provider = {
      _id: '',
      name: ''
    };
    this.submitted = false;
    this.providerAddDialog = true;
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
  this.providerAddDialog = false;
  this.submitted = false;
}


getAllProvider() {
  this.providerService.getAllProviders()
    .subscribe({
      next: (data) => {
        this.providers = data ? data.data.providers : [];
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
    this.providerEditDialog = true;
}
deleteProvider(provider: Provider) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + provider.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
				this.providerService.deleteProviders(provider._id).subscribe({
					next: (v: string) => {
						this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Provider deleted', icon: 'pi-file' });
						this.providers = this.providers.filter(val => val._id !== provider._id);
					},
					error: () => {
						this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'l\'utilisateur ne peut pas être supprimer', icon: 'pi-file' });
					}
				});
			}

  });
}

onProviderModifie(event?: boolean) {
  if (event) {
    this.getAllProvider();
  }
}



}
