# FirebaseExample
An example about create, update, delete, get using Firebase Firestore on Android in React Native

Link youtube:
+ Part 1 (Install Firebase): https://www.youtube.com/watch?v=z1CFKtP1QVQ
+ Part 2 (Create, update, delete, get): https://www.youtube.com/watch?v=vxvTNcsKeM0

-----------------------FIREBASE EXAMPLE IN REACT NATIVE-----------------------<br>
<b>1) STEP 1:</b> Create your new firebase project<br>
a) Go to firebase console: https://console.firebase.google.com/<br>
b) Click 'Add project' and enter necessary info, then click 'Create project'<br>
<b>2) STEP 2:</b>  Create your new database:<br>
a) Click option 'Develop'>'Database' on the left sidebar, then click button 'Create database'<br>
b) Choose 'Start in locked mode', then click 'Enable'<br>
=> Now, you have your own database<br>
<b>3) STEP 3:</b>  Add Firebase to your android app:<br>
a) In your database overview page->click button setting besides 'Project Overview' on the top left->choose 'Project settings'<br>
b) In the 'Your apps' card, select a platform to get started: IOS, android, web app->I choose Android<br>
c) Enter info:<br>
	Android package name: is in file 'android/app/build.gradle'->applicationId: in my example is 'com.firebaseexample'<br>
	App nick name: name of app, you can choose any name (this is optional)<br>
d) Click 'Register app'<br>
e) Then click button 'Download google-services.json' (save in folder 'android/app')<br>
f) Then click 'Next'<br>
g) Add Firebase SDK:<br>
---->Edit file 'android/build.gradle':<br>
<pre>
buildscript {
  dependencies {
    // Add this line
    classpath 'com.google.gms:google-services:4.0.1'
  }
}
</pre>
---->Edit file 'android/app/build.gradle':<br>
<pre>
dependencies {
  // Add this line
  implementation 'com.google.firebase:firebase-core:16.0.1'
}
...
// Add to the bottom of the file
apply plugin: 'com.google.gms.google-services'
</pre>
h) Build your app<br>
i) Click 'Next' to verify installation<br>
<b>4) STEP 4:</b>  Clone UI from https://github.com/uit2712/HeroUI, then copy necessary files:<br>
Install modules:<br>
	npm i --save events react-navigation react-native-gesture-handler react-native-vector-icons<br>
<b>5) STEP 5:</b>  Edit Hero model<br>
a) Edit constructor<br>
b) Edit clone function<br>
c) Add function getObjectInfo<br>
<b>6) STEP 6:</b>  Add controller HeroController in folder 'controllers'<br>
a) Get all heroes<br>
b) Create new hero<br>
c) Upate hero<br>
d) Delete hero<br>



---------------------Concepts in Firebase---------------------<br>
1) Data model in Firebase:<br>
Cloud Firestore is a NoSQL, document-oriented database.<br>
Unlike a SQL database, there are no tables or rows.<br>
Instead, you store data in 'documents', which are organized into 'collections'.<br>
Each document contains a 'set of key-value pairs' (like json)<br>
a) Documents: In Cloud Firestore, the unit of storage is the document.<br>
A document is a lightweight record that contains fields, which map to values.<br>
Each document is identified by a 'name'<br>
**Example: A document with name 'alovelace' with these key-value pairs<br>
	<pre>
	first : "Ada"
	last : "Lovelace"
	born : 1815
	</pre>
b) Collections: Documents live in collections, which are simply containers for documents.<br>
For example, you could have a users collection to contain your various users, each represented by a document:<br>
users<br>
<pre>
	alovelace<br>
		first : "Ada"
		last : "Lovelace"
		born : 1815
	aturing<br>
		first : "Alan"
		last : "Turing"
		born : 1912
</pre>
c) References: Every document in Cloud Firestore is uniquely identified by its location within the database.<br>
The previous example showed a document 'alovelace' within the collection 'users'.<br>
To refer to this location in your code, you can create a reference to it.<br>
<pre>
	var alovelaceDocumentRef = db.collection('users').doc('alovelace');
</pre>
***For convenience, you can also create references by specifying the path to a document or collection<br>
as a string, with path components separated by a forward slash (/).<br>
For example, to create a reference to the alovelace document:<br>
<pre>
	var alovelaceDocumentRef = db.doc('users/alovelace');
</pre>
2) Data types: Array, Boolean, Bytes, Date and time, Number (integer, float), Map (key-value pairs), Null, Referenece, String
