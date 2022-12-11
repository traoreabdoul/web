import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from 'src/app/shared/interfaces/client';
import { Provider } from 'src/app/shared/interfaces/provider';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

  clientAddDialog: boolean = false;
  clientEditDialog: boolean = false;
  clients: Client[] = [];
  providers: Provider[] = [];
  client!: Client;
  selectedClients!: Client[];


  ngOnInit(): void {
    this.getAllClient()
   
  }

  constructor(private clientService: ClientsService, 
              private confirmationService: ConfirmationService, 
              private messageService : MessageService ){}

   
  /**
   * this function open add new client dialog
   */         
  openAddDialog(): void {
    this.clientAddDialog = true;
  }


  /**
   * this function allow to get all client
   */
  getAllClient(): void {
    this.clientService.getAllClients()
      .subscribe({
        next: (data) => {
          this.clients = data ? data.data.clients : [];
          this.providers = data ? data.data.clients.providers : [];
          console.log(this.clients);
        },
        error: (e) => console.error(e)
      });
  }


  /**
   * this function open edit client dialog
   * @param Client current client
   */
  editClient(Client: Client): void{
      this.client = {...Client};
      this.clientEditDialog = true;
  }

  /**
   * This function delete seleted client
   * @param Client current client
   */
  deleteClient(Client: Client): void {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + Client.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.clientService.deleteClients(Client._id).subscribe({
            next: (v: string) => {
              this.messageService.add({ severity: 'info', summary: 'Suppression', detail: 'Client deleted', icon: 'pi-file' });
              this.clients = this.clients.filter(val => val._id !== Client._id);
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'l\'utilisateur ne peut pas être supprimer', icon: 'pi-file' });
            }
          });
        }

    });
  }
  
  /**
   * This function  get all client when we have some modification
   * @param event 
   */
  onClientModify(event?: boolean):void {
    if (event) {
      this.getAllClient();
    }
  }


}
