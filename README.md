Technologies Used:

1) Frontend:- Fully typesafe with NextJs, Typescript, and tailwind, and firebase for google and Github auth
2) Backend:- Fully typesafe with Express, MongoDb, and Nodejs
3) User documents are stored over AWS S3 using signed URL
4) Payments-> Stripe

Setting up: 

Note: I was running short on time and hence I couldn't create and test a docker compose file

Terminal 1:
1) cd client
2) npm i
3) Create an .env.local file and add following credentials to it: 
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AWS_BUCKET_NAME=learner-license-application
NEXT_PUBLIC_AWS_BUCKET_REGION=ap-south-1

4) npm run dev

Terminal 2:
1) cd api
2) npm i

3) Create a .env fiel and add following credential to it:
CLIENT_URL=http://localhost:3000
MONGO_DB_URI=mongodb://localhost:27017/learner_license
JWT_SECRET_KEY=thisisarandomsecreterdfvrfgdfbv
AWS_BUCKET_NAME=learner-license-application
AWS_BUCKET_REGION=ap-south-1
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
STRIPE_PRIVATE_KEY=
STRIPE_ENDPOINT_SECRET=

4) npm run dev

Terminal 3:-
1) stripe login
2) stripe listen --forward-to http://localhost:8000/stripe/webhook

Now you should be able to use the application


3) Pending stuff due to lack of time:

-> Zod schema validations, error handling and alerts through react-toastify
-> Email verification through OTP and forgot password functionality
-> Mobile responsiveness
-> DockerFile
-> Hosting - I would do it using AWS Ec2 (or AWS ECS using Docker) and then configure a https domain for app using nginx and any SSL provider like LetsEncrypt, and frontend on vercel

4) Challenges:-
I didn't really face any challenges, only I faced lack of time as I was trying to build it very perfectly and referenced the actual liense creation process and not just bare minimum. I am sure you will love what I have done. Please do check screenshots folder in root of this repo

