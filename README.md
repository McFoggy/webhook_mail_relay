# Webhook-mail

Simple dockerized nodejs application to serve as webhook relay to send email

## Usage

`docker build -t mcfoggy/webhook-emailer .`

`docker run --rm -p 8090:8080 -e SMTP_HOST=YOUR_SMTP_HOST -e SMTP_TO=you@yoursite.com mcfoggy/webhook-email`
