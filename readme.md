Attendex : smart attendance solution 
1) purpose : to take attendance the smart hassle free way 
2) general App Features
    A) Takes attendance smart way using 4 accurate methods: NFC, geofencing, passkey biometric, dynamic qr codes
   B) Has employee dashboard that helps 
i) employees keep track of their attendance using charts graphs heatmaps and detailed data points.
ii) Request leaves and see the status of those leaves 
iii) Realtime chat communication feature with admins and chat bot 
  C) Has admin dashboard that helps
 i) Admins keep track of attendance of all employees in their organisation with help of detailed charts heatmaps  interactive tables
ii) Admins can accept reject leave requests and see monthly weekly yearly attendace-leave data of their employees
iii) multiple orgainisations support and realtime chat with employees
D) multiple ML models used for image processing,face detection,OCR,language processing 
E) Multi platform support via responsive website + PWA + native windows/mac app + companion app


3) Technical Features
A) Backend features:

i) Backend written with help of supabase, nodejs and express
ii) main database postgres caching database redis and supabase buckets for image storage. use of views indexes triggers and parameterised queries to write clean and fast psql
iii) use of nginx as reverse proxy
iv) Backend security features

I) The server is securely configured using an HTTP/2 setup with SSL/TLS, enforcing HTTPS through HSTS policies, which protects against man-in-the-middle (MITM) and protocol downgrade attacks. 
II) Rate limiting is applied on api endpoints effectively mitigating brute force attacks. 
III) A Web Application Firewall (easyWaf) is in place, blocking common web threats such as SQL injection, XSS, and other malicious inputs. 
IV) Session management with secure cookies and environment-based SSL certificates further safeguards against session hijacking and fixation. 
V) The use of helmet, along with a permissions policy, reduces the attack surface by restricting browser features and hiding server technology, and protects against cross-site scripting (XSS) and clickjacking CSRF
VI) use of parameterised sql queries and both client and server side sanitisation/validation of data

v) Auth Features
I) Rate limited backend implementation of supabase auth along with social auth
II) Requirement of email verification
III) MFA with help of time sensitive codes

vi) intensive logging using winston


B) Frontend features 
i) Responsive website frontend using react+vite, Progressive web APP using vite pwa plugin
Windows and macos app using tauri
Companion app for android/ios made with react native
with everything written in typescript 
ii)Employee dashboard and admin dashboards ui design with help of antd library 
iii)Implementation of file based public and protected routes using tanstack router with cache support and turnstile captcha to prevent bot attacks
iv) Frontend api data caching with help of tanstack query 

C) Deploy features
i) Use of docker containers and volumes for containerisation of entire application
ii)Custom domain attendex.shop managed by cloudflare saving website from multiple attacks 
iii) automatic CI/CD pipeline with help of netlify and github actions 



   