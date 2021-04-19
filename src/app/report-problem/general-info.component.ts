import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

export class GeneralInfoFormGroup extends FormGroup {

  constructor(
    public readonly shortDescriptionControl: FormControl = new FormControl('', Validators.required),
  ) {
    super({
      shortDescriptionControl: shortDescriptionControl
    });
  }

  public static empty() {
    return new GeneralInfoFormGroup();
  }

}

@Component({
  selector: 'cr-general-info',
  templateUrl: './general-info.component.html'
})
export class GeneralInfoComponent {

  @Input() public form: GeneralInfoFormGroup = GeneralInfoFormGroup.empty();

}
