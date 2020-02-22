Team ASH: Hou-An Lin, Sam Huang, Abigayle Quintana

Link: 

https://cse135-pa3.firebaseapp.com/index.html

Picture of collection and sessionization architecture:

https://docs.google.com/drawings/d/1yIUSM3Zlq_T_fgegoBNtEAgCf6OsNFZqAa1EJqY9TbY/edit?usp=sharing

Mininification and size comparison:

Endpoints:

/postSession (collector) - Cloud function: https://us-central1-cse135-pa3.cloudfunctions.net/postSession The information being sent to this endpoint is the information being stored in the database

/showdb -  Cloud function: https://us-central1-cse135-pa3.cloudfunctions.net/showdb The information being sent to this endpoint is the information stored in the database that will be visualized on showdb.html

Storage Choices
We stored static data together, the performance data together, and the dynamic data separately in Firestore. We displayed the static data together, the performance data together, and the dynamic data together. We used JSONs and converted them to strings to store in the database.
