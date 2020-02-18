# Run project

`docker-compose up`

# Stop project

`docker-compose down`

# Run consumer many instances

`docker-compose up --scale consumer=3`

# Guide
### Systems
- Consumer binding port 3000-3002
- Producer binding port 4000
- RabbitMQ binding port 5672 and Management port 15672

Call Producer API (E.g. :4000/api/sendMessageSimple) to send message 

See result at Consumer console and RabbitMQ Management

