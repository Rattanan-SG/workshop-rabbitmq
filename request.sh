#!/bin/bash
 for i in {1..50}
 do
    curl --location --request POST 'http://localhost:4000/api/sendMessageWorkQueue' \
--header 'Content-Type: application/json' \
--data-raw "{
    \"queue\": \"WorkQueue\",
    \"message\": \"$i\"
}"   
 done