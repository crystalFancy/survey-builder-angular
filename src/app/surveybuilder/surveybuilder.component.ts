import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

export interface InputType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-surveybuilder',
  templateUrl: './surveybuilder.component.html',
  styleUrls: ['./surveybuilder.component.scss']
})
export class SurveybuilderComponent implements OnInit {

  surveyForm: FormGroup;
  selectedType = [];
  inputTypes: InputType[] = [
    {value: 'checkbox', viewValue: 'Checkbox'},
    {value: 'datepicker', viewValue: 'Datepicker'},
    {value: 'email', viewValue: 'Email'},
    {value: 'number', viewValue: 'Number'},
    {value: 'radio', viewValue: 'Radio Button'},
    {value: 'select', viewValue: 'Select'},
    {value: 'tel', viewValue: 'Telephone Number'},
    {value: 'text', viewValue: 'Text'},
    {value: 'textarea', viewValue: 'Text Area'},
    {value: 'time', viewValue: 'Time'},
  ];

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.surveyForm = this.fb.group({
      survey_details: this.fb.group({
        name: '',
        description: ''
      }),
      questions: this.fb.array([this.questions])
    });
  }

  get questions(): FormGroup {
    return this.fb.group({
      type: new FormControl(),
      title: new FormControl(),
      options: this.fb.array([this.options]),
    });
  }

  get options(): FormGroup {
    return this.fb.group({
      optionvalue: new FormControl(),
    });
  }

  addQuestion() {
    (this.surveyForm.get('questions') as FormArray).push(this.questions);
  }

  deleteQuestion(index) {
    (this.surveyForm.get('questions') as FormArray).removeAt(index);
  }

  addOption(question) {
    question.get('options').push(this.options);
  }

  deleteOption(question, index) {
    question.get('options').removeAt(index);
  }

}
