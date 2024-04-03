using {test as my} from '../db/schema';

service catalogService{

@requires:'authenticated-user'
entity Products as projection on my.Products order by price;

}