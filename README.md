# magic-mirror  
The API facade to the complex internal sturcture that provides a simple overview of the public entities.  
Written in Nodejs and [Express](http://expressjs.com/). To be used with the Landing part of the site.   
## How does it work  
This is an proxy for querying the public data from specific domains.  
The querying is done with a uniform interface that hides the actual querying logic.  
Can be extended to various domains as we go.   
## Developing  
The service is run using [`nodemon`](https://nodemon.io/) - this monitors changes in the code 
1. Install dependencies: `npm i`   
2. Run the dev server: `npm start`      
## Deployment  
For now I have deployed it manually, but would be nice to look into the automation options  
## Endpoints  
The app is deployed to heroku: https://volunteero-magic-mirror.herokuapp.com/    
- GET: `/` - index, does kinda nothing  
- GET: `/heartbeat` - responds with a 'tum-tum'  
- PUT: `/discover` - queries the domains specificed in the body for data  
request body:  
```
{"entities":[<entity name : string>]}
```   
response body:  
```  
{
	"message": "done",
	"entities": [
		"events"
	],
	"results": [
		[
			{
				"title": "Cook bruscettas for homeless",
				"host": "Heroic Helpers",
				"description": "Let's feed the homeless with bruscettas",
				"location": "Amsterdam, NL"
			},
		]
	]
}
```