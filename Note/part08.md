Combined query can also use the same query multiple times. You must however give the queries alternative names like so

```
query {
  havePhone: allPersons(phone: YES){
    name
  }
  phoneless: allPersons(phone: NO){
    name
  }
}
```