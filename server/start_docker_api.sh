docker run -d \
-e PORT=6000 \
-e CLIENT_ID=57c4ad07-c6f1-4ab8-a5f6-7f9aa26d8b59@apps_vw-dilab_com \
-e CLIENT_SECRET=673bda449f5339f2afb73729ef9c332c0720474c86f2ee0958957ceab2c43632 \
--name vw-server 
-p 6000:6000 dgaitsgo/vw-server 
