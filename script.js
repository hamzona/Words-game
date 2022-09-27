let input=document.querySelector('#text');
let space=document.querySelector('#space');
let conf=document.querySelector('#confirm')
let next=document.querySelector('#next');
let play=document.querySelector('#play');

play.addEventListener('click',generate);
async function generate()
{
    let words=[];
    next.style.display='none';
    space.innerHTML='';
    try
    {
        let data=await fetch('words.json');
        data=await data.json();
        data.forEach(d=>
            {
                words.push(d.toLowerCase());
            })
    }
    catch(e)
    {
        console.log(e);
    }
    let myword='';
    myword =words[(Math.floor(Math.random()*words.length))].toLowerCase();
    console.log(myword);
    conf.addEventListener('click',async ()=>
{
   logic(words,myword);
});
}


function logic(words,myword)
{
    if(input.value.length===5)
    {
        inp=input.value.toLowerCase();
        let err='';
        words.forEach(e => {
            //provjera da li rijec postoji u eng
            if(e===inp)
                {
                    err='none';                  
                  let d=ad(inp);
                  select(myword,d);
                }
            });
            if (err!=='none')
            {
                input.classList.add('err');
                conf.classList.add('err')
            }
            else
            {
                input.classList.remove('err');
                conf.classList.remove('err');
            }
    }
    else
{
    alert('You need to type word of 5 letters');
}
}

function ad(inp)
{
    let div=document.createElement('div');
    div.classList.add('examples');
    for(let i=0;i<5;i++)
    {
        
        div.innerHTML+=`<div data-letters>${inp[i]}</div>`;
    }
    space.appendChild(div);
    return div;
}


function select(myword,d)
{
    let letters=d.querySelectorAll('[data-letters]');
    let bluew=myword;
       for(let i=0;i<5;i++)
    {

        if(bluew.includes(letters[i].innerText))
        {
           letters[i].classList.remove('orange')
           letters[i].classList.add('blue');

           bluew=bluew.replace(letters[i].innerText,'');
        }


        console.log(myword);
         if(myword[i]===letters[i].innerText)
         {
            letters[i].classList.remove('blue')
            letters[i].classList.add('orange');
         }

    }
 
    if(myword===inp)
    {
       next.style.display='block';
    }

    next.addEventListener('click',generate)
}



