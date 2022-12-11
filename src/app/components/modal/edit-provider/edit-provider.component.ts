import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Provider } from 'src/app/shared/interfaces/provider';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {

  @Input()
  visible!: boolean;

	@Output()
	visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output()
	providerModifie: EventEmitter<boolean> = new EventEmitter<boolean>();

	providerForm: FormGroup = new FormGroup({});

  @Input()
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
					this.providerService.updateProdivers(this.provider._id,provider).subscribe({
						next: (value) => {
							this.providerModifie.emit(true);
							this.messageService.add({ severity: 'success', summary: 'Success', detail: 'la modification  a été éffectué', icon: 'pi-file' });
						}, error: (error) => {
							this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la modification,', icon: 'pi-file' });
						}, complete: () => {
							this.fermerModal();
						}
					});	
		}
    else{

    }
				
			

  }
  ouvertureModal() {
		
		this.providerForm.patchValue({
			_id: this.provider._id,
			name: this.provider.name,
		});

		
	}





}
