# **Saveddit - Reddit management tool.**

Frequent reddit browser? Find yourself saving many posts/links/articles? Frustrated that Reddit does not offer the option to search through saved posts? Then Saveddit is just the tool for you. Built and designed to be blazingly fast, and offer features that Reddit just will not do. Search by title, sort by various criteria and filter by subreddit if you so wish to, all at the click of a mouse button. 

# [Try it out for yourself](https://saveddit.vercel.app/)

### `Privacy Statement`
Saveddit is a web application built on top of react and makes use of serverless functions to authorize and fetch all the necessary data from the Reddit API. At no point of the process is your data being acquired (for any means other than to display it) or stored anywhere remote. Everything is stored locally (localStorage) on your browser, and managed with Redux. No external database, no tracking, no analytics. It is truly free to use and collects no data, see for yourself in the included source code. 

### `Built With`

ReactJS | Redux | TailwindCSS | Vercel

### `FAQ`
#### **Q: Are you storing, tracking or selling any data?**
A: No. Nothing is stored or being sent to a remote database. All of your information is stored locally in your browser.
<br>
#### **Q: Can I run this on my own server?**
A: Yes. The project is open source. Make sure to setup the necessary environment variables (Client ID & Secret).
<br>
#### **Q: Why are you only fetching 947 posts even though I have many more?**
A: That is unfortunately the limitation of the Reddit API, it only allows to fetch said amount of latest saved posts. If you unsave a couple posts you will notice that older saved posts have appeared once again.
<br>
#### **Q: It doesn't work (anymore)?**
A: Most likely an issue with localStorage, try clearing it and giving it another go. If that doesn't fix it try it in incognito mode and if that doesn't fix it please report the issue on this repository.
<br>

### `Features`
- [x] Authorization & Fetching Saved Posts
- [x] Filter By Subreddit
- [x] Search By Title
- [x] Sort By: Latest Saved, A-z, z-A, New-Old, Old-New, Popularity
- [x] Unsave Directly From Saveddit
- [x] Export Excel Sheet
- [x] Data Stored Locally (LocalStorage API)
- [x] Faster than Reddit could ever be
- [ ] Animations
- [ ] Mobile UI & Customizability
- [ ] Sharing Options
- [ ] More Filtering Options
- [ ] Various Export Formats
- [ ] Preview Post Comments & Contents
- [ ] Easter Egg
- [ ] Ability to give feedback, report issues & request features.

