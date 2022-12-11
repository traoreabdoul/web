import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from 'src/app/shared/interfaces/client';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  clientDialog: boolean = false;

  clients: Client[] = [];

  client!: Client;

  selectedClients!: Client[];

  submitted: boolean = false;

  ngOnInit(): void {
   
  }

  constructor(private clientService: ClientsService, private confirmationService: ConfirmationService, private messageService : MessageService ){}

  openNew(){
    this.client = {
      _id: '',
      name: ''
    };
    this.submitted = false;
    this.clientDialog = true;
  }

  deleteSelectedClients(){
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected clients?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.clients = this.clients.filter(val => !this.selectedClients.includes(val));
            this.selectedClients = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

hideDialog(){
  this.clientDialog = false;
  this.submitted = false;
}


getAllClient() {
  this.clientService.getAllClients()
    .subscribe({
      next: (data) => {
        this.clients = data ? data : [];
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

saveClients(){
  this.submitted = true;

  }

editClient(client: Client) {
    this.client = {...client};
    this.clientDialog = true;
}
deleteClient(client: Client) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + client.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.clients = this.clients.filter(val => val._id !== client._id);
          this.client = {
            _id: '',
            name: ''
          };
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}

}
