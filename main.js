// main varibles

let theInput = document.querySelector('input');
let getButton = document.querySelector('button');
let reposData = document.querySelector('.show-data');

getButton.onclick = function () {
    getRepos();
};

//get repos function
function getRepos() {
    if (theInput.value == '') {
        reposData.innerHTML = '<span>Please Write Github Username.</span>'
    }
    else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())

        .then((data) => {
           // console.log(data);                // return reposin the account
            reposData.innerHTML = '';        // empty the container of data

            // loop on repos => data ( equal 'data' on my code)

            data.forEach(repo => {
                // console.log(repo.name);

                // creat main div
                let mainDiv = document.createElement('div');

                // creat repo name 
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);

                // creat  link for each repo to visit it if i need
                let url = document.createElement('a');
                let urlTxt = document.createTextNode("Visit"); 
                url.appendChild(urlTxt);

                // add hypertext reference 
                url.href = `https://github.com/users/${theInput.value}/${repo.name}`;

                // open link in new blank => attribute 
                url.setAttribute('target', '_blank');

                //append the link to main div
                mainDiv.appendChild(url);

                // craet star span
                let stars = document.createElement('span');

                //creat text star
                let starTxt = document.createTextNode(`stars ${repo.stargazers_count}`);
                stars.appendChild(starTxt);
                mainDiv.appendChild(stars);
                reposData.appendChild(mainDiv);

                // add class to main div
                mainDiv.className = 'repo-box';
            })
        })
    }
};