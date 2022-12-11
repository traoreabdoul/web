import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Provider } from 'src/app/shared/interfaces/provider';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss']
})
export class AddProviderComponent implements OnInit{

  @Input()
  visible!: boolean;

	@Output()
	visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output()
	providerModifie: EventEmitter<boolean> = new EventEmitter<boolean>();

	providerForm: FormGroup = new FormGroup({});

  provider!: Provider;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
    private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3)]]});
  }


  /**
	 * Cette fonction permet de fermer le modal de création et de modification
	 */
	fermerModal() {
		this.visibleChange.emit(false);
		this.providerForm.reset();
	}

  /**
	 * Cette fonction permet d'enregistrement et de modification des utilisateurs
	 */
	enregistrerProvider(): void {
		const provider = this.providerForm.getRawValue()
		const name = this.providerForm.get('name')?.value;
		if(this.providerForm.valid){
			//enregistrement  
          console.log(provider)
          console.log(name)
					this.providerService.createProvider(provider).subscribe({
						next: (value) => {
							this.providerModifie.emit(true);
							this.messageService.add({ severity: 'success', summary: 'Success', detail: 'l\'enregistrement a été éffectué', icon: 'pi-file' });
						}, error: (error) => {
							this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'enregistrement,', icon: 'pi-file' });
						}, complete: () => {
							this.fermerModal();
						}
					});	
		}
    else{

    }
				
			

  }




}
