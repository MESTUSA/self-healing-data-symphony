{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
} 
