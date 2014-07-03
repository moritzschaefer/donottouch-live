# Do not touch - LIVE!

I know donottouch.org is very old but it got my attention yesterday again. And as I saw in the end that it isn't live I thougt about creating a live version.
A bit of math shows that this will collapse quite fast (within 100-500 users). Without P2P it seems impossible to handle so many clients due to the quadratic increase of traffic. But it would be cool enough for a few users.
It's my first Node project. And my (almost) first redis project. Better late than never ;).

## Install

npm install

## Run

node app.js

use supervisor app.js if you develop (for automatic code reload)

## Client

access with /index.html

## Protocol

Everything with JSON

POST /
give me an ID
Returns {id: }

PUT /<id>
{
x: <int>,
y: <int>,
}

GET /
[
{x,y}, {x,y}
]

# TODO

- Add stories
(- Beautiful drawing)
- Optimize protocol (minimize data)
- Use Websockets instead of HTTP pulls
- Delete on inactivity
