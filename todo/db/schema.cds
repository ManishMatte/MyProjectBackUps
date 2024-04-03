using { cuid, managed } from '@sap/cds/common';

namespace manish;

entity tasks : cuid, managed {
    name : String(255);
    description : String(255);
    duedate : Date;
    isdel : Boolean default false;
    assignee : Composition of many assignees on assignee.task = $self; 
}

entity assignees : cuid, managed {
    empid : String(30);
    task : Association to many tasks on task.ID = ID;
    isdel : Boolean;
}

entity employees : cuid, managed {
    name : String(255);
    empid : String(255);
    isdel : Boolean;
}