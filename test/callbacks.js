// getUser(1).then(user => getRepos(user))
//     .then(user => getCommits(user))
//     .then(user => console.log(user))
//     .catch(err => console.log(`Error: ${err.message}`))

async function getData() {
    try {
        const user = await getUser(1)
        const repos = await getRepos(user)
        const commits = await getCommits(repos)
        console.log(commits);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

getData()
console.log('here');


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getting user from database');
            resolve({ id: id, usernmae: 'ahmad' })
        }, 1000)
    })
}

function getRepos(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getting Repos from database');
            resolve({ ...user, repos: ['html', 'js', 'css'] })
        }, 1000)
    })
}

function getCommits(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getting commits from database');
            resolve({ ...user, commits: [1, 2, 3, 4, 5] })
        }, 1000)
    })
}