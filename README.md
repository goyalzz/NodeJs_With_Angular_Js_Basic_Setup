# NodeJs_With_Angular_Js_Basic_Setup
> This is a basic Node Js with Angular Js and Gulp Setup

Or You can follow fullstack express command also
https://www.npmjs.com/package/generator-angular-fullstack

```
install dependencies:
     $ cd NodeSampleWithAngularJs && npm install

   run the app:
     $ DEBUG=nodesamplewithangularjs:* npm start
```

OR

```
Run Node on Development Envirenment use below command

env NODE_ENV="development" MONGODB_URI="xyz" PORT=8080 node app.js


Run Node on Production Envirenment use below command

node ./app.js
```
____

### Install PM2 ###
Now we will install PM2, which is a process manager for Node.js applications. PM2 provides an easy way to manage and daemonize applications (run them as a service).

We will use Node Packaged Modules (NPM), which is basically a package manager for Node modules that installs with Node.js, to install PM2 on our app server. Use this command to install PM2:

```
sudo npm install pm2 -g
```

Manage Application with PM2
PM2 is simple and easy to use. We will cover a few basic uses of PM2.

Start Application

The first thing you will want to do is use the pm2 start command to run your application, hello.js, in the background:

```
pm2 start hello.js
```

This also adds your application to PM2's process list, which is outputted every time you start an application:

```
Output:
┌──────────┬────┬──────┬──────┬────────┬───────────┬────────┬────────────┬──────────┐
│ App name │ id │ mode │ PID  │ status │ restarted │ uptime │     memory │ watching │
├──────────┼────┼──────┼──────┼────────┼───────────┼────────┼────────────┼──────────┤
│ hello    │ 0  │ fork │ 5871 │ online │         0 │ 0s     │ 9.012 MB   │ disabled │
└──────────┴────┴──────┴──────┴────────┴───────────┴────────┴────────────┴──────────┘
```

As you can see, PM2 automatically assigns an App name (based on the filename, without the .js extension) and a PM2 id. PM2 also maintains other information, such as the PID of the process, its current status, and memory usage.

Applications that are running under PM2 will be restarted automatically if the application crashes or is killed, but an additional step needs to be taken to get the application to launch on system startup (boot or reboot). Luckily, PM2 provides an easy way to do this, the startup subcommand.

The ```startup``` subcommand generates and configures a startup script to launch PM2 and its managed processes on server boots. You must also specify the platform you are running on, which is ubuntu, in our case:

```
pm2 startup ubuntu
```

The last line of the resulting output will include a command (that must be run with superuser privileges) that you must run:

```
Output:
[PM2] You have to run this command as root
[PM2] Execute the following command :
[PM2] sudo su -c "env PATH=$PATH:/opt/node/bin pm2 startup ubuntu -u sammy --hp /home/sammy"
```

Run the command that was generated (similar to the highlighted output above) to set PM2 up to start on boot (use the command from your own output):

 ```$ sudo su -c "env PATH=$PATH:/opt/node/bin pm2 startup ubuntu -u sammy --hp /home/sammy"```

#### Other PM2 Usage (Optional) ####

PM2 provides many subcommands that allow you to manage or look up information about your applications. Note that running pm2 without any arguments will display a help page, including example usage, that covers PM2 usage in more detail than this section of the tutorial.

Stop an application with this command (specify the PM2 App name or id):

```pm2 stop example```

Restart an application with this command (specify the PM2 App name or id):

```pm2 restart example```

The list of applications currently managed by PM2 can also be looked up with the list subcommand:

```pm2 list```

More information about a specific application can be found by using the info subcommand (specify the PM2 App name or id)::

```pm2 info example```

The PM2 process monitor can be pulled up with the monit subcommand. This displays the application status, CPU, and memory usage:

```pm2 monit```

Now that your Node.js application is running, and managed by PM2, let's set up the reverse proxy.

Set Up Reverse Proxy Server
Now that your application is running, and listening on a private IP address, you need to set up a way for your users to access it. We will set up an Nginx web server as a reverse proxy for this purpose. This tutorial will set up an Nginx server from scratch. If you already have an Nginx server setup, you can just copy the location block into the server block of your choice (make sure the location does not conflict with any of your web server's existing content).

On the web server, let's update the apt-get package lists with this command:

```sudo apt-get update```

Then install Nginx using apt-get:

```sudo apt-get install nginx```

Now open the default server block configuration file for editing:

```sudo vi /etc/nginx/sites-available/default```

Delete everything in the file and insert the following configuration. Be sure to substitute your own domain name for the ```server_name``` directive (or IP address if you don't have a domain set up), and the app server private IP address for the ```APP_PRIVATE_IP_ADDRESS```. Additionally, change the port (```8080```) if your application is set to listen on a different port:

```
# /etc/nginx/sites-available/default
server {
    listen 80;

    server_name example.com;

    location / {
        proxy_pass http://APP_PRIVATE_IP_ADDRESS:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

This configures the web server to respond to requests at its root. Assuming our server is available at example.com, accessing http://example.com/ via a web browser would send the request to the application server's private IP address on port 8080, which would be received and replied to by the Node.js application.

You can add additional location blocks to the same server block to provide access to other applications on the same web server. For example, if you were also running another Node.js application on the app server on port 8081, you could add this location block to allow access to it via ```http://example.com/app2```:

```
# Nginx Configuration — Additional Locations
    location /app2 {
        proxy_pass http://APP_PRIVATE_IP_ADDRESS:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

Once you are done adding the location blocks for your applications, save and exit.

On the web server, restart Nginx:

```sudo service nginx restart```

Assuming that your Node.js application is running, and your application and Nginx configurations are correct, you should be able to access your application via the reverse proxy of the web server. Try it out by accessing your web server's URL (its public IP address or domain name)

___

## Copyright and License

[MIT License](https://github.com/goyalzz/NodeSampleAppMobiAdz/blob/master/LICENSE "License")

Copyright (c) 2016 Pronto IT Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.