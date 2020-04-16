

let result = [];


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function getID(url) {
    let temp = '';
    if (url.indexOf('profile.php?id=') === -1) {
        temp = url.substring(url.indexOf('.com/') + 5, url.indexOf('?'));
    } else {
        temp = url.substring(url.indexOf('id=') + 3, url.indexOf('&'));
    }
    return temp;
}


let totalComment = 0;
async function excute(parent) {
    const name = parent.querySelectorAll('a')[0].innerText;
    const id = getID(parent.querySelectorAll('a')[0].href);
    const comment = '';
    const point = 2;
    const isCommented = result.find(e => e.id === id);
    totalComment++;
    if (isCommented) {
        isCommented.countComment++;
    } else {
        result.push({
            name,
            id,
            point,
            countComment: 1
        })
    }

}

async function main() {
    var parent = document.querySelectorAll('.commentable_item ul li div[aria-label] div[data-ft]');
    for (let i = 1; i < parent.length; i++) {
        await excute(parent[i]);
    }
    console.log(result);
    let text = '';
    let totalPoint = 0;
    for (const iterator of result) {
        text += 'ID: ' + iterator.id + '\t' + 'Name: ' + iterator.name + '\t\t';
        text += 'Count Comment: ' + iterator.countComment + '\t' + 'Point: ' + iterator.point + '\n';
        totalPoint += iterator.point;
    }

    text += 'Total Point :' + totalPoint + "\n";
    text += 'Total Root Comment :' + totalComment + "\n";
    text += 'Total User Comment :' + result.length + "\n";
    download('data.txt', text);
}
await main();