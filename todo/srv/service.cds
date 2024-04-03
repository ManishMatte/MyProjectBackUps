using {manish as my} from '../db/schema';

@requires: 'authenticated-user'
service catalogService @(path: '/browse'){

entity Tasks as projection on my.tasks where isdel = false order by ID desc;

entity Assignees as projection on my.assignees where isdel = false order by ID desc;

@requires:'Admin'
entity Employees as projection on my.employees where isdel = false order by ID desc;

}