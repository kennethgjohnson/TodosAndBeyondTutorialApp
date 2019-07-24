import { AppSettings } from 'src/app/app.settings';

export class Todo {
  constructor(
    public id: Number = AppSettings.UNINITIALIZED_ID, 
    public description: String,
    public done: Boolean,
    public targetDate: Date
    ) { }    

  }
