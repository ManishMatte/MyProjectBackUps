//namespace modeling;
context modeling{
entity Countries{

key ID : Integer;
name : String;

}

entity States {
    key ID : Integer;
    key Countries_ID : Integer;
    name : String;
    population : Integer;
}

entity Revenues{

    key ID : Integer;
    key States_ID : Integer;
    key Countries_ID : Integer;
    value : Integer;

}
}

@cds.persistence.exists 
@cds.persistence.calcview 
Entity revenue {
key     state_id: Integer  @title: 'state_id: state_id' ; 
        state: String(5000)  @title: 'state: state' ; 
        VALUE: Integer  @title: 'VALUE: VALUE' ; 
     STATE: String(5000)  @title: 'STATE: NAME' ; 
        POPULATION: Integer  @title: 'POPULATION: POPULATION' ; 
     NAME: String(5000)  @title: 'NAME: NAME' ; 
}