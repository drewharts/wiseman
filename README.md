# startup
## Elevator Pitch
Music is an extension of our personality. What we listen to, how much we listen to, and how we listen to "gives" who we are. Our conduits of music have become fashion statements and our ability to find new music have become personality statements. Unfortantely, not all the greatest music is easily accessible. One of my favorite songs ever has never been released. Finding this music can be hard. That's why we've created a medium that will pull your favorite artists from Spotify and search the web for music that isn't on Spotify or Apple Music. We hope to find unreleased or live session songs that will surpise you and make you love that artist even more. 
## Design
![Mock](WisemanHome.jpg)
![Mock](WisemanResultsPage.jpg)

## Key Features
- Secure Login using HTTPS with Spotify API
- Pulling top artists from User's spotify
- The user can choose to pull top artists (all-time, last year, last month)
- Utilization of ChatGPT API to generate results based on Spotify results
- Display results and give user the ability get more information on each song
- Ability to export a copy of the results for user to share with friends

## Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for Spotify login and one for the displaying of results. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login with Spotify, choice display, connection to ChatGPT API, displaying results, backend endpoint calls.
- **React** - Application ported to use the React web framework.
- **Authentication** - Will appropriately and securely log user into their spotify and return information regarding their account. 
- **DB** - Database will store results generated for each user so they can refer back to them when logging in at a later time.
- **WebSocket** - Application will fetch old generated data and display them for the user. 

## HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - Three HTML page that represent the ability to login with Wiseman, Spotify and display results.
- **Links** - The login page automatically links to the spotify and results page.
- **Text** - Each of the steps to login or display results are clearly labeled with what they're going to be.
- **Images** - I added two images, a spotify logo and an image representing the name wiseman. 😔
- **Login** - Input box and submit button for login for Wiseman and for Spotify.
- **Database** - The results genereated will be stored in a database that we get from Spotify API and ChatGPT.
- **WebSocket** - You will be able to see all of your friends current favorite artists.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I made navigation elements responsive to hovering and more modern looking.
- **Responsive to window resizing** - My app looks great on all window sizes and devices (mostly)
- **Application elements** - Used good contrast and whitespace
- **Application text content** - Consistent fonts
- **Application images** - Made some images the background of the actual page. 


## JavaScript deliverable

For this deliverable I made my application functional to login to spotify and grab their profile details and top listened artists. 

- **login** - When you press enter or the login button it takes you to the voting page.
- **database** - Displayed the top artists. Currently this is stored and retrieved from Spotify, but eventually we will store each user's results in the database.
- **WebSocket** - I used the setInterval function to periodically increase a random vote count. This will be replaced with WebSocket messages later.
- **application logic** - You can login to spotify and see your spotify profile and your top 3 listened to artists whether it's all-time, the last 6 months, or the last month. 
