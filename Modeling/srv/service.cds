using { modeling as my } from '../db/schema';
using revenue from '../db/schema';

service catalogService {

entity country as projection on my.Countries;
entity state as projection on my.States;
entity revenue as projection on my.Revenues;

entity v_revenue as projection on revenue;


}




