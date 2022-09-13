# File Upload 

## Brief

The task is to create a web application that can be used as a file archive. The
requirements are:
• It should be possible to upload a file with added metadata (such as description
and name of the uploader). Allowed filetypes should be xml, pdf and jpeg.
• It should be possible to list files and their connected data in columns. This
information should be persisted and fetched from some data store (database,
text file etc.). In the list there should be an icon illustrating what filetype a
certain file is. It should be possible to click the filename to open or download
the file.
• It should be possible to remove an uploaded file.
• You don’t need to build any user handling/authentication

## What technologies will I use?

### Frontend
- React using create-react-app, because I know I can get the functionalty I need quickly.
- Either bootstrap or no styling at all, because id rather spend time on something else.
- I could use the paginated react table that I used for dwarfviz to render the filearchive.

### Backend
- Node + Express because I know how a minimal app looks works there
  **There's something called express-generator that seems to do the things I want with less input?**
- It looks like I'll have to use the content-type 'multipart/form-data'. 
  
  Look at [[https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.2]], and [[https://www.rfc-editor.org/rfc/rfc2046#section-5.1]]. 
  
  There's a piece of node middleware called Multer that seems to be the thing to use to parse and handle that in conjunciton with file uploads.

### Data store
I could choose several different routes here:
- Store on disk
- Store in database (sql/no-sql?)
- Store remotely (CDN/Cloudstorage)

I'll probably start with just storing on disk and see how much time other stuff takes. However, for the metadata, it'll be cumbersome to work directly with disk storage, so perhaps a database is a good idea nonetheless. But I don't feel confident setting up a relational database quickly, and have scarcely ever set up a mongodb instance.

So i decided to do a little bit of reading on mongoDB, because I was curious and wanted to learn. (I'm torn here between challenging myself with using the solution where I don't have to learn anything and instead focus on getting done, and learning something I want to learn and feeling like I've done it "properly"). There seems to be a number of ways you can store files. Something called GridFS enables file storage for arbitrarily large files, but really feels like over-engineering. I'm drawn to the solution of using a local instance of mongoDB to keep track of the metadata for the files and the path to the files' location on disk. The "transaction control" that ensures the coupleing between the files and their metadata would then live in the node-app.

## Disposition

### Frontend Components
#### Archive:
Renders a table representing the file archive. Fetches the data from the backends ('GET /').
- Each file is downloadable by clicking the filename. ('GET /filename')
- Each file is deletable by clicking a delete button (rightmost column). ('DELETE /filename') Should have a confirmation box.

Also renders a button to open the upload form.

#### File Uploader:
Renders a form with some fields.
- File: (type:file) – Opens the OS:s file picker interface. This is sufficient.
- Description: text/string
- Uploader: text/string
- Filename: text/string (was in the optional tasks. Feels right to include) Pre-fill this with the original filename.
- Original filename (hidden field)

There is a button "Upload file" that sends 'POST /upload' with the form data. Do I need to process the data before sending it? Handle the content-type somehow?

The response to the upload request should indicate wether or not it was successful, and the UI should reflect this.

There is a button "Cancel" that removes the form and takes the user back to the archive view.

### Backend

#### Routes
**GET /**
  Returns a listing of files in the archive. 
  ```js
[
	{
		filename: "name", 
		uploader: "uploader", 
		description: "decr", 
		filetype: "type", 
		date: "datestring",
	}, ... 
]
```
**GET /filename**
  Returns a file download of the file if it exists

**DELETE /filename**
  Deletes the file if it exists

**POST /upload**
  Saves the file and metadata to the data store. If successful, give a success response. If anything fails, make sure nothing is stored and give a failed response.

#### The /upload route 
This is the big one.

We have a request with a multipart body that contains a file and some fields with metadata about the file. 
  
We want to store the file in some fashion, and all the metadata about the file in some fashion (perhaps the same). The metadata should relate to the file using a unique filename as identifier. (I'll probably just prepend the incoming filename with a UUID?)
  
I'll need to look up how to use Multer here. I think that it parses the request for me, and that I can configure it with a datastore to save data.

I want to think in terms of transaction control here. What can go wrong and at what point do I "commit" changes?

#### Dependencies
- express
- cors
- multer
- mongoose

### Things that I'm deciding are out of scope
- Responsiveness (I'm just going to implement this for a laptop screen)
- Good looks
- Proper UX and accessibility stuff

## What questions need answering?
- How do I store the metadata?
	- Look up minimal mongodb tutorial because I have a feeling thats easiest. That way I should be able to combine it with filestorage.
	  
	  **I decided on using mongoDB. I'll be using a local instance, but it seems to be easy to use a cloud service instead, should I want to (atlas something). I'll be storing the files on disk and keeping the path to the files together with the metadata in the database document **
	  
	  ****
-  How do I organize the project? 
	- Frontend and backend in one monorepo? I don't think I've ever made a monorepo. But it makes sense here. I want to run the frontend and backend processes separately, but want it bundled as one repo.
	  
	  **I actually think its easier than I thought. I'll just init the repo in a dir containing the two project folders, a README, and a .gitignore.**



## In what order do I do things?
Since its only supposed to take a couple of hours, I probably shouldn't plan much. But I'm also a little bit anxious about not being good enough, so It'll hopefully calm me down a little bit if I do some light planning...
- [x] Start installing the dependencies and getting a hello world the backend on the frontend
- [x] Set up the appropriate routes on the backend with mock-replies. (test with postman?)
- [x] Build the frontend components
- [x] Implement the actual backend 

## How did it go?

### At the 4 hour mark
#### What was done:
- The frontend could show the files on the server in a table.
- The files are downloadable by clicking the filename
- A new file can be uploaded by opening the upload form and submitting it. (no validation) 
  
#### What remained to be done:
**Backend:**
- [x] Implement the delete-route
- [x] Actually send the POST request from the frontend (I had been testing in postman)
- [x] Add status codes to responses
- Properly handle fileextensions in filepaths (Don't know if there are problems here, but I've just ignored it, so there probably are a bunch)
- Maybe clean up the code a little bit?

**Frontend:**
- [x] Form validation
- [x] Implement the restriction on filetype by using the mimetype.
- [x] confirmation dialog on delete-button
- [x] Making the entire thing not burn the eyes too much
- [x] Clearing form, closing on upload.
- [x] Autofilling original filename.

- [x] Ah yes, and adding instructions to the README o_o.
- [x] And finally adding these notes to the repo.