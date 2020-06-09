document.addEventListener("DOMContentLoaded", init);

function init(){
    build();
    code();
}
//main data
function build(){
    const poemHead=["The Road Not Taken","BY ROBERT FROST", "Published: 1916"];
    const poembody=["Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth;", "Then took the other, as just as fair, And having perhaps the better claim, Because it was grassy and wanted wear;","Though as for that the passing there Had worn them really about the same,","And both that morning equally lay In leaves no step had trodden black. Oh, I kept the first for another day! Yet knowing how way leads on to way, I doubted if I should ever come back.","I shall be telling this with a sigh Somewhere ages and ages hence: Two roads diverged in a wood, and I— I took the one less traveled by,","And that has made all the difference."];
    
    var main = document.getElementById('leftside');
    
    var article = main.appendChild(document.createElement('article'));
    article.setAttribute("id", "article");
    var title = article.appendChild(document.createElement('h1'));
    title.setAttribute("id", "title");
    title.innerHTML = poemHead[0];
    var author = article.appendChild(document.createElement('h2'));
    author.setAttribute("id", "author");
    author.innerHTML = poemHead[1];
    var date = article.appendChild(document.createElement('p'));
    date.setAttribute("id", "date");
    date.innerHTML = poemHead[2];
    
    var poem=article.appendChild(document.createElement('div'));
    poem.setAttribute("id", "poem");
    var p0=poem.appendChild(document.createElement('p'));
    p0.setAttribute("id", "p0");
    p0.innerHTML = poembody[0];
    var p1=poem.appendChild(document.createElement('p'));
    p1.setAttribute("id", "p1");
    p1.innerHTML = poembody[1];
    var s0=p1.appendChild(document.createElement('span'));
    s0.setAttribute("id", "s0");
    s0.innerHTML = poembody[2];
    var p2=poem.appendChild(document.createElement('p'));
    p2.setAttribute("id", "p2");
    p2.innerHTML = poembody[3];
    var p3=poem.appendChild(document.createElement('p'));
    p3.setAttribute("id", "p3");
    p3.innerHTML = poembody[4];   
    var s1=p3.appendChild(document.createElement('span'));
    s1.setAttribute("id", "s1");
    s1.innerHTML = poembody[5];
}

function code(){
//clean Up
    function cleanUp(){
        const ids = ["article","title","author","date","poem","p0","p1",
                    "s0","p2","p3","s1"];
        for(var id=0;id<ids.length;id++){
            var ele = document.getElementById(ids[id]);
            if(ele.hasAttribute('class')){
                ele.classList.remove("highlight");
            }
        }
    }        
//constantly changes
    var preview = document.getElementById("preview");
    
//interfaces
    class Observer{
    constructor(aValue,note){
        this.data = aValue;
        this.note= note;      
    }
    getNote(){
        preview.innerHTML=this.note;
    }
    cleanAll(){
        console.log("cleanall");
        const ids = ["article","title","author","date","poem","p0","p1",
                    "s0","p2","p3","s1"];
        for(var id=0;id<ids.length;++id){
            var ele = document.getElementById(ids[id]);
            if(ele.hasAttribute('class')){
                console.log(ele);
                ele.removeAttribute('class');
                ele.removeEventListener("mouseover", this.getNote.bind(this));
            }
        }
    }
    setClass(){
        //this.cleanAll();
        //cleanUp();
        var element = document.getElementById(this.data);
        element.setAttribute("class", "highlight");        
        element.addEventListener("mouseover", this.getNote.bind(this));
    }
    update(newData, newNote){
        this.data=newData;
        this.note=newNote;
        var element = document.getElementById(this.data);        
        this.setClass();
    }    
}

    class Subject{
    constructor(){
        this.observers = [];
    }
    
    register(obs){
        this.observers.push(obs);
    }
    
    updateAll(){
        for(var i=0;i<this.observers.length;i++){
            this.observers[i].update();
        }
    }
    setAll(){
        for(var i=0;i<this.observers.length;i++){
            this.observers[i].setClass();
        }
    }
}

    class MainManager{
    constructor(manager){
        this.manager = manager;
        this.setManager(); 
    }
    setManager(){
            this.manager.setAll();
        }
    changeManager(manager){
        this.manager=manager;
        this.manager.setAll();
    }
}

//code
    var data1= "article";
    var Obser1= new Observer(data1,"This is a poem.");
    
    const data2= ["title","author","date","poem"];
    const notes2=["Title: 'The Road Not Taken'",
                  "Author: Robert Frost", "April 19, 1993",
                "Summary: A traveller comes to a fork in the road and chooses the path more treaded after much dramatic thinking."];
    var Obser2= new Observer(data2[0],notes2[0]);
    var Obser2a= new Observer(data2[1],notes2[1]);
    var Obser2b= new Observer(data2[2],notes2[2]);
    var Obser2c= new Observer(data2[3],notes2[3]);
    
    const data3= ["p0","p1","p2","p3"];
    const notes3=["The traveler must choose between two identical roads.\n",
                "The traveler can not discern which path is more worn.",
                "The traveler decides on the first path, yet knows he might never try the second.\n",
                "An after thought which the traveler discovers he took the less traveled path unsure of its outcome."];
    const Obser3= new Observer(data3[0],notes3[0]);
    const Obser3a= new Observer(data3[1],notes3[1]);
    const Obser3b= new Observer(data3[2],notes3[2]);
    const Obser3c= new Observer(data3[3],notes3[3]);
      
    const data4=["title","author","s0","s1"];
    const notes4=["This is Frost's most recognizable work; having been read by countless high school students\n",
                "Frost has remarked this poem is vastly misinterpreted.\n",
                "No part of the poem proves the traveler takes the path 'less traveled' except the author's claim.\n",
                "The author never concludes if his choice was better or worse, rather focuses on the idea that significant life choices can be as mundane as a split road."];
    const Obser4= new Observer(data4[0],notes4[0]);
    const Obser4a= new Observer(data4[1],notes4[1]);
    const Obser4b= new Observer(data4[2],notes4[2]);
    const Obser4c= new Observer(data4[3],notes4[3]);
    
    const lvlOne= new Subject();
    lvlOne.register(Obser1);
    const lvlTwo= new Subject();
    lvlTwo.register(Obser2);
    lvlTwo.register(Obser2a);
    lvlTwo.register(Obser2b);
    lvlTwo.register(Obser2c);
    const lvlThree= new Subject();
    lvlThree.register(Obser3);
    lvlThree.register(Obser3a);
    lvlThree.register(Obser3b);
    lvlThree.register(Obser3c);
    const lvlFour= new Subject();
    lvlFour.register(Obser4);
    lvlFour.register(Obser4a);
    lvlFour.register(Obser4b);
    lvlFour.register(Obser4c);
    
    var main;
    
    //button
    document.getElementById("level").onchange =function(){
        switch(this.value){
            case "1":
                //console.log("1");
                main = new MainManager(lvlOne);
                break;
            case "2":
                //console.log("2");
                main = new MainManager(lvlTwo);
                break;
            case "3":
                //console.log("3");
                main = new MainManager(lvlThree);
                break;
            case "4": 
                //console.log("4");
                main = new MainManager(lvlFour);
                break;
        }
    }
}
//Observer Subject
//tutorial: https://www.youtube.com/watch?v=T-xfEbDORng