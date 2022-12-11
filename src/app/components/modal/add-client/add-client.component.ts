import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from 'src/app/shared/interfaces/client';
import { Provider } from 'src/app/shared/interfaces/provider';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit{
  
  @Input()
  visible!: boolean;

	@Output()
	visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output()
	clientModifie: EventEmitter<boolean> = new EventEmitter<boolean>();

	clientForm: FormGroup = new FormGroup({});

  providerForm: FormGroup = new FormGroup({});

  client!: Client;

  providers: Provider[] = [];

  provider!: Provider;

  selectedProviders!: Provider[];


  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
              private clientService: ClientsService,
              private providerService: ProviderService,
              private confirmationService: ConfirmationService) {}


  ngOnInit(): void {
    this.getAllProvider()
    this.clientForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      providers: [''],
    });
    this.providerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3)]]});
  }


  /**
	 * This function hide the dialog
	 */
	hideDialog(): void {
		this.visibleChange.emit(false);
		this.clientForm.reset();
	}

  /**
	 * This function allow to save client information
	 */
	saveClient(): void {
    const client = this.clientForm.getRawValue()
    client.providers=this.selectedProviders
		if(this.clientForm.valid){
					this.clientService.createClient(client).subscribe({
						next: (value) => {
							this.clientModifie.emit(true);
							this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client save successfully', icon: 'pi-file' });
						}, error: (error) => {
							this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error to save client', icon: 'pi-file' });
						}, complete: () => {
							this.hideDialog();
						}
					});	
		}
  }


  /**
   * This function allow to delete provider
   * @param provider current provider
   */
  deleteProvider(provider: Provider): void {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + provider.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.providerService.deleteProviders(provider._id).subscribe({
            next: (v: string) => {
              this.messageService.add({ severity: 'success', summary: 'Suppression', detail: 'Provider deleted', icon: 'pi-file' });
              this.providers = this.providers.filter(val => val._id !== provider._id);
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Error to deleted provider', icon: 'pi-file' });
            }
          });
        }
  
    });
  }


  /**
   * This function allow to get all providers
   */
  getAllProvider(): void {
    this.providerService.getAllProviders()
      .subscribe({
        next: (data) => {
          this.providers = data ? data.data.providers : [];
        },
        error: (e) => console.error(e)
      });
  }

  /**
	 * This function allow to save provider informations
	 */
  saveProvider(): void {
    const provider = this.providerForm.getRawValue()
    if(this.providerForm.valid){
          this.providerService.createProvider(provider).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Provider save successfully', icon: 'pi-file' });
            },error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error to save provider', icon: 'pi-file' });
            }, complete: () => {
              this.providerForm.reset()
              this.getAllProvider()
            }
          });	
    }
  }

  /**
   * This function allow to update provider informations
   * @param provider current provider
   */
  updateProvider(provider : Provider): void {
    const providerEdit = this.providerForm.getRawValue()
    if(this.providerForm.valid){
          provider.name = providerEdit
          this.providerService.updateProdivers(this.provider._id, provider).subscribe({
            next: (value) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated provider', icon: 'pi-file' });
            }, error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error to update provider', icon: 'pi-file' });
            }, complete: () => {
              this.getAllProvider()
            }
          });	
    }
  }
}
