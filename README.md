curl -X POST "http://localhost:5000/bot/start?rate=10&duration=10&requests=1000"
curl -X POST -H "Content-Type: application/json" -d '{"text":"test"}' http://localhost:5000/feed
curl -N -H "Connection: keep-alive" http://localhost:5000/feed
