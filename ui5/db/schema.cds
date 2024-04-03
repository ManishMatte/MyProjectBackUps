namespace test;

entity Products {
    key ID : UUID;
    name : String(255);
    price : Integer;
    date : Timestamp;
    quantity : Integer;
}