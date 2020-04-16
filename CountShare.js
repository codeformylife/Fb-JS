

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
    let temp = url.substring(url.indexOf('.com/') + 5, url.indexOf('__tn__') - 1);
    if (temp.indexOf('id=') !== -1) {
        temp = temp.substring(temp.indexOf('id=') + 3, temp.length);
    }
    return temp;
}

function tryElement(parent, jsString) {
    let result = 0;
    try {
        result = eval(jsString);
        if (result == "") {
            result = 0;
        }
    } catch (e) { }
    return result;
}


async function excute(parent) {
    const name = parent.querySelector('h5 span span a').innerText;
    const id = getID(parent.querySelector('h5 span span a').href);
    const urlPost = parent.querySelectorAll('div span span a')[1].href;
    const timePost = parent.querySelector('div span span a abbr').title
    const reaction = tryElement(parent, 'parent.querySelectorAll(\'form span[aria-hidden="true"]\')[0].innerText');
    const comment = tryElement(parent, 'parent.querySelectorAll(\'form a[data-hover="tooltip"]\')[0].innerText');
    const share = tryElement(parent, 'parent.querySelectorAll(\'form a[data-hover="tooltip"]\')[1].innerText');
    const point = 2;
    const isShared = result.find(e => e.id === id);
    if (!isShared) {
        result.push(
            {
                id,
                name,
                post: [{
                    urlPost,
                    timePost,
                    reaction,
                    comment,
                    share,
                }],
                point,
                countShare: 1
            }
        );
    } else {
        isShared.countShare++;
        isShared.post.push({
            urlPost,
            timePost,
            reaction,
            comment,
            share,
        });
    }
}

async function main() {
    const parent = document.querySelectorAll('.userContentWrapper');
    for (let i = 1; i < parent.length; i++) {
        await excute(parent[i]);
    }
    console.log(result);
    let text = '';
    let totalPoint = 0;
    for (const iterator of result) {
        text += 'ID: ' + iterator.id + '\t' + 'Name: ' + iterator.name + '\t\t';
        // for (const iterator2 of iterator.post) {
        //     text += 'URL Post: ' + iterator2.urlPost + '\t' + 'Time: ' + iterator2.timePost + '\t'
        //         + 'Reaction Post: ' + iterator2.reaction + '\t' + 'Comment Post: ' + iterator2.comment + '\t'
        //         + 'Share Post: ' + iterator2.share + '\t';
        //     if (iterator.post.length > 1) {
        //         text += '\n';
        //     }
        // }
        text += 'Count Share: ' + iterator.countShare + '\t' + 'Point: ' + iterator.point + '\n';
        totalPoint += iterator.point;
    }

    text += 'Total Point :' + totalPoint;
    download('data.txt', text);
}
await main();